import { useEffect, useRef, useState } from "react";
import Picture from "../../custom/Picture";
import { ResponsiveBox, ResponsiveStack } from "../../custom/ResponsiveLayout";
import CustomIconButton from "../../custom/CustomIconButton";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
import type { Media } from "../../../types/entities/mediaTypes";
import { Button, useTheme } from "@mui/material";
import Icon from "@mdi/react";
import CustomDialog from "../../custom/CustomDialog";
import MediaGrid from "./MediaGrid";
import useMedias from "../../../hooks/queries/useMedias";
import useMediaMutations from "../../../hooks/mutations/useMediaMutations";
import ClosableSnackbarAlert from "../../custom/ClosableSnackbarAlert";
import SnackbarAlert from "../../custom/SnackbarAlert";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableMediaItem({
  image,
  multiple,
  required,
  disabled,
  imagesLength,
  onEdit,
  onDelete,
}: {
  image: Media;
  multiple: boolean;
  required: boolean;
  disabled: boolean;
  imagesLength: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const theme = useTheme();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ResponsiveStack
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        position: "relative",
        aspectRatio: "1 / 1",
        justifyContent: "center",
        alignItems: "center",
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        transition: `background ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}, padding ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}, border-radius ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} !important`,
        marginBottom: "20px !important",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
          padding: 1,
          borderRadius: 1,
          transition: `background ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}, padding ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}, border-radius ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} !important`,
        },
      }}
    >
      <Picture image={image} />
      <ResponsiveStack
        onPointerDown={(e) => e.stopPropagation()}
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
          position: "absolute",
          bottom: "-20px",
          left: "-20px",
          width: "calc(100% + 40px)",
        }}
      >
        {!multiple && (
          <CustomIconButton
            icon={mdiPencil}
            color="primary"
            disabled={disabled}
            onClick={onEdit}
          />
        )}
        {(!required || imagesLength > 1) && (
          <CustomIconButton
            icon={mdiDelete}
            color="error"
            disabled={disabled}
            onClick={onDelete}
          />
        )}
      </ResponsiveStack>
    </ResponsiveStack>
  );
}

export default function MediaPicker({
  initialImages = [],
  multiple = false,
  required = false,
  disabled = false,
  labels = { singular: "un média", plural: "des médias" },
  onChange,
}: {
  initialImages?: Media[];
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  labels?: { singular: string; plural: string };
  onChange: (value: string) => void;
}) {
  const theme = useTheme();

  const { medias, refetch } = useMedias();
  const mutations = useMediaMutations();
  const {
    mutate: addMedia,
    data: addMediaData,
    error: addMediaError,
    loading: addMediaLoading,
  } = mutations.create;
  const {
    mutate: editMedia,
    data: editMediaData,
    error: editMediaError,
    loading: editMediaLoading,
  } = mutations.edit;
  const {
    mutate: removeMedia,
    data: removeMediaData,
    loading: removeMediaLoading,
    error: removeMediaError,
  } = mutations.delete;
  const isInitialSync = useRef(true);
  const initialImagesIds = initialImages.map((i) => i.id).join(",");
  const [images, setImages] = useState<Media[]>(initialImages);

  // Sync images when initialImages changes (e.g. async medias load after editingStack is set)
  useEffect(() => {
    isInitialSync.current = true;
    setImages(initialImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialImagesIds]);

  useEffect(() => {
    if (isInitialSync.current) {
      isInitialSync.current = false;
      return;
    }
    onChange(images.map((img) => img.id).join(","));
  }, [images]);

  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState<string>("");

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((prev) => {
        const oldIndex = prev.findIndex((img) => img.id === active.id);
        const newIndex = prev.findIndex((img) => img.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
    if (!removeMediaLoading && removeMediaData) {
      setSubmitSuccess("Média supprimé avec succès");
      refetch();
    }
  }, [removeMediaData]);

  useEffect(() => {
    if (!editMediaLoading && editMediaData) {
      setSubmitSuccess("Média modifié avec succès");
      refetch();
    }
  }, [editMediaData]);

  useEffect(() => {
    if (!addMediaLoading && addMediaData) {
      setSubmitSuccess("Média ajouté avec succès");
      refetch();
    }
  }, [addMediaData]);

  return (
    <>
      {(multiple || images.length === 0) && (
        <Button
          variant="outlined"
          startIcon={
            <Icon path={images.length === 0 ? mdiPlus : mdiPencil} size={1} />
          }
          onClick={() => setMediaPickerOpen(true)}
          disabled={disabled}
          sx={{ width: "fit-content", minWidth: "208px", marginX: "auto" }}
        >
          {images.length === 0
            ? `Ajouter ${labels.singular}`
            : `Modifier la liste ${labels.plural}`}
          {required && (
            <span style={{ color: theme.palette.error.main }}>&nbsp;*</span>
          )}
        </Button>
      )}
      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((img) => img.id)}
            strategy={rectSortingStrategy}
          >
            <ResponsiveBox
              rowGap={3}
              sx={{
                columnGap: 4,
                display: "grid",
                gridTemplateColumns: `repeat(auto-fit, minmax(9rem, ${images.length < 5 ? "20%" : "1fr"}))`,
                justifyContent: "center",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                paddingX: "20px",
              }}
            >
              {[...images]
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                .map((image) => (
                  <SortableMediaItem
                    key={image.id}
                    image={image}
                    multiple={multiple}
                    required={required}
                    disabled={disabled}
                    imagesLength={images.length}
                    onEdit={() => setMediaPickerOpen(true)}
                    onDelete={() =>
                      setImages((prev) =>
                        prev.filter((img) => img.id !== image.id),
                      )
                    }
                  />
                ))}
            </ResponsiveBox>
          </SortableContext>
        </DndContext>
      )}
      <CustomDialog
        open={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        content={
          <MediaGrid
            mode="picker"
            multiple={multiple}
            medias={medias}
            onDelete={removeMedia}
            handleEdit={editMedia}
            submitting={removeMediaLoading || editMediaLoading}
            images={images}
            setImages={(images) => {
              setImages(images);
              setMediaPickerOpen(false);
            }}
            handleAdd={addMedia}
            addMediaLoading={addMediaLoading}
          />
        }
        width={12}
        height="calc(100dvh - 48px)"
        closeButton
      />
      <ClosableSnackbarAlert
        open={!!submitSuccess}
        setOpen={() => setSubmitSuccess("")}
        message={submitSuccess}
        severity="success"
      />
      <SnackbarAlert
        open={!!(removeMediaError || editMediaError || addMediaError)}
        message={
          removeMediaError?.message ||
          editMediaError?.message ||
          addMediaError?.message ||
          "Une erreur est survenue"
        }
        severity="error"
      />
    </>
  );
}
