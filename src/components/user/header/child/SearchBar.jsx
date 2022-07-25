import React, { memo, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { actions as productActions } from "../../../../store/products/slice";
import { debounce } from "../../../../utils";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const handleSearch = () => {
    if (!searchKey) return;
    document.location.href = "/product?query=" + searchKey;
  };

  const [chipData, setChipData] = React.useState([{ key: 0, label: `${query}` }]);

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
              placeholder="Type product name to search"
            />
            {/* Chip */}
            {query && (
              <div className="search-chip">
                <ul style={{ display: "flex" }}>
                  {chipData.map((data) => {
                    return (
                      <ListItem key={data.key}>
                        <Chip
                          size="small"
                          label={data.label}
                          onDelete={data.label === "React" ? undefined : handleDelete(data)}
                        />
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
                backgroundColor: "secondary.dark",
                borderRadius: 0,
                height:'4rem',
                padding:'0 10px',
                minWidth:'6rem',
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
