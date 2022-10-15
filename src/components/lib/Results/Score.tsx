import styles from "./styles/result.module.scss";

interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  if (score >= 200) return <div className={styles.success}>Excellent</div>;
  if (score >= 100) return <div className={styles.warning}>Average</div>;

  return <div className={styles.danger}>Poor</div>;
};

export default Score;
