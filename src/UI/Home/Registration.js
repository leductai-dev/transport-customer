import React from "react";
import { Link } from "react-router-dom";
const Registration = (props) => {
  let ui = null;
  if (props.authCtx !== null) {
    if (props.authCtx.isLoggedIn) {
      ui = (
        <Link className="reg_btn" to="/userDashboard/myprofile">
          Get Started Now With Your Dashboard
        </Link>
      );
    } else {
      ui = (
        <Link className="reg_btn" to="/login">
          Bắt đầu ngay
        </Link>
      );
    }
  }

  return (
    <>
      <section className="reg_sect">
        <div className="container-fluid">
          <div className="inner_container">
            <p>Tạo đơn hàng ngay bây giờ</p>
            <h3>
              Tính toán mức giá và sự lựa chọn cho đơn hàng của bạn
            </h3>
            {/* <form action="#blankpage" method="get"> */}
            {ui}
            {/* </form> */}
          </div>
        </div>
      </section>
    </>
  );
};
export default Registration;
