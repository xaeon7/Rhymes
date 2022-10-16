import { useQuery } from "react-query";
import { GetRhymesAPI } from "../api";

export const useRhymes = (
  query: string,
  enabled?: boolean,
  lang: string = "en"
) =>
  useQuery(["query-rhymes", query, lang], () => GetRhymesAPI({ query, lang }), {
    enabled,
  });
