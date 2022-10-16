import speaker from "assets/icons/speaker";
import { useAudio } from "hooks/useAudio";
import { useDictionary } from "hooks/useDictionary";
import { useEffect, useState } from "react";
import styles from "./styles/dictionary.module.scss";

import parse from "html-react-parser";
import notFound from "assets/icons/notFound";

interface Props {
  query: string;
  updateSelectedWord: (q: string) => void;
}

const Dictionary = ({ query, updateSelectedWord }: Props) => {
  const { isLoading, error, data } = useDictionary(query);

  const { playing, updateUrl } = useAudio("");

  const [meaningIndex, setMeaningIndex] = useState<number>(0);

  const [toggleDisplay, setToggleDisplay] = useState<boolean>(true);

  const CloseMenu = () => {
    updateSelectedWord("");
    setToggleDisplay(false);
  };

  useEffect(() => {
    setToggleDisplay(true);
  }, [query]);

  if (error)
    return (
      <>
        <div
          className={
            toggleDisplay
              ? styles.placeholderContainer
              : styles.hideContainerPlaceholder
          }
        ></div>

        <div
          onClick={CloseMenu}
          className={toggleDisplay ? styles.close : styles.hideClose}
        >
          ✖
        </div>
        <div
          className={toggleDisplay ? styles.container : styles.hideContainer}
        >
          <section className={styles.dictionaryContainer}>
            Word not found in our dictionary. {notFound}
          </section>
        </div>
      </>
    );

  return (
    <>
      <div
        className={
          toggleDisplay
            ? styles.placeholderContainer
            : styles.hideContainerPlaceholder
        }
      ></div>
      <div
        onClick={CloseMenu}
        className={toggleDisplay ? styles.close : styles.hideClose}
      >
        ✖
      </div>
      <div className={toggleDisplay ? styles.container : styles.hideContainer}>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={`${styles.loader}`}></div>
          </div>
        )}

        {data && !error && (
          <div className={styles.dictionaryContainer}>
            <div className={styles.section}>
              <h1 className={styles.header}>{data[0].word}</h1>
              {data[0].phonetics.length > 0 && (
                <div className={styles.phonetics}>
                  {data[0].phonetics.map((phonetic, idx) => (
                    <span key={idx} className={styles.phonetic}>
                      <span
                        className={styles.sound}
                        onClick={() => updateUrl(phonetic.audio)}
                      >
                        {phonetic.text}
                      </span>

                      {data[0].phonetics.length > 1 &&
                        data[0].phonetics.length !== idx + 1 &&
                        phonetic.text &&
                        ","}
                    </span>
                  ))}

                  {data[0].phonetics.map((phonetic) => phonetic.audio).length >
                    0 && (
                    <div
                      className={playing ? styles.playing : styles.notPlaying}
                    >
                      {speaker}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.section}>
              <div className={styles.meanings}>
                {data[0].meanings.map((meaning, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === meaningIndex
                        ? styles.activeMeaning
                        : styles.meaning
                    }
                    onClick={() => setMeaningIndex(idx)}
                  >
                    {meaning.partOfSpeech}
                  </div>
                ))}
              </div>
            </div>

            {data[0].meanings[meaningIndex]?.definitions.length > 0 && (
              <div className={styles.section}>
                <h3>
                  Definitions{" "}
                  <span>
                    {data[0].meanings[meaningIndex].definitions.length}
                  </span>
                </h3>
                <div className={styles.definitions}>
                  {data[0].meanings[meaningIndex].definitions.map(
                    (definition, idx) => (
                      <div key={idx} className={styles.definition}>
                        <p>
                          <b>{idx + 1}.</b>{" "}
                          {parse(
                            definition.definition.replace(
                              data[0].word,
                              `<span className="keyword">${data[0].word}</span>`
                            )
                          )}
                        </p>
                        {definition.example && (
                          <p className={styles.example}>
                            {`"`}
                            {parse(
                              definition.example.replace(
                                data[0].word,
                                `<span className="keyword">${data[0].word}</span>`
                              )
                            )}
                            {`"`}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div className={styles.grid}>
              {data[0].meanings[meaningIndex].synonyms.length > 1 && (
                <div className={styles.section}>
                  <h3>
                    Synonyms{" "}
                    <span>
                      {data[0].meanings[meaningIndex].synonyms.length}
                    </span>
                  </h3>

                  {data[0].meanings[meaningIndex].synonyms.map(
                    (synonym, idx) => (
                      <p className="keyword" key={idx}>
                        {synonym}
                      </p>
                    )
                  )}
                </div>
              )}

              {data[0].meanings[meaningIndex].antonyms.length > 0 && (
                <div className={styles.section}>
                  <h3>
                    Antonyms{" "}
                    <span>
                      {data[0].meanings[meaningIndex].antonyms.length}
                    </span>
                  </h3>

                  {data[0].meanings[meaningIndex].antonyms.map(
                    (antonym, idx) => (
                      <p className="keyword" key={idx}>
                        {antonym}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dictionary;