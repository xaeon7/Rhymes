import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import Logo from "../components/lib/Logo/Logo";
import Results from "../components/lib/Results/Results";
import Searchbox from "../components/lib/Searchbox/Searchbox";

import Container from "../layouts/Container";

import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { GetRhymesAPI } from "../api";

import image from "../public/Logo.jpg";

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(16);
  const [enabled, setEnabled] = useState<boolean>(false);

  const { isLoading, error, data, refetch } = useQuery(
    ["query-rhymes", query],
    () => GetRhymesAPI({ query }),
    {
      enabled,
    }
  );

  const router = useRouter();

  function updateQuery(q: string) {
    if (!q) return;

    setEnabled(true);
    setQuery(q);

    router.replace({
      query: { ...router.query, word: q },
    });

    refetch();
  }

  return (
    <div>
      <Head>
        <title>Rhymes</title>
        <meta name="description" content="Rhyme it" />

        <meta property="og:title" content={"Rhymes"} />
        <meta property="og:image" content={image.src} />
        <meta property="og:description" content={"Rhyme it"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={"Rhymes"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Rhymes"} />
        <meta name="twitter:description" content={"Rhyme it"} />
        <meta name="twitter:image" content={image.src} />

        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Container>
        <Logo />

        <Searchbox {...{ updateQuery, isLoading }} />

        {isLoading ? <div>Loading...</div> : <></>}

        {error ? <div>An error has occurred</div> : <></>}

        <Results {...{ data, limit }} />

        {(data?.length ?? 0) > limit && (
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

export default Home;
