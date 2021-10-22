import React, { useEffect, useState } from "react";
import RatingStar from "../../../UI/Ratings/RatingStar";
const CourseReview = (props) => {
  const [rating, setRating] = useState(null);
  const [totalRating, setTotalRating] = useState(null);

  useEffect(() => {
    // console.log("reviews", props.reviews);
    let reviews = props.reviews;
    if (reviews !== null) {
      let one = 0,
        two = 0,
        three = 0,
        four = 0,
        five = 0;
      reviews.forEach((rev) => {
        if (rev.rating === 1) {
          one++;
        } else if (rev.rating === 2) {
          two++;
        } else if (rev.rating === 3) {
          three++;
        } else if (rev.rating === 4) {
          four++;
        } else if (rev.rating === 5) {
          five++;
        }
      });
      // console.log("rating", one, two, three, four, five);
      let total = five + four + three + two + one;
      if (total <= 0) {
        setRating(0);
      } else {
        setRating({
          one: (one / total) * 100,
          two: (two / total) * 100,
          three: (three / total) * 100,
          four: (four / total) * 100,
          five: (five / total) * 100
        });
      }

      setTotalRating(() => {
        let res = (5 * five + 4 * four + 3 * three + 2 * two + 1 * one) / total;
        if (isNaN(res)) {
          return 0;
        } else {
          return res.toFixed(1);
        }
      });
    }
  }, [props.reviews]);

  let ui = null;
  if (rating === null) {
    ui = <p>Loading!!!</p>;
  } else if (rating === 0) {
    ui = <p>No Reviews!!!</p>;
  } else {
    ui = (
      <>
        <div className="col-sm-8 col-md-8 col-lg-9">
          <ul className="progressbar">
            <li>Stars 5</li>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: rating.five }}
              ></div>
            </div>
          </ul>
          <ul className="progressbar">
            <li>Stars 4</li>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: rating.four }}
              ></div>
            </div>
          </ul>
          <ul className="progressbar">
            <li>Stars 3</li>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: rating.three }}
              ></div>
            </div>
          </ul>
          <ul className="progressbar">
            <li>Stars 2</li>
            <div className="progress">
              <div className="progress-bar" style={{ width: rating.two }}></div>
            </div>
          </ul>
          <ul className="progressbar">
            <li>Stars 1</li>
            <div className="progress">
              <div className="progress-bar" style={{ width: rating.one }}></div>
            </div>
          </ul>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-3">
          <p className="rating_value">{totalRating !== null && totalRating}</p>
          <p className="rating">
            <RatingStar rating={totalRating} />
            {/* <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span> */}
          </p>
          <p className="ft">Course Rating</p>
          <p className="ft">({props.reviews.length})</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h3>Students Feedback</h3>
      <div className="row">
        {/* <!--------------------Progress Bar---------------------------------> */}
        {ui}
      </div>
    </>
  );
};
export default CourseReview;
