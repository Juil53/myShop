import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constant } from "../../constants";
import { categoryAction } from "../../store/actions/CategoryAction";

export default function CategoryCard() {
  const category = useSelector((store) => store.category.category);
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
    if (category.status === constant.LOADING) {
      dispatch(categoryAction.getAllCategory());
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
        {category.status === constant.SUCCESS && createCategory(category.data)}
      </div>
    </div>
  );
}
