import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const MyBookmarks = (props) => {
  const [bookmarks, setbookmarks] = useState([]);
  useEffect(() => {
    setbookmarks(props.bookmarks);
  }, [props.bookmarks]);

  const getSortedBookmark = () => {
    if (document.getElementById("bookmarks").value === "recent") {
      let ong = [...bookmarks];
      ong.sort((a, b) => {
        let nameA = a.bookmarkedTimestamp;
        let nameB = b.bookmarkedTimestamp;
        // console.log(nameA, nameB);
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
      setbookmarks(ong);
    } else if (document.getElementById("bookmarks").value === "old") {
      let ong = [...bookmarks];
      ong.sort((a, b) => {
        let nameA = a.bookmarkedTimestamp;
        let nameB = b.bookmarkedTimestamp;
        // console.log(nameA, nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setbookmarks(ong);
    }
  };

  let bookmarkList = null;
  if (bookmarks.length === 0) {
    bookmarkList = <p>No Bookmarks!!!</p>;
  } else if (bookmarks.length > 0) {
    bookmarkList = bookmarks.map((bm, i) => {
      return <CourseCard course={bm} key={i} {...props} />;
    });
  } else {
    console.log("bookmarks else", props.bookmarks);
  }
  return (
    <div class="marked">
      <div class="list-header">
        <h4>Browse Your Favourites</h4>
        <div class="dropdown">
          <select
            name="bookmarks"
            id="bookmarks"
            class="dropdown-toggle"
            onChange={getSortedBookmark}
          >
            <option class="list-item" value="all">
              --- Select ---
            </option>
            <option class="list-item" value="recent">
              Recent
            </option>
            <option class="list-item" value="old">
              Latest
            </option>
          </select>
        </div>
      </div>

      <div class="row p20">{bookmarkList}</div>

      <div class="end">No More Courses</div>
    </div>
  );
};

export default MyBookmarks;
