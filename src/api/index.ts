import axios from "axios";
import { links } from "../config/links";
import {
  GetDictionaryAPIRequest,
  GetDictionaryAPIResponse,
  GetRhymesAPIRequest,
  GetRhymesAPIResponse,
  RhymeType,
} from "./types";

export async function GetRhymesAPI({
  query,
  lang = "en",
}: GetRhymesAPIRequest) {
  const response = await axios.get<GetRhymesAPIResponse>(
    `${links.API_URI}&word=${query}&lang=${lang}`
  );
  return response.data;
}

export async function GetDictionaryAPI({
  query,
  lang = "en",
}: GetDictionaryAPIRequest) {
  if (!query) return;
  const response = await axios.get<GetDictionaryAPIResponse>(
    `${links.API_Dictionary_URI}/${lang}/${query}`
  );
  return response.data;
}
