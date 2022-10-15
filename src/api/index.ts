import axios from "axios";
import { links } from "../config/links";
import { GetRhymesAPIRequest, GetRhymesAPIResponse, RhymeType } from "./types";

export async function GetRhymesAPI({ query }: GetRhymesAPIRequest) {
  const response = await axios.get<GetRhymesAPIResponse>(
    `${links.API_URI}${query}`
  );
  return response.data;
}
