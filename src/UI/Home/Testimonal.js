import React from "react";
import $ from "jquery";

const Testimonal = () => {
  // vars
  $(document).ready(function () {
    var testim = document.getElementById("testim"),
      testimDots = Array.prototype.slice.call(
        document.getElementById("testim-dots").children
      ),
      testimContent = Array.prototype.slice.call(
        document.getElementById("testim-content").children
      ),
      testimLeftArrow = document.getElementById("left-arrow"),
      testimRightArrow = document.getElementById("right-arrow"),
      testimSpeed = 4500,
      currentSlide = 0,
      currentActive = 0,
      testimTimer,
      touchStartPos,
      touchEndPos,
      touchPosDiff,
      ignoreTouch = 30;

    $(document).ready(function () {
      // Testim Script
      function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
          testimContent[k].classList.remove("active");
          testimContent[k].classList.remove("inactive");
          testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
          slide = currentSlide = testimContent.length - 1;
        }

        if (slide > testimContent.length - 1) {
          slide = currentSlide = 0;
        }

        if (currentActive !== currentSlide) {
          testimContent[currentActive].classList.add("inactive");
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;

        clearTimeout(testimTimer);
        testimTimer = setTimeout(function () {
          playSlide((currentSlide += 1));
        }, testimSpeed);
      }

      testimLeftArrow.addEventListener("click", function () {
        playSlide((currentSlide -= 1));
      });

      testimRightArrow.addEventListener("click", function () {
        playSlide((currentSlide += 1));
      });

      for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function () {
          playSlide((currentSlide = testimDots.indexOf(this)));
        });
      }

      playSlide(currentSlide);

      // keyboard shortcuts
      document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
          case 37:
            testimLeftArrow.click();
            break;

          case 39:
            testimRightArrow.click();
            break;

          default:
            break;
        }
      });

      testim.addEventListener("touchstart", function (e) {
        touchStartPos = e.changedTouches[0].clientX;
      });

      testim.addEventListener("touchend", function (e) {
        touchEndPos = e.changedTouches[0].clientX;

        touchPosDiff = touchStartPos - touchEndPos;

        console.log(touchPosDiff);
        console.log(touchStartPos);
        console.log(touchEndPos);

        if (touchPosDiff > 0 + ignoreTouch) {
          testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
          testimRightArrow.click();
        } else {
          return;
        }
      });
    });
  });

  return (
    <>
      <section className="testim" id="testim">
        <div className="container">
          <div className="header">
            <h1>Khách hàng</h1>
          </div>
          <div className="background"></div>
          <div className="testim-cover">
            <div className="wrap">
              <span
                id="right-arrow"
                className="arrow right fa fa-chevron-right"
              ></span>
              <span
                id="left-arrow"
                className="arrow left fa fa-chevron-left "
              ></span>
              <ul id="testim-dots" className="dots">
                <li className="dot active"></li>
                <li className="dot"></li>
                <li className="dot"></li>
                <li className="dot"></li>
                <li className="dot"></li>
              </ul>
              <div id="testim-content" className="cont text-center">
                <div className="active">
                  <div className="img">
                    <img src="/images/team5.jpg" alt="" />
                  </div>
                  <h2>Ngô Phan Phúc</h2>
                  <p>
                    Tôi hài lòng về chất lượng dịch vụ vận chuyển của TSMS.
                  </p>
                </div>

                <div>
                  <div className="img">
                    <img src="/images/team6.jpg" alt="" />
                  </div>
                  <h2>Nguyễn Hoài Trung</h2>
                  <p>
                    Hệ thống quản trị đơn giản, thân thiện với người dùng. Khả năng tuỳ biến cao giúp hệ thống đáp ứng được với nhiều ngành nghề.
                  </p>
                </div>

                <div>
                  <div className="img">
                    <img src="/images/team7.jpg" alt="" />
                  </div>
                  <h2>Lê Huỳnh Đức</h2>
                  <p>
                    Chúng tôi đã hợp tác với dịch vụ vận chuyển TSMS được hơn 2 năm và rất hài lòng.
                  </p>
                </div>

                <div>
                  <div className="img">
                    <img src="/images/team8.jpg" alt="" />
                  </div>
                  <h2>Phan Ngọc Anh</h2>
                  <p>
                    Làm việc chuyên nghiệp , chăm sóc khách hàng tốt.
                  </p>
                </div>

                <div>
                  <div className="img">
                    <img src="/images/team5.jpg" alt="" />
                  </div>
                  <h2>Trương Mỹ Nhung</h2>
                  <p>
                    Thái độ làm việc chuyên nghiệp, tốc độ chuyển hàng nhanh nhất mà tôi từng biết.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Testimonal;
