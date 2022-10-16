import { useQuery } from "react-query";
import { GetDictionaryAPI } from "../api";

export const useDictionary = (query: string, enabled?: boolean) =>
  useQuery(["query-rhymes", query], () => GetDictionaryAPI({ query }), {
    enabled,
  });
