import type { NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";

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

interface Props {
  initialQuery: string;
}

const Home: NextPage<any> = ({ initialQuery }: Props) => {
  const router = useRouter();

  const [query, setQuery] = useState<string>(initialQuery);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [limit, setLimit] = useState<number>(17);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [enabledSelected, setEnabledSelected] = useState<boolean>(false);

  const { isLoading, error, data, refetch } = useRhymes(query, enabled);

  const { refetch: refetchSelectedWord } = useDictionary(
    selectedWord,
    enabledSelected
  );

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
    if (!q) return;
    setEnabledSelected(true);
    setSelectedWord(q);

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

  return (
    <div>
      <Head>
        <title>
          {initialQuery.length ? `${initialQuery} - Rhymes` : "Rhymes"}
        </title>
        <meta
          name="description"
          content="Rhymes is a free online tool to find rhyming words."
        />
        <meta
          name="keywords"
          content="alliteration, rhythm, pace, behavior, ritual, rime, poem, point, ola, paraphrase, rite, verse, rim, wordplay, mused, assonant, rhymezone, book"
        />

        <meta
          property="og:title"
          content={initialQuery.length ? `${initialQuery} - Rhymes` : "Rhymes"}
        />
        <meta property="og:image" content={image.src} />
        <meta
          property="og:description"
          content={"Rhymes is a free online tool to find rhyming words."}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={"Rhymes"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={initialQuery.length ? `${initialQuery} - Rhymes` : "Rhymes"}
        />
        <meta
          name="twitter:description"
          content={"Rhymes is a free online tool to find rhyming words."}
        />
        <meta name="twitter:image" content={image.src} />
        <meta name="twitter:site" content={"Rhymes"} />

        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="higherContainer">
        <Container>
          <Logo />

          <Searchbox {...{ updateQuery, isLoading, initialQuery }} />

          {!error && data && <div>{data?.length} search results</div>}

          {isLoading ? (
            <div className="illustration">{searchIllustration}</div>
          ) : (
            <></>
          )}

          {error ? (
            <div className="illustration">
              <p>An error has occurred</p>
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
              Show more results ...
            </div>
          )}

          <div style={{ opacity: 0.5 }} className="footer">
            Powered by <a href="https://rhymebrain.com/">Rhyme Brain</a> &{" "}
            <a href="https://dictionaryapi.dev/">Dictionary API</a>
          </div>
        </Container>

        {selectedWord.length > 0 && (
          <Dictionary
            query={selectedWord}
            updateSelectedWord={updateSelectedWord}
          />
        )}
      </div>
    </div>
  );
};

Home.getInitialProps = async ({ query }) => {
  try {
    const { word } = query;

    if (!word || word instanceof Array) {
      return { initialQuery: "" };
    }

    return { initialQuery: word };
  } catch (error) {
    return { initialQuery: "" };
  }
};

export default Home;
