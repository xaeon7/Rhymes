import { RhymeType } from "../../../api/types";
import Score from "./Score";
import styles from "./styles/result.module.scss";

interface Props {
  data: RhymeType;
}

const Result = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{data.word}</h1>
        <Score score={data.score} />
      </div>

      <p className={styles.syllable}>
        {data.syllables}{" "}
        {parseInt(data.syllables) > 1 ? "Syllables" : "Syllable"}
      </p>
    </div>
  );
};

export default Result;
