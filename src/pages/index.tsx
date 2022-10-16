import type { NextPage } from "next";
import Head from "next/head";

import { ChangeEvent, useEffect, useState } from "react";

import Logo from "../components/lib/Logo/Logo";
import Results from "../components/lib/Results/Results";
import Searchbox from "../components/lib/Searchbox/Searchbox";

import Container from "../layouts/Container";

import { useRouter } from "next/router";

import image from "../public/Logo512.jpg";
import errorImage from "../assets/illustrations/errorImage";
import searchIllustration from "../assets/illustrations/searchIllustration";
import { useRhymes } from "hooks/useRhymes";
import { useDictionary } from "hooks/useDictionary";
import Dictionary from "components/lib/Results/Dictionary";
import { GetRhymesAPI } from "api";
import { useLang } from "hooks/useLang";

interface Props {
  initialQuery: string;
  description: string;
}

const Home: NextPage<any> = ({ initialQuery, description }: Props) => {
  const router = useRouter();

  const [query, setQuery] = useState<string>(initialQuery);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [limit, setLimit] = useState<number>(17);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [enabledSelected, setEnabledSelected] = useState<boolean>(false);

  const { locale } = router;

  const { isLoading, error, data, refetch } = useRhymes(query, enabled, locale);

  const { refetch: refetchSelectedWord } = useDictionary(
    selectedWord,
    enabledSelected
  );

  const translate = useLang();

  function updateQuery(q: string) {
    if (!q) return;

    setEnabled(true);
    setQuery(q);

    router.replace({
      query: { ...router.query, word: q },
    });

    refetch();
  }

  function updateSelectedWord(q: string) {
    setSelectedWord(q);

    if (!q) return;
    setEnabledSelected(true);

    refetchSelectedWord();
  }

  useEffect(() => {
    if (initialQuery.length) {
      updateQuery(initialQuery);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLimit(17);
  }, [query]);

  function changeLanguage(locale: string) {
    router.push("/", "/", { locale });
  }

  return (
    <div>
      <Head>
        <title>
          {initialQuery.length ? `${initialQuery} - Rhymes` : "Rhymes"}
        </title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="alliteration, rhythm, pace, behavior, ritual, rime, poem, point, ola, paraphrase, rite, verse, rim, wordplay, mused, assonant, rhymezone, book"
        />

        <meta
          property="og:title"
          content={initialQuery.length ? `${initialQuery} - Rhymes` : "Rhymes"}
        />
        <meta property="og:image" content={image.src} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={"Rhymes"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={initialQuery.length ? `${initialQuery} - Rhymes` : "Rhymes"}
        />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image.src} />
        <meta name="twitter:site" content={"Rhymes"} />

        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="higherContainer">
        <Container>
          <Logo />

          <div style={{ marginTop: "-30px", marginBottom: "30px" }}>
            {translate.offeredIn}{" "}
            {locale === "fr" ? (
              <span className="keyword" onClick={() => changeLanguage("en")}>
                English
              </span>
            ) : (
              <span className="keyword" onClick={() => changeLanguage("fr")}>
                Français
              </span>
            )}
          </div>

          <Searchbox {...{ updateQuery, isLoading, initialQuery }} />

          {!error && data && (
            <div>
              {data?.length} {translate.searchResults}
            </div>
          )}

          {isLoading ? (
            <div className="illustration">{searchIllustration}</div>
          ) : (
            <></>
          )}

          {error ? (
            <div className="illustration">
              <p>{translate.searchError}</p>
              {errorImage}
            </div>
          ) : (
            <></>
          )}

          {!error && (
            <Results {...{ data, limit, selectedWord, updateSelectedWord }} />
          )}

          {(data?.length ?? 0) > limit && !error && (
            <div className="link" onClick={() => setLimit(data?.length ?? 0)}>
              {translate.seeMore}
            </div>
          )}

          <div style={{ opacity: 0.5 }} className="footer">
            {translate.poweredBy}{" "}
            <a href="https://rhymebrain.com/">Rhyme Brain</a> &{" "}
            <a href="https://dictionaryapi.dev/">Dictionary API</a>
          </div>
        </Container>

        {enabledSelected && (
          <Dictionary
            query={selectedWord}
            updateSelectedWord={updateSelectedWord}
            selectedWord={selectedWord}
          />
        )}
      </div>
    </div>
  );
};

Home.getInitialProps = async ({ query, locale }) => {
  try {
    const { word } = query;

    if (!word || word instanceof Array) {
      return { initialQuery: "" };
    }

    const response = await GetRhymesAPI({ query: word, lang: locale || "en" });

    if (response) {
      return {
        initialQuery: word,
        description: response.map((data) => data.word).join(", "),
      };
    }

    return {
      initialQuery: word,
      description: "Rhymes is a free online tool to find rhyming words.",
    };
  } catch (error) {
    return {
      initialQuery: "",
      description: "Rhymes is a free online tool to find rhyming words.",
    };
  }
};

export default Home;
