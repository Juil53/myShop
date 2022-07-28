import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import React, { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { actions as productActions } from "../../../../store/products/slice";
import { debounce } from "../../../../utils";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [searchKey, setSearchKey] = useState(() => {
    if (query) return query
    return ""
  });
  const [chipData, setChipData] = useState(()=>{
    if(searchKey){
      return [{ key: 0, label: `${searchKey}` }]
    }
    return []
  });

  const handleSearch = () => {
    if (!searchKey) return;
    document.location.href = "/product?query=" + searchKey;
  };

  const handleDelete = (chipToDelete) => () => {
    dispatch(productActions.searchProductRequest({ name: "" }));
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    setSearchParams("");
  };

  //Tri hoan thuc thi ham
  const debounceSearch = useCallback(
    debounce((value) => {
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
      <>
        <div className="search-box">
          <div className="search-input">
            <input
              type="text"
              onChange={handleChangeInput}
              onKeyDown={handleKeyDown}
              placeholder="Type something to search"
            />
            {/* Chip */}
            {searchKey && (
              <div className="search-chip">
                <ul style={{ display: "flex" }}>
                  {chipData.map((data) => {
                    return (
                      <ListItem key={data.key}>
                        <Chip size="small" label={data.label} onDelete={handleDelete(data)} />
                      </ListItem>
                    );
                  })}
                </ul>
              </div>
            )}
            <Button
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={{
                display: { xs: "none", sm: "flex" },
                backgroundColor: "secondary.dark",
                borderRadius: 0,
                height: "4rem",
                padding: "0 10px",
                minWidth: "10rem",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                  color: "#fff",
                },
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </>
    );
  };

  return <React.Fragment>{SearchBox()}</React.Fragment>;
};

export default memo(SearchBar);
