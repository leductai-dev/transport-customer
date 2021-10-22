import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const ChangePassword = (props) => {
  let oldPass = "";
  if (props.authCtx.user !== null) {
    oldPass = props.authCtx.user.password;
  }
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [correct, setCorrect] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const onChangeHandler = (event) => {
    let value = "";
    if (event.target.name === "oldPassword") {
      value = event.target.value;
      if (value === oldPass) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    } else {
      value = event.target.value;
    }
    setPassword((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value
      };
    });
  };

  const submitHandler = (e) => {
    if (password.newPassword === password.confirmPassword) {
      props.updatePassword(password.newPassword);
      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setCorrect(null);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="settings">
      <div className="list-header">
        <h4>Change Password</h4>
      </div>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Confirm password doesn't match with new password!!!
        </Alert>
      )}
      <div className="change-password">
        <form className="form">
          <div className="row">
            <div className="col-lg-6">
              <label for="oldpass">Old Password</label>
              {correct !== null ? (
                correct === true ? (
                  <>
                    <i className="icon far fa-check-circle"></i>
                    <span className="old-alert">Old Password Is Correct</span>
                  </>
                ) : (
                  <>
                    <i class="far fa-times-circle"></i>
                    <span className="old-alert">
                      Old Password Is Wrong, try Again
                    </span>
                  </>
                )
              ) : (
                ""
              )}
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                onChange={onChangeHandler}
                value={password.oldPassword}
              />
              <label for="newpass">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                onChange={onChangeHandler}
                value={password.newPassword}
              />

              <label for="confirmpass">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                onChange={onChangeHandler}
                value={password.confirmPassword}
              />
            </div>
          </div>
          <div className="settings-btn">
            <button type="button" onClick={submitHandler} className="btn">
              Save<i className="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
