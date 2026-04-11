import { useState } from "react";
import ClosableSnackbarAlert from "../../components/custom/ClosableSnackbarAlert";
import SnackbarAlert from "../../components/custom/SnackbarAlert";
import MediaLibrary from "../../components/entities/media/MediaLibrary";

export default function Media() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  return (
    <>
      <MediaLibrary
        submitting={submitting}
        setSubmitting={setSubmitting}
        setSubmitSuccess={setSubmitSuccess}
        setSubmitError={setSubmitError}
      />
      <ClosableSnackbarAlert
        open={!!submitSuccess}
        setOpen={() => setSubmitSuccess("")}
        message={submitSuccess}
        severity="success"
      />
      <SnackbarAlert
        open={!!submitError}
        message={submitError || "Une erreur est survenue"}
        severity="error"
      />
    </>
  );
}
