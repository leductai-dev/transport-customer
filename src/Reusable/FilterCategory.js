import React, { useEffect, useState } from "react";

const FilterCategory = (props) => {
  // const [category, setCategory] = useState(null);

  // useEffect(() => {
  //   if (props.category !== null) {
  //     setCategory(props.category);
  //   }
  // }, [props.category]);

  return (
    <>
      <div className="filter filter1">
        <details open>
          <summary type="button" className="collapsible">
            Category
          </summary>
          <div className="content">
            {props.categoryList.map((cat, i) => {
              return (
                <div className="form-check" key={i}>
                  <label className="form-check-label">
                    {console.log(
                      "filterCategory",
                      props.category,
                      cat.categoryName
                    )}
                    <input
                      type="radio"
                      name="category"
                      checked={props.category.categoryName === cat.categoryName}
                      className="form-check-input"
                      value={cat.categoryName}
                      onChange={() => props.onClick(cat)}
                    />
                    {cat.categoryName.toUpperCase()}
                  </label>
                </div>
              );
            })}
            {/* <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="ias" />
              IAS
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="ies" />
              IES
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="rrb" />
              RRB
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="law" />
              LAW
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                value="gate"
              />
              GATE
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                value="csir"
              />
              CSIR
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                value="iit-jee"
              />
              IIT-JEE
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                value="neet"
              />
              NEET
            </label>
          </div> */}
          </div>
        </details>
      </div>
    </>
  );
};

export default FilterCategory;
