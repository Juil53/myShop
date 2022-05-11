import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constant } from "../../constants";
//import { categoryAction } from "../../store/categories/actions";
import { fetchCategories } from "../../store/categories/actions";

export default function CategoryCard() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [active, setActive] = useState([]);

  function handleActiveDropdown(cate) {
    const tmp = [...active];
    if (active.includes(cate)) {
      tmp.splice(tmp.indexOf(cate), 1);
    } else {
      tmp.push(cate);
    }
    setActive(tmp);
  }

  useEffect(() => {
    if (categories.status === constant.LOADING) {
      dispatch(fetchCategories());
    }
  });

  function createCategory(data) {
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
            <a href="#">{v.name}</a>
            <div
              className="dropdown-btn"
              onClick={() => {
                handleActiveDropdown(v.id);
              }}
            >
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
          {v.sub_cate && (
            <div
              className={
                active.includes(v.id)
                  ? "subcate-dropdown subcate-active"
                  : "subcate-dropdown"
              }
            >
              {createSubCateDropdown(v.sub_cate)}
            </div>
          )}
        </div>
      );
    });
  }

  function createSubCateDropdown(data) {
    return data.map((v) => {
      return (
        <div className="subcate" key={v.id}>
          <i className="fa-solid fa-star"></i>
          <a href="#">{v.name}</a>
        </div>
      );
    });
  }

  return (
    <div className="categorycard">
      <div className="title">Danh mục sản phẩm</div>
      <div className="categorycard__content">
        {categories.status === constant.GET_CATEGORY_SUCCESS &&
          createCategory(categories.data)}
      </div>
    </div>
  );
}
