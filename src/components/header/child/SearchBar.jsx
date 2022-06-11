import React, { useCallback, useState } from "react";

import { debounce } from "../../../utils";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = () => {
    if (!searchKey) return;
    document.location.href = "/product?query=" + searchKey;
    console.log(searchKey);
  };

  //Tri hoan thuc thi ham
  const debounceSearch = useCallback(
    debounce((value) => {
      console.log(value);
      setSearchKey(value);
    }, 100),
    []
  );

  function handleChangeInput({ target }) {
    const { value } = target;
    debounceSearch(value);
  }

  function handleKeyDown(e) {
    if (e.code === "Enter") {
      handleSearch();
    }
  }

  const SearchBox = () => {
    return (
      <div className="nav-btn search-box">
        <button onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass" />
        </button>
        <input
          type="text"
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          placeholder="Search here"
        />
      </div>
    );
  };

  return <React.Fragment>{SearchBox()}</React.Fragment>;
};

export default SearchBar;
