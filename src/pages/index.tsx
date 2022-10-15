import type { NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";

import Logo from "../components/lib/Logo/Logo";
import Results from "../components/lib/Results/Results";
import Searchbox from "../components/lib/Searchbox/Searchbox";

import Container from "../layouts/Container";

import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { GetRhymesAPI } from "../api";

import image from "../public/Logo512.jpg";
import errorImage from "../assets/illustrations/errorImage";
import searchIllustration from "../assets/illustrations/searchIllustration";

interface Props {
  initialQuery: string;
}

const Home: NextPage<any> = ({ initialQuery }: Props) => {
  const router = useRouter();

  const [query, setQuery] = useState<string>(initialQuery);
  const [limit, setLimit] = useState<number>(17);
  const [enabled, setEnabled] = useState<boolean>(false);

  const { isLoading, error, data, refetch } = useQuery(
    ["query-rhymes", query],
    () => GetRhymesAPI({ query }),
    {
      enabled,
    }
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

  useEffect(() => {
    if (initialQuery.length) {
      updateQuery(initialQuery);
    }
  }, []);

  useEffect(() => {
    setLimit(17);
  }, [query]);

  return (
    <div>
      <Head>
        <title>
          {initialQuery.length ? `Word: ${initialQuery} - Rhymes` : "Rhymes"}
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
          content={
            initialQuery.length ? `Word: ${initialQuery} - Rhymes` : "Rhymes"
          }
        />
        <meta property="og:image" content={image.src} />
        <meta
          property="og:description"
          content={"Rhymes is a free online tool to find rhyming words."}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content={
            initialQuery.length ? `Word: ${initialQuery} - Rhymes` : "Rhymes"
          }
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            initialQuery.length ? `Word: ${initialQuery} - Rhymes` : "Rhymes"
          }
        />
        <meta
          name="twitter:description"
          content={"Rhymes is a free online tool to find rhyming words."}
        />
        <meta name="twitter:image" content={image.src} />

        <link rel="icon" href="/favicon.svg" />
      </Head>
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
            <p>An error has occurred </p>
            {errorImage}
          </div>
        ) : (
          <></>
        )}

        {!error && <Results {...{ data, limit }} />}

        {(data?.length ?? 0) > limit && !error && (
          <div className="link" onClick={() => setLimit(data?.length ?? 0)}>
            Show more results ...
          </div>
        )}

        <div style={{ opacity: 0.5 }}>
          Powered by <a href="https://rhymebrain.com/">Rhyme Brain</a>
        </div>
      </Container>
    </div>
  );
};

Home.getInitialProps = async ({ query, res }) => {
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
