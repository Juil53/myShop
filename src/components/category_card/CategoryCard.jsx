import { useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ categories}) {
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
                <Link to={`?category=${v.id}`}>{v.name}</Link>

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
                  {createSubCateDropdown(v.subCate)}
                </div>
              )}
            </div>
          );
        });
      }
    }
  }

  function createSubCateDropdown(data) {
    return data.map((v) => {
      return (
        <div className="subcate" key={v.id}>
          <i className="fa-solid fa-star"></i>
          <button onClick={() => {}} value={v.id}>
            {v.name}
          </button>
        </div>
      );
    });
  }

  return (
    <div className="categorycard">
      <div className="title">Danh mục sản phẩm</div>
      <div className="categorycard__content">
        {categories && categories.length && createCategory(categories)}
      </div>
    </div>
  );
}
