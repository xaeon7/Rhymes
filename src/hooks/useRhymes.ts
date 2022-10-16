import { useQuery } from "react-query";
import { GetRhymesAPI } from "../api";

export const useRhymes = (query: string, enabled?: boolean) =>
  useQuery(["query-rhymes", query], () => GetRhymesAPI({ query }), {
    enabled,
  });
