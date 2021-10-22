import React, { useEffect, useState } from "react";
import CourseCard from "../../Reusable/CourseCard";
import { db } from "../../Services/firebase";

const TopCourses = (props) => {
  const [topCourses, setTopCourses] = useState(null);

  useEffect(() => {
    let list = [];
    console.log("cat", props.category);
    db.collection("subCategories")
      .doc(props.category[0].subcategoryList[0].subCategoryId)
      .collection("courses")
      .where("status", "==", "Verified")
      .limit(4)
      .get()
      .then((data) => {
        // console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        // console.log("-------");
        setTopCourses(list);
        // console.log("listttt", list);
      })
      .catch((e) => console.log("sdasd", e));
  }, []);

  const getTopCourse = (cate) => {
    let list = [];
    console.log("xbdfh", cate);
    db.collection("subCategories")
      .doc(cate.subcategoryList[0].subCategoryId)
      .collection("courses")
      .where("status", "==", "Verified")
      .limit(4)
      .get()
      .then((data) => {
        // console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        console.log("-------");
        setTopCourses(list);
        console.log("listttt", list);
      })
      .catch((e) => console.log("sdasd", e));
  };

  let ui = null;
  if (topCourses !== null) {
    ui = topCourses.map((courses) => {
      console.log("cour", courses);
      return (
        <div
          className="item col-sm-6 col-md-4 col-lg-3 col-xl-3"
          key={courses.id}
        >
          <CourseCard course={courses} />;
        </div>
      );
      // <CourseCard course={courses} key={i} />;
    });
  }

  return (
    <section className="course_sect">
      <div className="container-fluid">
        <h3>Browse Our Courses</h3>
        <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
        <div className="course_filter_tab">
          <ul className="list-inline">
            {props.category.map((cate, i) => {
              // console.log("cateee", cate);

              return (
                <li className="list-inline-item" key={i}>
                  <button
                    className="filter-button"
                    onClick={() => getTopCourse(cate)}
                  >
                    {cate.categoryName.toUpperCase()}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="content row">{ui}</div>
      </div>
    </section>
  );
};

export default TopCourses;
