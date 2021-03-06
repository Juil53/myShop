import { useState } from "react";
import { Link, useParams, useSearchParams, createSearchParams } from "react-router-dom";

export default function CategoryCard({ categories, currentCate = {} }) {
  const { mainCate: mainCateUrl, subCate: subCateUrl } = currentCate;
  const [active, setActive] = useState([mainCateUrl]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  if (!active.includes(mainCateUrl)) {
    const newActive = [...active];
    newActive.push(mainCateUrl);
    setActive(newActive);
  }

  function handleActiveDropdown(cate) {
    const tmp = [...active];
    if (active.includes(cate)) {
      tmp.splice(tmp.indexOf(cate), 1);
    } else {
      tmp.push(cate);
    }
    setActive(tmp);
  }

  function createCategory(data) {
    if (data) {
      if (data.length !== 0) {
        return data.map((v) => {
          return (
            <div className="categorycard__category" key={v.id}>
              <div
                className={
                  active.includes(v.id)
                    ? "categorycard__category-name row active"
                    : "categorycard__category-name row"
                }
              >
                <Link
                  to={
                    query !== ""
                      ? {
                          pathname: `/product?query=${query}&?category=${v.id}`,
                        }
                      : { pathname: `/product?category=${v.id}` }
                  }
                  onClick={() => {
                    handleActiveDropdown(v.id);
                  }}
                  className="category__btn"
                >
                  {v.name}
                </Link>
                <div
                  className="dropdown-btn"
                  onClick={() => {
                    handleActiveDropdown(v.id);
                  }}
                >
                  <i className="fa-solid fa-angle-right"></i>
                </div>
              </div>

              {v.subCate && (
                <div
                  className={
                    active.includes(v.id) ? "subcate-dropdown subcate-active" : "subcate-dropdown"
                  }
                >
                  {createSubCateDropdown(v.subCate, v.id)}
                </div>
              )}
            </div>
          );
        });
      }
    }
  }

  function createSubCateDropdown(data, mainCateID) {
    return data.map((v) => {
      return (
        <div className={v.id === subCateUrl ? "subcate active" : "subcate"} key={v.id}>
          <i className="fa-solid fa-star"></i>
          <Link
            to={
              query !== ""
                ? { pathname: `/product?query=${query}?category=${mainCateID}&subCate=${v.id}` }
                : {
                    pathname: `/product?category=${mainCateID}&subCate=${v.id}`,
                  }
            }
            onClick={() => {
              handleActiveDropdown(v.id);
            }}
          >
            {v.name}
          </Link>
        </div>
      );
    });
  }

  return (
    <div className="categorycard">
      <div className="title">Danh m???c s???n ph???m</div>
      <div className="categorycard__content">
        {categories && categories.length && createCategory(categories)}
      </div>
    </div>
  );
}
