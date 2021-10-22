import React from "react";
import $ from "jquery";

const Scroller = () => {
  // // When the user scrolls down 20px from the top of the document, show the button
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("#myBtn").fadeIn();
    } else {
      $("#myBtn").fadeOut();
    }
  });
  // $(".scroller_icon").click(function () {
  //   $("html, body").animate({ scrollTop: 0 }, 800);
  //   return false;
  // });

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <>
      <section className="scroller_icon">
        <button onClick={topFunction} id="myBtn" title="Go to top">
          <i className="fas fa-long-arrow-alt-up"></i>
        </button>
      </section>
    </>
  );
};
export default Scroller;
