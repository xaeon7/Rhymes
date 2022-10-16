//? Rhymes
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

//? Dictionary
export interface License {
  name: string;
  url: string;
}

export interface Phonetic {
  text: string;
  audio: string;
  sourceUrl: string;
  license: License;
}

export interface Definition {
  definition: string;
  synonyms: any[];
  antonyms: any[];
  example: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

export interface Dictionary {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}

export interface GetDictionaryAPIRequest {
  query: string;
}

export interface DictionaryType {
  word: string;
  freq: number;
  score: number;
  flags: string;
  syllables: string;
}

export type GetDictionaryAPIResponse = Dictionary[];
