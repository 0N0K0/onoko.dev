import {
  CircularProgress,
  FormControlLabel,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import useSettings from "../../hooks/queries/useSettings";
import { UPDATE_SETTINGS_MUTATION } from "../../services/settings/accountMutations";
import ClosableSnackbarAlert from "../../components/custom/ClosableSnackbarAlert";
import SnackbarAlert from "../../components/custom/SnackbarAlert";

/**
 * Page d'accueil de l'espace admin.
 */
export default function Dashboard() {
  const { maintenanceMode, loading, refetch } = useSettings();
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [updateSettings, { loading: updating }] = useMutation(
    UPDATE_SETTINGS_MUTATION,
    {
      onCompleted: () => {
        setErrorMessage("");
        setSuccessSnackbarOpen(true);
      },
      onError: (error) => {
        setErrorMessage(error.message || "Une erreur est survenue");
      },
    },
  );

  const handleMaintenanceToggle = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextValue = event.target.checked;
    try {
      await updateSettings({ variables: { maintenance: nextValue } });
      await refetch();
    } catch {
      // L'erreur est déjà gérée par onError.
    }
  };

  return (
    <>
      <Typography variant="h1" sx={{ width: "100%" }}>
        Tableau de bord
      </Typography>
      <Paper
        elevation={0}
        sx={{
          marginTop: 3,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          width: "100%",
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h2">Configuration</Typography>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <FormControlLabel
            control={
              <Switch
                checked={maintenanceMode}
                onChange={handleMaintenanceToggle}
                disabled={updating}
              />
            }
            label="Mode maintenance"
          />
        )}
      </Paper>
      <ClosableSnackbarAlert
        open={successSnackbarOpen}
        setOpen={setSuccessSnackbarOpen}
        message="Le mode maintenance a été mis à jour."
        severity="success"
      />
      <SnackbarAlert
        open={!!errorMessage}
        message={errorMessage || "Une erreur est survenue"}
        severity="error"
        onClose={() => setErrorMessage("")}
      />
    </>
  );
}
