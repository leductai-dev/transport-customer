import React, { useState, useEffect } from "react";
import { postQuestion } from "../SingleCoursedt/singleCourseDB";
const CourseQ = (props) => {
  const [posts, setPosts] = useState(null);
  const [ques, setQues] = useState("");
  // const [recentlyUpdatedQues, setRecentlyUpdatedQues] = useState(null);

  useEffect(() => {
    // console.log("cccccccc", props.topic, props.currentSectionTopic);
    let currentSectionTopic = props.currentSectionTopic;

    if (props.topic !== null) {
      let items = JSON.parse(sessionStorage.getItem("updatedQues"));
      // if() {
      // session - get
      if (items === null || items === undefined) {
        // console.log("if items", items);
        if (props.topic.qa === undefined || props.topic.qa === null) {
          // console.log("if items if", items);
          setPosts("No Questions Yet!!!");
        } else {
          // console.log("if items else", items);
          setPosts(props.topic.qa);
        }
      } else {
        // console.log("else items", items);
        let fileteredValues = items.filter((item) => {
          return (
            currentSectionTopic.section.id === item.sectionId &&
            currentSectionTopic.topic.id === item.topicId
          );
        });
        let values = [...fileteredValues, ...props.topic.qa];
        setPosts(values);
      }
      // else (props.topic.qa === undefined || props.topic.qa === null) {
    }
  }, [props.topic, props.currentSectionTopic]);

  const postHandler = () => {
    // console.log("questionPosted", ques);
    // console.log("authCtx", props.authCtx);
    let user = props.authCtx.user;
    let currentSectionTopic = props.currentSectionTopic;
    if (ques === "") {
      alert("You didn't ask any question!!!");
    } else {
      postQuestion(ques, user, currentSectionTopic, (isUpdated) => {
        if (isUpdated === false) {
          alert("Some Issues. Try Posting Questions Later.");
        } else {
          // console.log("elseeeeee");
          // let pts = posts;
          // pts.push(isUpdated);

          setPosts((prevState) => {
            if (prevState === "No Questions Yet!!!") {
              return [isUpdated];
            } else {
              return [...prevState, isUpdated];
            }
          });
          setQues("");
          // persistance
          // console.log("isUpdated", isUpdated);
          let items = JSON.parse(sessionStorage.getItem("updatedQues"));
          if (items === null || items === undefined) {
            // no new questions
            let arr = [isUpdated];
            sessionStorage.setItem("updatedQues", JSON.stringify(arr));
          } else {
            // some ques posted in any section or topic may be
            let arr = [...items, isUpdated];
            sessionStorage.setItem("updatedQues", JSON.stringify(arr));
          }
        }
      });
    }
  };

  const onChangeHandler = (event) => {
    let value = event.target.value;
    setQues(value);
  };

  let ui = null;
  if (posts !== null) {
    if (posts === "No Questions Yet!!!") {
      ui = <h2>{posts}</h2>;
    } else {
      ui = posts.map((post, i) => {
        let user = post.user;
        let index = user.lastIndexOf("?");
        let username = user.substring(index + 1);
        return (
          <details key={i}>
            <summary>
              <p class="quest">
                {post.ques}
                {"    "}
                <span style={{ textTransform: "capitalize" }}>
                  {username} -{" "}
                </span>
                <span>{new Date(post.uploadedDT).toLocaleDateString()}</span>
              </p>
            </summary>
            <p class="admin-answer">
              {post.ans === ""
                ? "No Answer From Faculty, Please Wait For The Faculty To Answer."
                : post.ans}
            </p>
          </details>
        );
      });
    }
  }

  return (
    <>
      <div class="comment">
        <div class="raise">
          <label for="quest" class="head">
            Ask a Question&ensp;
            <i class="fas fa-question-circle"></i>
          </label>
          <textarea
            name="quest"
            id="quest"
            rows="4"
            onChange={onChangeHandler}
            value={ques}
            placeholder="Post your questions and wait for reply"
          ></textarea>
          <div class="button">
            <button type="button" class="confirm" onClick={postHandler}>
              Post
            </button>
            <button type="button" class="cancel" onClick={() => setQues("")}>
              Clear
            </button>
          </div>
        </div>
        <div class="post">
          <h2>Frequently Asked Questions</h2>
          {ui}
        </div>
      </div>
    </>
  );
};

export default CourseQ;
