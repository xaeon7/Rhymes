import { useState } from "react";
import arrow_rightIcon from "../../../assets/icons/arrow_right.icon";
import searchIcon from "../../../assets/icons/search.icon";

interface Props {
  updateQuery: (q: string) => void;
  isLoading: boolean;
}

const Searchbox = ({ updateQuery, isLoading }: Props) => {
  const [query, setQuery] = useState<string>("");

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
