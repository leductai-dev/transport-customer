import React, { useRef } from "react";
import { Link } from "react-router-dom";
// import "../../styles.css";
import emailjs from "emailjs-com";

const MyOrders = () => {
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
              <h1>VẬN CHUYỂN HÀNG</h1>
              <p>
                <Link to="/home">Trang chủ</Link>&ensp;/&ensp;Đơn hàng của tôi
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
                <h4>Our Location</h4>
                <p>Collin Street West, Victor 8007, Australia.</p>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="contact_location">
                <div class="icon">
                  <img src="/images/cicon2.png" alt="Call Icon" />
                </div>
                <h4>Make a Call</h4>
                <p>
                  Mobile:(+91)77889 90000
                  <br />
                  Mobile:(+91)55 114 252525
                  <br />
                </p>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="contact_location">
                <div class="icon">
                  <img src="/images/cicon3.png" alt="Mail Icon" />
                </div>
                <h4>Write Some Words</h4>
                <p>smartedu@gmail.com</p>
              </div>
            </div>
          </div>
          <div class="row p-20 m-0">
            <div class="map-grid col-md-6 col-lg-6 col-xl-6">
              
            </div>
            <div class="form-grid col-md-6 col-lg-6 col-xl-6">
              <h4>Send a Message</h4>
              <p>Ex quem dicta delicata usu, zril vocibus maiestatis in qui.</p>
              <form
                class="form-group"
                action="#"
                method="get"
                ref={form}
                onSubmit={sendEmail}
              >
                <label for="name">Full Name</label>
                <input type="text" class="ipbox" id="name" name="name" />
                <label for="mail">Your Email</label>
                <input type="text" class="ipbox" id="mail" name="email" />
                <label for="sub">Subject</label>
                <input type="text" class="ipbox" id="sub" name="subject" />
                <label for="yourm">Your Message</label>
                <textarea rows="5" id="yourm" name="message"></textarea>
                <div class="button">
                  <input
                    type="submit"
                    class="submit_btn"
                    name=""
                    value="Submit"
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
export default MyOrders;
