export interface GetRhymesAPIRequest {
  query: string;
}

export interface RhymeType {
  word: string;
  freq: number;
  score: number;
  flags: string;
  syllables: string;
}

export type GetRhymesAPIResponse = RhymeType[];
