import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { PRODUCT_ACTIONS } from "../../../constants";

const SearchProduct = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    dispatch({ type: PRODUCT_ACTIONS.SEARCH_PRODUCT, name: query });
  }, []);

  return <div className="page products-page">Result and more</div>;
};

export default SearchProduct;
