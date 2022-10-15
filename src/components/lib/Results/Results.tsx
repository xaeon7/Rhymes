import { GetRhymesAPIResponse } from "../../../api/types";
import Result from "./Result";
import styles from "./styles/results.module.scss";

interface Props {
  data: GetRhymesAPIResponse | undefined;
  limit?: number;
}

const Results = ({ data, limit }: Props) => {
  return (
    <div className={styles.container}>
      {data ? (
        data
          .slice(0, (limit ?? data.length) - 1)
          .map((word, idx) => <Result key={idx} data={word} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default Results;
