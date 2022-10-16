import axios from "axios";
import { links } from "../config/links";
import {
  GetDictionaryAPIRequest,
  GetDictionaryAPIResponse,
  GetRhymesAPIRequest,
  GetRhymesAPIResponse,
  RhymeType,
} from "./types";

export async function GetRhymesAPI({ query }: GetRhymesAPIRequest) {
  const response = await axios.get<GetRhymesAPIResponse>(
    `${links.API_URI}${query}`
  );
  return response.data;
}

export async function GetDictionaryAPI({ query }: GetDictionaryAPIRequest) {
  if (!query) return;
  const response = await axios.get<GetDictionaryAPIResponse>(
    `${links.API_Dictionary_URI}${query}`
  );
  return response.data;
}
