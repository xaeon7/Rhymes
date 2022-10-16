import en from "locales/en";
import fr from "locales/fr";
import { useRouter } from "next/router";

export const useLang = () => {
  const router = useRouter();
  const { locale } = router;
  const translate = locale === "en" ? en : fr;

  return translate;
};
