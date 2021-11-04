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
      <section class="contact-sect" style={{ padding: "60px 0" }}>
        <div class="container">
          <table class="his-orders table table-striped" >
            <thead>
              <tr>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Mô tả đơn hàng</th>
                <th scope="col">Ngày</th>
                <th scope="col">Chi trả</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1x09</th>
                <td>Vận chuyển bàn ghế gỗ</td>
                <td>01/01/2021</td>
                <td>1000000</td>
                <td><span class="badge badge-success">Thành công</span></td>
                <td><button class="btn btn-primary">Edit</button></td>

              </tr>
              <tr>
                <th scope="row">2x09</th>
                <td>Vận chuyển 2 xe máy</td>
                <td>01/07/2021</td>
                <td>1700000</td>
                <td><span class="badge badge-danger">Thất bại</span></td>
                <td><button class="btn btn-primary">Edit</button></td>

              </tr>
              <tr>
                <th scope="row">3x09</th>
                <td>Vận chuyển xe ô tô</td>
                <td>14/10/2021</td>
                <td>5000000</td>
                <td><span class="badge badge-success">Thành công</span></td>
                <td><button class="btn btn-primary">Edit</button></td>

              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <script>
        $('.his-orders').dataTable();
      </script>

    </>
  );
};
export default MyOrders;
