import { useState } from "react";
import arrow_rightIcon from "../../../assets/icons/arrow_right.icon";
import searchIcon from "../../../assets/icons/search.icon";

import { useLang } from "hooks/useLang";
interface Props {
  updateQuery: (q: string) => void;
  isLoading: boolean;
  initialQuery: string;
}

const Searchbox = ({ updateQuery, isLoading, initialQuery }: Props) => {
  const [query, setQuery] = useState<string>(initialQuery);

  const translate = useLang();

  return (
    <form className={`input__group`} onSubmit={(e) => e.preventDefault()}>
      <div className={`input__field`}>
        <div className="input__icon">{searchIcon}</div>

        <input
          type="text"
          placeholder={translate.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <button className={"input__button"} onClick={() => updateQuery(query)}>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <>
            <span>{translate.searchButton}</span>

            <div>{arrow_rightIcon}</div>
          </>
        )}
      </button>
    </form>
  );
};

export default Searchbox;
