import React, { useEffect, useState } from "react";
// import $ from "jquery";
import QuizOverlay from "../../../UI/QuizOverlay/QuizOverlay";
import { setQuizAnswers } from "./singleCourseDB";

const CourseAssesment = (props) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [percentage, setPercentage] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(null);

  useEffect(() => {
    if (props.currentSectionTopic !== null) {
      // console.log("Quiz", props.currentSectionTopic);
      setQuiz(props.currentSectionTopic.section.quiz);
      // console.log("showQuiz", props.showQuiz);
      setShowQuiz(props.showQuiz);
      setPercentage(null);
    }
  }, [props.currentSectionTopic, props.showQuiz, props.ongoingCourse]);

  const onChangeHandler = (e) => {
    console.log(e.target.name, e.target.value, e.target.type);
    // let ans = [...answers];
    let value = e.target.value;
    setAnswers((prevState) => {
      return {
        ...prevState,
        [e.target.name]: value
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(answers);
    let count = 0;
    let totalQues = quiz.length;
    quiz.forEach((q) => {
      let actual = q.answer;
      let expected = answers[q.question];
      // console.log("answers", actual, expected);
      if (actual === expected) {
        count++;
      }
    });
    let percent = (count / totalQues) * 100;
    let percentage = {
      percent: percent,
      count: count,
      totalQues: totalQues
    };
    // console.log("section", props.currentSectionTopic.section, answers);
    // store in db with section id
    setQuizAnswers(
      props.authCtx,
      props.ongoingCourse,
      props.currentSectionTopic.section.id,
      answers
    );
    setIsCompleted(true);
    setPercentage(percentage);
  };

  const getPreviousAnswers = () => {
    let sectionId = props.currentSectionTopic.section.id;
    // console.log("ongoingCourse", props.ongoingCourse);
    let ongoingCourses = props.authCtx.user.ongoingCourses;
    let cur = ongoingCourses.findIndex((c) => c.id === props.ongoingCourse.id);
    console.log("cur", ongoingCourses[cur].quizAnswers);
    let quizAnswers = ongoingCourses[cur].quizAnswers;
    let currQuiz = quizAnswers.find((q) => q.sectionId === sectionId);
    // we can set answers state or make a new variable
    // check which is ok
    if (currQuiz === undefined) {
      alert("Attend the quiz atleast once to view previous answers!!!");
    } else {
      setAnswers(currQuiz.answers);
      let count = 0;
      let totalQues = quiz.length;
      quiz.forEach((q) => {
        let actual = q.answer;
        let expected = answers[q.question];
        // console.log("answers", actual, expected);
        if (actual === expected) {
          count++;
        }
      });
      let percent = (count / totalQues) * 100;
      let percentage = {
        percent: percent,
        count: count,
        totalQues: totalQues
      };
      setIsCompleted(true);
      setPercentage(percentage);
    }
  };

  const clickHandler = () => {
    // console.log("nextSectionTOpic", props.showQuiz);
    let currentSecTop = props.showQuiz;
    // set topic, latestSectionTOpic, currectSectionTOpic and currentTime
    let currentSectionIndex = props.sectionTopics.findIndex(
      (secTop) => secTop.section.id === props.currentSectionTopic.section.id
    );
    // console.log("sectionTopics", props.sectionTopics);
    // last section
    if (currentSectionIndex === props.sectionTopics.length - 1) {
      props.courseCompleted();
    } else {
      let section = props.sectionTopics[currentSectionIndex + 1];
      let currentTopicIndex = section.topics.findIndex(
        (top) => top.id === props.currentSectionTopic.topic.id
      );

      currentSecTop = {
        section: section.section,
        topic: section.topics[0]
      };
      let latestSectionIndex = props.sectionTopics.findIndex(
        (secTop) => secTop.section.id === props.latestSectionTopic.section.id
      );
      if (latestSectionIndex === currentSectionIndex) {
        let latestTopicIndex = section.topics.findIndex(
          (top) => top.id === props.latestSectionTopic.topic.id
        );
        if (currentTopicIndex + 1 > latestTopicIndex) {
          props.setLatestSectionTopic(currentSecTop);
        }
      }
      props.setLatestSectionTopic(currentSecTop);
      props.setCurrentSectionTopic(currentSecTop);
      props.setTopic(section.topics[0]);
      props.setCurrentTime(0);
    }

    // to close the modal
    setIsCompleted(false);
  };

  let quizUI = null;
  if (showQuiz === null) {
    quizUI = <p>Complete this section to attend quiz</p>;
  } else if (showQuiz !== null) {
    if (quiz.length === 0) {
      quizUI = <p>No Quiz Here!!!</p>;
    } else {
      quizUI = (
        <form onSubmit={submitHandler} key={showQuiz.section.id}>
          {/* {console.log("showQuiz inside UI", showQuiz)} */}
          {quiz.map((q, i) => {
            return (
              <div class="set" key={q.question}>
                <p class="question">
                  {i + 1 + "."}
                  {q.question}
                </p>
                {q.type === "choose" ? (
                  <div class="check-type">
                    {q.options.map((op, i) => {
                      return (
                        <span key={op}>
                          <input
                            type="radio"
                            id={op}
                            name={q.question}
                            onChange={onChangeHandler}
                            value={op}
                          />
                          &ensp;
                          <label htmlFor={op}>{op}</label>&emsp;&ensp;
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div class="radio-type">
                    <input
                      type="radio"
                      id="true"
                      name={q.question}
                      onChange={onChangeHandler}
                      value={true}
                    />
                    &ensp;
                    <label htmlFor="true">True</label>&emsp;&ensp;
                    <input
                      type="radio"
                      id="false"
                      name={q.question}
                      onChange={onChangeHandler}
                      value={false}
                    />
                    &ensp;
                    <label htmlFor="false">False</label>
                  </div>
                )}
              </div>
            );
          })}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={getPreviousAnswers}
          >
            Previous Answers
          </button>
        </form>
      );
    }
  }

  return (
    <>
      {isCompleted && (
        <QuizOverlay
          onContinue={clickHandler}
          closeModal={() => {
            // console.log("closeModal");
            setIsCompleted(false);
          }}
          percentage={percentage}
          quiz={quiz}
          answers={answers}
        />
      )}
      {quizUI}
    </>
  );
};

export default CourseAssesment;
