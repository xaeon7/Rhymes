import { useLang } from "hooks/useLang";
import styles from "./styles/result.module.scss";

interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  const translate = useLang();

  if (score / 300 >= 0.8)
    return <div className={styles.success}>{translate.excellent}</div>;
  if (score / 300 >= 0.6)
    return <div className={styles.mid}>{translate.good}</div>;
  if (score / 300 >= 0.4)
    return <div className={styles.warning}>{translate.average}</div>;
  if (score / 300 >= 0.2)
    return <div className={styles.poor}>{translate.poor}</div>;
  return <div className={styles.danger}>{translate.terrible}</div>;
};

export default Score;
