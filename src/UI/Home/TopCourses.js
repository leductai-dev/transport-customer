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
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="pricing-plans d-flex flex-column flex-lg-row my-auto">
              <div class="plan options">
                <div class="plan-info">
                  <ul class="list-group first text-right">
                    <li class="list-group-item"><strong>Shipments Per Month</strong> </li>
                    <li class="list-group-item">All Selling Channels</li>
                    <li class="list-group-item">Users</li>
                    <li class="list-group-item">Branded Labels</li>
                    <li class="list-group-item">Packing Slips</li>
                    <li class="list-group-item">E-mail/Forum Support</li>
                    <li class="list-group-item">Live Chat</li>
                    <li class="list-group-item">Phone Support</li>
                  </ul>
                </div>
              </div>
              <div class="plan">
                <div class="plan-header gray">
                  <h3>
                    <span class="label">Starter</span>
                    <div class="figure">
                      <span class="amount">9</span>
                    </div>
                  </h3>
                  <div class="button"><a href="/step1?starter/" class="btn btn-sm btn-secondary">Try It Free</a></div>
                </div>
                <div class="plan-info">
                  <ul class="list-group">
                    <li class="list-group-item">50</li>
                    <li class="list-group-item">
                      <i class="fas fa-check text-success fa-lg"></i>
                    </li>
                    <li class="list-group-item">
                      1
                    </li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item">Branded</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-times text-danger fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-times text-danger fa-lg"></i></li>
                  </ul>
                </div>
              </div>
              <div class="plan">
                <div class="plan-header bronze">
                  <h3>
                    <span class="label">Bronze</span>
                    <div class="figure">
                      <span class="amount">29</span>
                    </div>
                  </h3>
                  <div class="button"><a href="/step1?bronze/" class="btn btn-secondary btn-sm ">Try It Free</a></div>
                </div>
                <div class="plan-info">
                  <ul class="list-group">
                    <li class="list-group-item">500</li>
                    <li class="list-group-item">  <i class="fas fa-check text-success fa-lg"></i> </li>
                    <li class="list-group-item">1</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item">Branded</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-times text-danger fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-times text-danger fa-lg"></i></li>
                  </ul>
                </div>
              </div>
              <div class="plan">
                <div class="plan-header silver">
                  <h3 class="panel-heading">
                    <span class="label">Silver</span>
                    <div class="figure">
                      <span class="amount">49</span>
                    </div>
                  </h3>
                  <div class="button"><a href="/step1?silver/" class="btn btn-secondary btn-sm">Try It Free</a></div>
                </div>
                <div class="plan-info">
                  <ul class="list-group">
                    <li class="list-group-item">1,500</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i> </li>
                    <li class="list-group-item">2</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item">Customized</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-times text-danger fa-lg"></i></li>
                  </ul>
                </div>
              </div>
              <div class="plan popular">
                <div class="plan-header gold">
                  <h3 class="panel-heading">
                    <span class="label">Gold</span>
                    <div class="figure">
                      <span class="amount">69</span>
                    </div>
                  </h3>
                  <div class="button"><a href="/step1?gold/" class="btn btn-secondary btn-sm">Try It Free</a></div>
                </div>
                <div class="plan-info">
                  <ul class="list-group">
                    <li class="list-group-item">3,000</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i> </li>
                    <li class="list-group-item">3</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item">Customized</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-times text-danger fa-lg"></i></li>
                  </ul>
                </div>
              </div>
              <div class="plan">
                <div class="plan-header platinum">
                  <h3 class="panel-heading">
                    <span class="label">Platinum</span>
                    <div class="figure">
                      <span class="amount">99</span>
                    </div>
                  </h3>
                  <div class="button"><a href="/step1?platinum/" class="btn btn-secondary btn-sm">Try It Free</a></div>
                </div>
                <div class="plan-info">
                  <ul class="list-group">
                    <li class="list-group-item">6,000</li>
                    <li class="list-group-item">  <i class="fas fa-check text-success fa-lg"></i> </li>
                    <li class="list-group-item">5</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item">Customized</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-times text-danger fa-lg"></i></li>
                  </ul>
                </div>
              </div>
              <div class="plan">
                <div class="plan-header ent last">
                  <h3>
                    <span class="label">Enterprise</span>
                    <div class="figure">
                      <span class="amount">159</span>
                    </div>
                  </h3>
                  <div class="button"><a href="/step1?enterprise/" class="btn btn-secondary btn-sm">Try It Free</a></div>
                </div>
                <div class="plan-info">
                  <ul class="list-group last">
                    <li class="list-group-item">Unlimited</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item">10</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item">Customized</li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                    <li class="list-group-item"><i class="fas fa-check text-success fa-lg"></i></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCourses;
