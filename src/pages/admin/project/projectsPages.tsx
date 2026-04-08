import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProjectMutations from "../../../hooks/mutations/useProjectMutations";
import EntitiesPage from "../../../components/entities/EntitiesPage";
import { PROJECTS_QUERY } from "../../../services/project/projectQueries";
import { useProject } from "../../../hooks/useProject";

export default function Projects() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const { projects, setProjects } = useProject();

  const { handleDelete } = useProjectMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    projects,
    setProjects,
  });

  return (
    <EntitiesPage
      labels={{
        title: "Projets",
        addButton: "Ajouter un projet",
        entity: "projets",
      }}
      items={projects}
      setItems={setProjects}
      query={PROJECTS_QUERY}
      fields={[
        {
          key: "label",
          label: "Label",
          content: (item) => (
            <p style={{ paddingLeft: `${item.depth * 16}px` }}>
              {item.depth > 0 ? `- ` : ""}
              {item.label}
            </p>
          ),
        },
      ]}
      onClickActions={{
        add: () => navigate(`/admin/project`),
        edit: (id: string) => navigate(`/admin/project?id=${id}`),
        delete: handleDelete,
      }}
      submitting={submitting}
      submitSuccess={submitSuccess}
      setSubmitSuccess={setSubmitSuccess}
      submitError={submitError}
    />
  );
}
