import { useLang } from "hooks/useLang";
import { RhymeType } from "../../../api/types";
import Score from "./Score";
import styles from "./styles/result.module.scss";

interface Props {
  data: RhymeType;
  selectedWord: string;
  updateSelectedWord: (q: string) => void;
}

const Result = ({ data, updateSelectedWord, selectedWord }: Props) => {
  const translate = useLang();

  return (
    <div
      className={`${
        selectedWord === data.word ? styles.selectedContainer : styles.container
      } `}
      onClick={() => updateSelectedWord(data.word)}
    >
      <div className={styles.header}>
        <h1>{data.word}</h1>
        <Score score={data.score} />
      </div>

      <p className={styles.syllable}>
        {data.syllables}{" "}
        {parseInt(data.syllables) > 1
          ? translate.syllables
          : translate.syllable}
      </p>
    </div>
  );
};

export default Result;
