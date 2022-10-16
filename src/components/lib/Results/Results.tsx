import { GetRhymesAPIResponse } from "../../../api/types";
import Result from "./Result";
import styles from "./styles/results.module.scss";

interface Props {
  data: GetRhymesAPIResponse | undefined;
  limit?: number;
  selectedWord: string;
  updateSelectedWord: (q: string) => void;
}

const Results = ({ data, limit, selectedWord, updateSelectedWord }: Props) => {
  return (
    <div className={styles.container}>
      {data ? (
        data
          .slice(0, (limit ?? data.length) - 1)
          .map((word, idx) => (
            <Result
              key={idx}
              data={word}
              updateSelectedWord={updateSelectedWord}
              selectedWord={selectedWord}
            />
          ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Results;
