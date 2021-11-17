import React, { useRef } from "react";
import { Link } from "react-router-dom";
// import "../../styles.css";
import emailjs from "emailjs-com";

const Contactus = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ij4o9ni",
        "template_k0hxf6t",
        form.current,
        "user_YZ30QFKSYAE3lMtorbs18"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <>
      {/* section down where it should come */}
      <section
        className="navbar_sect"
        style={{ backgroundImage: "url(/images/bg5.jpg)" }}
      >
        <div className="contact_sect">
          <div className="container-fluid">
            <div className="inner_container">
              <h1>Liên lạc với chúng tôi</h1>
              <p>
                <Link to="/home">Trang chủ</Link>&ensp;/&ensp;Liên lạc với chúng tôi
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="contact-sect">
        <div class="container-fluid">
          <div class="row m-0">
            <div class="col-sm-6 col-lg-4">
              <div class="contact_location">
                <div class="icon">
                  <img src="/images/cicon4.png" alt="Location Icon" />
                </div>
                <h4>Địa chỉ</h4>
                <p>254 Nguyen Van Linh </p>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="contact_location">
                <div class="icon">
                  <img src="/images/cicon2.png" alt="Call Icon" />
                </div>
                <h4>Số điện thoại</h4>
                <p>
                  Mobile:0847247099
                  <br />
                </p>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="contact_location">
                <div class="icon">
                  <img src="/images/cicon3.png" alt="Mail Icon" />
                </div>
                <h4>Email</h4>
                <p>letrunghieu5612@gmail.com</p>
              </div>
            </div>
          </div>
          <div class="row p-20 m-0">
            <div class="map-grid col-md-6 col-lg-6 col-xl-6">
              <div class="mapouter">
                <div class="gmap_canvas">
                  <iframe
                    title="googlemap"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=Chennai%20Airport&t=&z=9&ie=UTF8&iwloc=&output=embed"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                  ></iframe>
                  <a href="https://www.online-timer.net"></a>
                  <br />
                  <a href="https://www.embedgooglemap.net">
                    embedgooglemap.net
                  </a>
                </div>
              </div>
            </div>
            <div class="form-grid col-md-6 col-lg-6 col-xl-6">
              <h4>Gửi tin nhắn</h4>
              <form
                class="form-group"
                action="#"
                method="get"
                ref={form}
                onSubmit={sendEmail}
              >
                <label for="name">Tên đầy đủ</label>
                <input type="text" class="ipbox" id="name" name="name" />
                <label for="mail">Email của bạn</label>
                <input type="text" class="ipbox" id="mail" name="email" />
                <label for="sub">Chủ đề</label>
                <input type="text" class="ipbox" id="sub" name="subject" />
                <label for="yourm">Nội dung</label>
                <textarea rows="5" id="yourm" name="message"></textarea>
                <div class="button">
                  <input
                    type="submit"
                    class="submit_btn"
                    name=""
                    value="Gửi"
                  // onClick="login(document.getElementById('usem').value,document.getElementById('pass').value)"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Contactus;
