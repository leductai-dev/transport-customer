import React from "react";
// import { Route } from "react-router";
// import { Link } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom";
// import AuthContext from "../Context/auth-context";

export function ProductItem({ hit, components }) {
  // const authCtx = useContext(AuthContext);
  // const history = authCtx.history;
  // useEffect(() => {
  //   console.log("hit", hit, components);
  // }, [hit]);

  // const onClickHandler = (course) => {
  //   history.push(
  //     `/dashboard/courses/${course.id}?category=${course.category}&subcategory=${course.subcategory}&subcategoryId=${course.subcategoryId}`
  //   );
  // };

  let ui = null;
  // if (hit !== undefined && hit.status === "Verified") {
  if (hit !== undefined) {
    ui = (
      <>
        {/* <Link></Link> */}
        <a
          href={`/dashboard/courses/${hit.id}?category=${hit.category}&subcategory=${hit.subcategory}&subcategoryId=${hit.subcategoryId}`}
          // onClick={() => {
          //   history.push(
          //     `/dashboard/courses/${hit.id}?category=${hit.category}&subcategory=${hit.subcategory}&subcategoryId=${hit.subcategoryId}`
          //   );
          // }}
          // onClick={() => onClickHandler(hit)}
          target="_blank"
          rel="noreferrer"
          className="aa-ItemLink"
        >
          <div className="aa-ItemContent">
            <div className="aa-ItemTitle">
              {/* <components.Highlight hit={hit} attribute={hit.courseName} /> */}
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  display: "inline-block"
                }}
                src={`https://secure--storage.s3.ap-south-1.amazonaws.com/${hit.thumbnail}`}
                alt={hit.courseName}
              />
              <h5 style={{ display: "inline-block" }}>{hit.courseName}</h5>
            </div>
          </div>
        </a>
      </>
    );
  }
  return ui;
}
