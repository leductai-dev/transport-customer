import React, { useEffect, useState } from "react";
// import { Route } from "react-router";
import FilterCategory from "../../Reusable/FilterCategory";
import FilterSubcategory from "../../Reusable/FilterSubcategory";
import $ from "jquery";

const CoursesFilter = (props) => {
  const filters = props.filter;
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);

  useEffect(() => {
    // edge case - initially it will be null before useEffect in parent class
    let urlString = window.location.href;
    var url = new URL(urlString);
    var categoryName = url.searchParams.get("categoryName");
    var subcategoryName = url.searchParams.get("subcategoryName");
    var subcategoryId = url.searchParams.get("subcategoryId");
    // console.log("filterCate", categoryName, subcategoryName, subcategoryId);

    if (filters !== null) {
      let catList = [];
      filters.forEach((data, i) => {
        // console.log("fil", data);
        if (categoryName !== null && subcategoryName !== null) {
          // console.log("if", categoryName, data.categoryName);
          if (categoryName === data.categoryName) {
            setCategory(data);
            let subcat = data.subcategoryList.find((c) => {
              return subcategoryId === c.subCategoryId;
            });
            setSubcategory(subcat);
            setSubcategoryList(data.subcategoryList);
          }
        } else if (categoryName !== null) {
          if (categoryName === data.categoryName) {
            setCategory(data);
            setSubcategory(data.subcategoryList[0]);
            setSubcategoryList(data.subcategoryList);
          }
        } else {
          if (i === 0) {
            // initially first should be selected
            console.log("inside else", data);
            setCategory(data);
            setSubcategory(data.subcategoryList[0]); // i is 0
            setSubcategoryList(data.subcategoryList);
          }
        }
        catList.push(data);
      });
      setCategoryList(catList);
    }
  }, [filters]);

  $("summary").click(function () {
    $(this).toggleClass(".active");
  });

  const onCategoryChangeHandler = (cat) => {
    // console.log("onCatChangeHandler", cat);
    setCategory(cat);
    setSubcategory(cat.subcategoryList[0]); // i is 0
    setSubcategoryList(cat.subcategoryList);
  };

  const onSubcategoryChangeHandler = (subcat) => {
    // console.log("onSubcatChangeHandler", subcat);
    setSubcategory(subcat);
  };

  const submitHandler = () => {
    // let categoryName = category.categoryName;
    let subcategoryId = subcategory.subCategoryId;
    let cat = $("input[type='radio'][name='category']:checked").val();
    let subcat = $("input[type='radio'][name='subcategory']:checked").val();
    let price = $("input[type='radio'][name='price']:checked").val();
    let language = $("input[type='radio'][name='language']:checked").val();
    let rating = $("input[type='radio'][name='rating']:checked").val();
    console.log(cat, subcat, price, language, rating);
    props.getFilteredCourses(
      cat,
      subcat,
      subcategoryId,
      price,
      language,
      rating
    );
  };

  const clearHandler = () => {
    // $('input[name="category"]').prop("checked", false);
    // $('input[name="subcategory"]').prop("checked", false);
    $('input[name="price"]').prop("checked", false);
    $('input[name="language"]').prop("checked", false);
    $('input[name="rating"]').prop("checked", false);
  };

  return (
    <div className="col-md-4 col-lg-3 col-xl-3 filter-grid special-case">
      <div className="scroll_sect">
        {/* Filter based on Category */}
        <FilterCategory
          category={category}
          categoryList={categoryList}
          onClick={onCategoryChangeHandler}
        />
        {/* Filter based on Sub-Category */}
        <FilterSubcategory
          subcategory={subcategory}
          subcategoryList={subcategoryList}
          onClick={onSubcategoryChangeHandler}
        />

        {/* Filter based on Price */}
        <div className="filter filter3">
          <details>
            <summary className="collapsible">Price</summary>
            <div className="content">
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="price"
                    className="form-check-input"
                    value="free"
                  />
                  Free
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="price"
                    className="form-check-input"
                    value="paid"
                  />
                  Paid
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="price"
                    className="form-check-input"
                    value="0-250"
                  />
                  Very Low (0-250)
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="price"
                    className="form-check-input"
                    value="250-500"
                  />
                  Low (250-500)
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="price"
                    className="form-check-input"
                    value="500-1000"
                  />
                  Medium (500-1000)
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="price"
                    className="form-check-input"
                    value="1000-2500"
                  />
                  High (1000-2500)
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="price"
                    className="form-check-input"
                    value="2500"
                  />
                  Very High (More than 2500)
                </label>
              </div>
            </div>
          </details>
        </div>

        {/* Filter based on Language */}
        <div className="filter filter4">
          <details>
            <summary type="button" className="collapsible">
              Language
            </summary>
            <div className="content">
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="language"
                    className="form-check-input"
                    value="english"
                  />
                  English
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="language"
                    className="form-check-input"
                    value="tamil"
                  />
                  Tamil
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="language"
                    className="form-check-input"
                    value="hindi"
                  />
                  Hindi
                </label>
              </div>
            </div>
          </details>
        </div>

        {/* Filter based on Rating */}
        <div className="filter filter5">
          <details>
            <summary type="button" className="collapsible">
              Rating
            </summary>
            <div className="content">
              {/* <div className="form-check">
              <label className="form-check-label">
                <input
                  type="radio"
                  name="rating"
                  className="form-check-input"
                  value="Show All"
                />
                Show All
              </label>
            </div> */}
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="rating"
                    className="form-check-input"
                    value="1"
                  />
                  1 Star & Above
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="rating"
                    className="form-check-input"
                    value="2"
                  />
                  2 Star & Above
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="rating"
                    className="form-check-input"
                    value="3"
                  />
                  3 Star & Above
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="rating"
                    className="form-check-input"
                    value="4"
                  />
                  4 Star & Above
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="rating"
                    className="form-check-input"
                    value="5"
                  />
                  5 Star
                </label>
              </div>
            </div>
          </details>
        </div>

        <div className="apply-filter">
          <button
            type="button"
            onClick={submitHandler}
            className="btn"
            style={{ marginRight: "10px" }}
          >
            Apply
          </button>
          <button type="button" onClick={clearHandler} className="btn">
            Clear
          </button>
        </div>
      </div>
      {/* <div className="guarantee-box">
        <div className="logo_header">
          <img
            className="currency_logo"
            src="/images/currencylogo.png"
            alt="Currency In Hand"
          />
          Not Sure?
        </div>
        <p>Every course comes with a 7-days Free Trial</p>
      </div> */}
    </div>
  );
};

export default CoursesFilter;

// $(document).ready(function () {
// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function () {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//     if (content.style.maxHeight) {
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     }
//   });
// }
// });
