import { useRouter } from "next/router";

// import { getCookie } from "cookies-next";
import { currentLocales } from "locales";

import en from "locales/en";
import fr from "locales/fr";
import de from "locales/de";
import es from "locales/es";
import hi from "locales/hi";
import it from "locales/it";
import nl from "locales/nl";
import ru from "locales/ru";

export const useLang = () => {
  const router = useRouter();

  const locale = router.locale;
  // const recentLang = getCookie("lang");

  // let currentLang;

  // if (recentLang) {
  //   currentLang = currentLocales.includes(recentLang as string)
  //     ? recentLang
  //     : "en";
  // } else {
  //   currentLang = currentLocales.includes(locale as string) ? locale : "en";
  // }

  const currentLang = currentLocales.includes(locale as string) ? locale : "en";

  switch (currentLang) {
    case "de":
      return de;

    case "en":
      return en;

    case "es":
      return es;

    case "fr":
      return fr;

    case "hi":
      return hi;

    case "it":
      return it;

    case "nl":
      return nl;

    case "ru":
      return ru;

    default:
      return en;
  }
};
