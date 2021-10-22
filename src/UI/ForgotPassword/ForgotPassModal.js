import React, { useState } from "react";
import "./ForgotPassModal.css";

const ForgotPassModal = (props) => {
  const [email, setEmail] = useState("");

  const changeHandler = (event) => {
    let val = event.target.value;
    setEmail(val);
  };

  const submitHanlder = (e) => {
    e.preventDefault();
    props.sendResetMail(email);
    setEmail("");
  };

  return (
    <div className="card login-form">
      <div className="card-body">
        <h3 className="card-title text-center">Reset password</h3>

        <div className="card-text">
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">
                Enter your email address and we will send you a link to reset
                your password.
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter your email address"
                value={email}
                onChange={changeHandler}
              />
            </div>

            <button
              onClick={submitHanlder}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Send password reset email
            </button>
            <button
              onClick={props.closeModal}
              type="button"
              className="btn btn-primary btn-block"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassModal;
