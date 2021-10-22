import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../../Context/auth-context";
import PaymentModal from "./PaymentModal";
import { buyCourse, addBookmark, removeBookmark } from "../CoursesDB";
import $ from "jquery";

const CoursePriceBox = (props) => {
  const authCtx = useContext(AuthContext);
  let user = authCtx.user;
  const [isBookmarked, setIsBookmarked] = useState(false);
  // const [dueDay, setDueDay] = useState();
  const [price, setPrice] = useState({
    originalPrice: 0,
    discountedPrice: 0,
    period: 0
  });
  const [offers, setOffers] = useState([]);
  const [isPaymentOverlay, setIsPaymentOverlay] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // console.log("coursePriceBox", props.course);
    if (authCtx.user !== null) {
      let bookmarks = authCtx.user.bookmarks;
      let index = bookmarks.findIndex((course) => {
        return course.id === props.course.id;
      });
      if (index === -1) {
        setIsBookmarked(false);
      } else {
        setIsBookmarked(true);
      }
    }
    let offers = props.course.publish.offers;
    offers.sort((a, b) => {
      if (a.period < b.period) {
        return -1;
      }
      if (a.period > b.period) {
        return 1;
      }
      return 0;
    });
    setOffers(offers);
    let disPrice =
      (props.course.publish.originalPrice * offers[0].discount) / 100;
    let discountedPrice = props.course.publish.originalPrice - disPrice;
    setPrice({
      originalPrice: props.course.publish.originalPrice,
      discountedPrice: discountedPrice,
      period: offers[0].period
    });
  }, [authCtx.user, props.course]);

  const bookmarkCourse = (course) => {
    if (authCtx.isLoggedIn) {
      // logged in, add to db & ctx and show that in UI
      // update to ctx
      let user = authCtx.user;
      let bookmark = user.bookmarks;
      let index = bookmark.findIndex((bm) => bm.id === course.id);
      if (index === -1) {
        bookmark.push(course);
        setIsBookmarked(true);
        addBookmark(user, course);
      } else {
        bookmark.splice(index, 1);
        setIsBookmarked(false);
        removeBookmark(user, course);
      }
      authCtx.setUser({
        ...user,
        bookmarks: bookmark
      });
    } else {
      // not logged in, push to login page
      // and send this course too, so if he login
      // this should be added to db

      // let json = JSON.stringify(course);
      // console.log("json-not logged in", json);
      // props.history.push(`/login?bookmark=${json}`);
      // from login, it should moved to the

      history.push(`/login`);
      // for now, he can login and then he can bookmark
    }
  };

  const purchaseCourse = () => {
    if (authCtx.isLoggedIn) {
      let ongoingCourses = authCtx.user.ongoingCourses;
      let orders = authCtx.user.orders;
      buyCourse(
        authCtx.user,
        props.course,
        props.subcategoryId,
        price,
        (courseBought) => {
          authCtx.setUser({
            ...user,
            ongoingCourses: [...ongoingCourses, courseBought.ongoingCourse],
            orders: [...orders, courseBought.order]
          });
        }
      );
    } else {
      history.push(`/login`);
    }
  };

  // $(".days div:first-child").addClass("active");

  $(document).ready(function () {
    $(".days div").click(function () {
      $(".pill").removeClass("active");
      $(this).addClass("active");
    });
  });

  const updatePrice = (discount) => {
    let disPrice = (price.originalPrice * discount) / 100;
    let discountedPrice = price.originalPrice - disPrice;
    setPrice({
      originalPrice: price.originalPrice,
      discountedPrice: discountedPrice
    });
  };

  return (
    <>
      {isPaymentOverlay && (
        <PaymentModal
          price={price}
          course={props.course}
          purchaseCourse={purchaseCourse}
          onClose={() => setIsPaymentOverlay(false)}
        />
      )}
      <div className="price_box">
        <div className="price">
          <span>Price</span> <i className="fas fa-rupee-sign"></i>
          {price.discountedPrice}
          <small style={{ textDecoration: "line-through" }}>
            <i className="fas fa-rupee-sign"></i>
            {price.originalPrice}
          </small>
        </div>
        <div className="days">
          {offers.map((offer, i) => (
            <div
              key={i}
              className="pill"
              onClick={() => updatePrice(offer.discount)}
            >
              {offer.period === -1 ? "LifeTime" : offer.period + " Days"}
            </div>
          ))}
        </div>
        {isBookmarked ? (
          <button
            className="cart_btn"
            onClick={() => bookmarkCourse(props.course)}
          >
            Remove From Bookmarks
          </button>
        ) : (
          <button
            className="cart_btn"
            onClick={() => bookmarkCourse(props.course)}
          >
            Add To Bookmarks
          </button>
        )}

        <button
          className="purchase_btn"
          onClick={() => setIsPaymentOverlay(true)}
        >
          Buy Now
        </button>
        <h5 className="subtitle">Includes</h5>
        <ul className="quere_list">
          <li>
            <a href="#">
              <span>
                <i className="fas fa-play"></i>
              </span>
              &ensp;{props.totalHours.toFixed(0)} hours on-demand video
            </a>
          </li>
          {/* <li>
            <a href="#">
              <span>
                <i className="fas fa-file-download"></i>
              </span>
              &ensp;69 downloadable resources
            </a>
          </li> */}
          {/* <li>
            <a href="#">
              <span>
                <i className="fas fa-key"></i>
              </span>
              &ensp;Full lifetime access
            </a>
          </li> */}
          <li>
            <a href="#">
              <span>
                <i className="fas fa-laptop"></i>
              </span>
              &ensp;Access on Mobile & Laptop
            </a>
          </li>
          {props.course.assessments === "Yes" && (
            <li>
              <a href="#">
                <span>
                  <i className="far fa-clipboard"></i>
                </span>
                &ensp;Assesments
              </a>
            </li>
          )}
          <li>
            <a href="#">
              <span>
                <i className="fas fa-certificate"></i>
              </span>
              &ensp;Certificate of Completion
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default CoursePriceBox;
