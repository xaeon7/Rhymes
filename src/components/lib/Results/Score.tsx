import styles from "./styles/result.module.scss";

interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  if (score / 300 >= 0.8)
    return <div className={styles.success}>Excellent</div>;
  if (score / 300 >= 0.6) return <div className={styles.mid}>Good</div>;
  if (score / 300 >= 0.4) return <div className={styles.warning}>Average</div>;
  if (score / 300 >= 0.2) return <div className={styles.poor}>Poor</div>;
  return <div className={styles.danger}>Terrible</div>;
};

export default Score;
