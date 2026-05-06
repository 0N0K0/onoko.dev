import { useQuery } from "@apollo/client/react";
import { SETTINGS_QUERY } from "../../services/settings/accountQueries";

type Settings = {
  maintenance?: boolean | null;
};

export default function useSettings() {
  const { loading, error, data, refetch } = useQuery<{ settings: Settings }>(
    SETTINGS_QUERY,
    { fetchPolicy: "cache-and-network" },
  );

  return {
    settings: data?.settings,
    maintenanceMode: Boolean(data?.settings?.maintenance),
    loading,
    error,
    refetch,
  };
}