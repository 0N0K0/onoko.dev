import { useQuery } from "@apollo/client/react";
import dayjs from "dayjs";
import type { Testimony } from "../../types/entities/testimonyTypes";
import { TESTIMONIES_QUERY } from "../../services/testimony/testimonyQueries";

export default function useTestimonies() {
  const { loading, error, data, refetch } = useQuery<{
    testimonies: Testimony[];
  }>(TESTIMONIES_QUERY, { fetchPolicy: "cache-and-network" });

  const testimonies = (data?.testimonies ?? []).map((testimony) => ({
    ...testimony,
    createdAt: testimony.createdAt
      ? dayjs(Number(testimony.createdAt))
      : testimony.createdAt,
  }));

  return { testimonies, loading, error, refetch };
}
