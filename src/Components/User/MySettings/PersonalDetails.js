import React, { useState, useEffect } from "react";
// import AuthContext from "../../../Context/auth-context";
import $ from "jquery";

const PersonalDetails = (props) => {
  const [newData, setNewData] = useState({
    name: "",
    prfl_img: null,
    mno: 0
  });

  const getFile1 = () => {
    $("#uploadButton").on("click", function () {
      $("#img").click();
    });

    $("#img").change(function () {
      var file = this.files[0];
      // console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton").css(
          "background-image",
          'url("' + reader.result + '")'
        );
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
      }
    });
  };

  useEffect(() => {
    if (props.authCtx.user !== null) {
      setNewData({
        name: props.authCtx.user.name,
        mno: props.authCtx.user.phone
      });
    }
  }, [props.authCtx.user]);

  const onChangeHandler = (event) => {
    // console.log(event.target.name);
    let value = null;
    if (event.target.name === "prfl_img") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    setNewData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value
      };
    });
  };

  return (
    <div class="settings">
      <div class="list-header">
        <h4>Personal Details</h4>
      </div>
      <div class="personal-details">
        <form class="form">
          <div class="row m-0">
            <div class="col-sm-4 col-md-4 col-lg-3 p-0">
              <div class="upload-img">
                <input
                  type="file"
                  name="prfl_img"
                  id="img"
                  accept=".gif, .jpg, .png"
                  onChange={onChangeHandler}
                />
                <label
                  onClick={getFile1}
                  htmlFor="img"
                  id="uploadButton"
                  style={{
                    backgroundImage: `url('${props.genderImg}')`
                  }}
                >
                  <span>Browse</span>
                </label>
              </div>
            </div>

            <div class="col-sm-8 col-md-8 col-lg-9 p-0">
              <div class="wrap">
                <div class="col-lg-6">
                  <label for="fname">First Name *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    value={newData.name}
                    onChange={onChangeHandler}
                  />
                </div>
                {/* <div class="col-lg-6">
                  <label for="lname">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lname"
                    name="lname"
                    value={newData.lname}
                    onChange={onChangeHandler}
                  />
                </div> */}
              </div>
              <div class="wrap">
                <div class="col-lg-6">
                  <label for="mno">Mobile No *</label>
                  <input
                    type="text"
                    class="form-control"
                    name="mno"
                    id="mno"
                    value={newData.mno}
                    onChange={onChangeHandler}
                  />
                </div>
                {/* <div class="col-lg-6">
                  <label for="mail">Email *</label>
                  <input type="text" class="form-control" id="mail" />
                </div> */}
              </div>
            </div>
          </div>
          <div class="settings-btn">
            <button
              type="button"
              class="btn"
              onClick={() => props.updateUser(newData)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
