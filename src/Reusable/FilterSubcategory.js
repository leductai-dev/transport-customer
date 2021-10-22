import React from "react";

const FilterSubcategory = (props) => {
  return (
    <>
      <div className="filter filter2">
        <details open>
          <summary type="button" className="collapsible">
            Sub Category
          </summary>
          <div className="content">
            {props.subcategoryList.map((subcat, i) => {
              return (
                <div className="form-check" key={i}>
                  <label className="form-check-label">
                    <input
                      type="radio"
                      name="subcategory"
                      checked={
                        props.subcategory.subCategoryId === subcat.subCategoryId
                      }
                      className="form-check-input"
                      value={subcat.subCategoryName}
                      onChange={() => props.onClick(subcat)}
                    />
                    {subcat.subCategoryName.toUpperCase()}
                  </label>
                </div>
              );
            })}

            {/* <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                value="preliminary"
              />
              PRELIMINARY
            </label>
          </div> */}
          </div>
        </details>
      </div>
    </>
  );
};

export default FilterSubcategory;
