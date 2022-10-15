import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import arrow_rightIcon from "../../../assets/icons/arrow_right.icon";
import searchIcon from "../../../assets/icons/search.icon";

interface Props {
  updateQuery: (q: string) => void;
  isLoading: boolean;
  initialQuery: string;
}

const Searchbox = ({ updateQuery, isLoading, initialQuery }: Props) => {
  const [query, setQuery] = useState<string>(initialQuery);

  return (
    <form className={`input__group`} onSubmit={(e) => e.preventDefault()}>
      <div className={`input__field`}>
        <div className="input__icon">{searchIcon}</div>

        <input
          type="text"
          placeholder="Find rhymes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <button className={"input__button"} onClick={() => updateQuery(query)}>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <>
            <span>Rhyme it</span>

            <div>{arrow_rightIcon}</div>
          </>
        )}
      </button>
    </form>
  );
};

export default Searchbox;
