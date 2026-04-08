import { useState } from "react";
import MediaLibrary from "../../components/entities/MediaLibrary";
import ClosableSnackbarAlert from "../../components/custom/closableSnackbarAlert";
import SnackbarAlert from "../../components/custom/snackbarAlert";

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
