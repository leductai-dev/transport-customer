import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CoursesFilter from "./CoursesFilter";
import CourseCard from "../../Reusable/CourseCard";
import Spinners from "../../UI/Spinner/spinBackdrop";
import { getCourses, getFilterOptions } from "./CoursesDB";
import ReactPaginate from "react-paginate";
import AlgoliaSearch from "../../NewFeatureTest/AlgoliaSearch";

const Courses = (props) => {
  const [courses, setCourses] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [all, setAll] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const perPage = 6;
  const pagesVisited = pageNumber * perPage;

  useEffect(() => {
    let urlString = window.location.href;
    var url = new URL(urlString);
    var categoryName = url.searchParams.get("categoryName");
    var subcategoryName = url.searchParams.get("subcategoryName");
    var subcategoryId = url.searchParams.get("subcategoryId");

    getFilterOptions((filter) => {
      setFilterOptions(filter);
      let subcatId = "";
      // only category
      // console.log("setCatSubcatDetails", catSubcatDetails);
      if (categoryName !== null && subcategoryName === null) {
        let cat = filter.find((c) => c.categoryName === categoryName);
        subcatId = cat.subcategoryList[0].subCategoryId;
      } else if (categoryName !== null && subcategoryName !== null) {
        // category, subcategory
        let cat = filter.find((c) => c.categoryName === categoryName);
        let subcat = cat.subcategoryList.find(
          (c) => c.subCategoryId === subcategoryId
        );
        subcatId = subcat.subCategoryId;
      } else {
        subcatId = filter[0].subcategoryList[0].subCategoryId;
      }
      // get subcategoryId to get the courses for that subcategory
      // console.log(subcatId);
      getCourses((courses, fromCache) => {
        setAll(courses);
        const slice = courses.slice(pagesVisited, pagesVisited + perPage);
        setCourses(slice);
        setPageCount(Math.ceil(courses.length / perPage));
      }, subcatId);
    });
  }, []);

  const getPaginatedCourses = () => {
    // all - bcs it only as all the data
    if (all !== null) {
      const slice = all.slice(pagesVisited, pagesVisited + perPage);
      setPageCount(Math.ceil(all.length / perPage));
      setCourses(slice);
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPageNumber(selectedPage);
  };

  useEffect(() => {
    getPaginatedCourses();
  }, [pageNumber]);

  const getFilteredCourses = (
    cat,
    subcat,
    subcategoryId,
    price,
    language,
    rating
  ) => {
    // console.log("getFilteredCourses", subcategoryId);
    // optimize later - indexedDB
    getCourses((courses, fromCache) => {
      if (
        price !== undefined &&
        language !== undefined &&
        rating !== undefined
      ) {
        if (price === "free") {
          let filteredCourse = courses.filter((c) => {
            return (
              c.publish.originalPrice === 0 &&
              c.lang === language &&
              c.rating >= rating
            );
          });
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
          // const slice = filteredCourse.slice(offset, offset + perPage);
          // setPageCount(Math.ceil(filteredCourse.length / perPage));
          // setCourses(slice);
          // setCourses(filteredCourse);
        } else if (price === "paid") {
          let filteredCourse = courses.filter((c) => {
            return (
              c.publish.originalPrice !== 0 &&
              c.lang === language &&
              c.rating >= rating
            );
          });
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        } else if (
          price === "0-250" ||
          price === "250-500" ||
          price === "500-1000" ||
          price === "1000-2500"
        ) {
          let range = price.split("-");
          let filteredCourse = courses.filter((c) => {
            return (
              c.publish.originalPrice >= parseInt(range[0]) &&
              c.publish.originalPrice <= parseInt(range[1]) &&
              c.lang === language &&
              c.rating >= rating
            );
          });
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        } else {
          // greater than 2500
          let filteredCourse = courses.filter((c) => {
            return (
              c.publish.originalPrice > parseInt(price) &&
              c.lang === language &&
              c.rating >= rating
            );
          });
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        }
      } else if (
        price !== undefined &&
        language !== undefined &&
        rating === undefined
      ) {
        if (price === "free") {
          let filteredCourse = courses.filter((c) => {
            return c.publish.originalPrice === 0 && c.lang === language;
          });
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        } else if (price === "paid") {
          let filteredCourse = courses.filter((c) => {
            return c.publish.originalPrice !== 0 && c.lang === language;
          });
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        } else if (
          price === "0-250" ||
          price === "250-500" ||
          price === "500-1000" ||
          price === "1000-2500"
        ) {
          let range = price.split("-");
          let filteredCourse = courses.filter((c) => {
            return (
              c.publish.originalPrice >= parseInt(range[0]) &&
              c.publish.originalPrice <= parseInt(range[1]) &&
              c.lang === language
            );
          });
          // setCourses(filteredCourse);
          // setAll(filteredCourse);
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        } else {
          // greater than 2500
          let filteredCourse = courses.filter((c) => {
            return (
              c.publish.originalPrice > parseInt(price) && c.lang === language
            );
          });
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        }
      } else if (
        price !== undefined &&
        language === undefined &&
        rating === undefined
      ) {
        if (price === "free") {
          let filteredCourse = courses.filter(
            (c) => c.publish.originalPrice === 0
          );
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        } else if (price === "paid") {
          let filteredCourse = courses.filter(
            (c) => c.publish.originalPrice !== 0
          );
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        } else if (
          price === "0-250" ||
          price === "250-500" ||
          price === "500-1000" ||
          price === "1000-2500"
        ) {
          let range = price.split("-");
          let filteredCourse = courses.filter((c) => {
            return (
              c.publish.originalPrice >= parseInt(range[0]) &&
              c.publish.originalPrice <= parseInt(range[1])
            );
          });
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        } else {
          // greater than 2500
          let filteredCourse = courses.filter(
            (c) => c.publish.originalPrice > parseInt(price)
          );
          setAll(filteredCourse);
          const slice = filteredCourse.slice(
            pagesVisited,
            pagesVisited + perPage
          );
          setPageCount(Math.ceil(filteredCourse.length / perPage));
          setCourses(slice);
        }
      } else if (
        price === undefined &&
        language !== undefined &&
        rating !== undefined
      ) {
        // lang,rating
        let filteredCourse = courses.filter((c) => {
          return c.lang === language && c.rating >= rating;
        });
        setAll(filteredCourse);
        const slice = filteredCourse.slice(
          pagesVisited,
          pagesVisited + perPage
        );
        setPageCount(Math.ceil(filteredCourse.length / perPage));
        setCourses(slice);
      } else if (
        price === undefined &&
        language === undefined &&
        rating !== undefined
      ) {
        // rating
        let filteredCourse = courses.filter((c) => {
          return c.rating >= rating;
        });
        setAll(filteredCourse);
        const slice = filteredCourse.slice(
          pagesVisited,
          pagesVisited + perPage
        );
        setPageCount(Math.ceil(filteredCourse.length / perPage));
        setCourses(slice);
      } else if (
        price === undefined &&
        language !== undefined &&
        rating === undefined
      ) {
        // language
        let filteredCourse = courses.filter((c) => {
          return c.lang === language;
        });
        setAll(filteredCourse);
        const slice = filteredCourse.slice(
          pagesVisited,
          pagesVisited + perPage
        );
        setPageCount(Math.ceil(filteredCourse.length / perPage));
        setCourses(slice);
      } else {
        // no price, lang, rating
        setAll(courses);
        const slice = courses.slice(pagesVisited, pagesVisited + perPage);
        setPageCount(Math.ceil(courses.length / perPage));
        setCourses(slice);
      }
    }, subcategoryId);
  };

  const getLiveOnline = () => {
    // console.log(".....cou", courses);
    let data;
    // if (document.getElementById("liveonline") !== null) {
    if (document.getElementById("liveonline").value === "live") {
      data = all.filter((c) => {
        return c.types === "Live";
      });
      const slice = data.slice(pagesVisited, pagesVisited + perPage);
      setPageCount(Math.ceil(data.length / perPage));
      setCourses(slice);
      // setCourses(data);
    } else if (document.getElementById("liveonline").value === "online") {
      data = all.filter((c) => {
        return c.types === "Online";
      });
      const slice = data.slice(pagesVisited, pagesVisited + perPage);
      setPageCount(Math.ceil(data.length / perPage));
      setCourses(slice);
      // setCourses(data);
    } else {
      const slice = all.slice(pagesVisited, pagesVisited + perPage);
      setPageCount(Math.ceil(all.length / perPage));
      setCourses(slice);
      // setCourses(all);
    }
    // }
  };

  let coursesLists = null;
  if (courses === null) {
    coursesLists = <p>Loading!!!</p>;
  } else if (courses.length === 0) {
    coursesLists = <h1>No courses!!!</h1>;
  } else {
    coursesLists = courses.map((course, i) => (
      <div key={course.id} className="item col-sm-6 col-md-6 col-lg-4 col-xl-4">
        <CourseCard course={course} {...props} />
      </div>
    ));
  }

  // const mobileFilter = (html) => {
  //   const nav = document.querySelector("trigger");
  //   nav.innerHTML = html;
  // };

  // const Component1 = (
  //   <details className="mobile-filter">
  //     <summary className="sum">
  //       Filter<i class="fas fa-sort-down"></i>
  //     </summary>
  //     <CoursesFilter
  //       filter={filterOptions}
  //       getFilteredCourses={getFilteredCourses}
  //     />
  //   </details>
  // );

  // const Component2 = <></>;

  // const mql = window.matchMedia("(min-width: 768px)");

  // let mobileView = mql.matches;

  // if (mobileView) {
  //   mobileFilter(Component1);
  // } else {
  //   mobileFilter(Component2);
  // }

  // let mobileFilter = null;

  // if (mobileView) {
  //   mobileFilter = (
  //     <details className="mobile-filter">
  //       <summary className="sum">
  //         Filter<i class="fas fa-sort-down"></i>
  //       </summary>
  //       <CoursesFilter
  //         filter={filterOptions}
  //         getFilteredCourses={getFilteredCourses}
  //       />
  //     </details>
  //   );
  // } else {
  //   mobileFilter = null;
  // }

  return (
    <>
      {/* courses banner image */}
      <section
        className="navbar_sect trigger"
        id="trigger"
        style={{ backgroundImage: "url(/images/bg4.jpg)" }}
      >
        <div className="courses_section">
          <div className="container-fluid">
            <div className="inner_container">
              <h1>COURSES</h1>
              <p>
                <Link to="/home">Home</Link>&ensp;/&ensp;Courses
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="sect3_courses">
        <div className="container-fluid p-0">
          {/* <details className="mobile-filter">
            <summary className="sum">
              Filter<i class="fas fa-sort-down"></i>
            </summary>
            <CoursesFilter
              filter={filterOptions}
              getFilteredCourses={getFilteredCourses}
            />
          </details> */}
          {/* {mobileFilter} */}
          <div className="row" style={{ margin: "0" }}>
            <CoursesFilter
              filter={filterOptions}
              getFilteredCourses={getFilteredCourses}
            />
            <div className="col-md-8 col-lg-9 col-xl-9 course-grid">
              <div className="row_head">
                <div className="inner-div">
                  <p className="noi">
                    {all !== null && all.length}&ensp;
                    <i>Results&emsp;</i>
                    {/* 1,145&ensp;<i>Video Tutorials</i> */}
                  </p>

                  <select
                    id="liveonline"
                    className="liveOnline"
                    onChange={getLiveOnline}
                  >
                    <option value="all">All</option>
                    <option value="live">Live</option>
                    <option value="online">Online</option>
                  </select>
                </div>
                {/* <AlgoliaSearch /> */}
              </div>
              <div className="row">{coursesLists}</div>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
              {/* <div className="mbp_pagination">
                <ul className="page_navigation">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#a"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      <span>
                        <i className="fas fa-arrow-left"></i>
                      </span>
                      &ensp;Prev
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#a">
                      1
                    </a>
                  </li>
                  <li className="page-item" aria-current="page">
                    <a className="page-link" href="#s">
                      2 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#9d">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#d">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#ds">
                      14
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#asd">
                      <span>
                        Next&ensp;<i className="fas fa-arrow-right"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Courses;
