import { useQuery } from "react-query";
import { GetDictionaryAPI } from "../api";

export const useDictionary = (
  query: string,
  enabled?: boolean,
  lang: string = "en"
) =>
  useQuery(
    ["query-rhymes", query, lang],
    () => GetDictionaryAPI({ query, lang }),
    {
      enabled,
    }
  );
