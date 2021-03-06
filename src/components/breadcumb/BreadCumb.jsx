import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

export default function Breadcrumb({pages,color}) {
  const lastPage = pages.pop();
  const handleBreadCumb = (array) => {
    return array.map((item, index) => (
      <Link as={NavLink} key={index} underline="hover" to={item.url}>
        {item.name}
      </Link>
    ));
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {handleBreadCumb(pages)}
        <Link as={NavLink} underline="hover" sx={{color:{color},fontSize:'2rem',fontWeight:500}} to={lastPage?.url}>
          {lastPage?.name}
        </Link>
      </Breadcrumbs>
    </div>
  );
}
