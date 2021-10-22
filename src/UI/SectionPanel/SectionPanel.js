import React, { useEffect, useState } from "react";
import TopicCheckBox from "./TopicCheckBox";

const SectionPanel = (props) => {
  // const [checked, setChecked] = useState(false);
  const [latestIndex, setLatestIndex] = useState({
    sectionIndex: -1,
    topicIndex: -1
  });

  useEffect(() => {
    let currentSecTop = props.currentSectionTopic;
    if (currentSecTop !== null && props.latestSectionTopic !== null) {
      console.log("section panel useEffect");
      // if we want to close all other sections
      // https://stackoverflow.com/questions/16751345/automatically-close-all-the-other-details-tags-after-opening-a-specific-detai/56194608
      document.getElementById(currentSecTop.section.id).open = true;

      // find section index with current section,
      // document.getElementById().addEventListener('click')
      //
      let latestSectionIndex = props.sections.findIndex(
        (secTop) => secTop.section.id === props.latestSectionTopic.section.id
      );
      let latestTopicIndex = props.sections[
        latestSectionIndex
      ].topics.findIndex((top) => top.id === props.latestSectionTopic.topic.id);
      setLatestIndex({
        sectionIndex: latestSectionIndex,
        topicIndex: latestTopicIndex
      });
    }
  }, [props.currentSectionTopic, props.latestSectionTopic, props.sections]);

  const onClickHandler = (section, topic) => {
    // console.log("secTOp", section, topic);
    console.log("sectionpanel latestSectionTOpic", props.latestSectionTopic);
    // let latestSectionIndex = props.sections.findIndex(
    //   (secTop) => secTop.section.id === props.latestSectionTopic.section.id
    // );
    let currentSecTop = {
      section: section,
      topic: topic
    };

    if (props.ongoingCourse.isCourseCompleted) {
      // console.log("course completed, can see all quiz and can see any videos");
      props.setShowQuiz(currentSecTop);
      props.setCurrentTime(0);
      props.setTopic(topic);
      props.setCurrentSectionTopic(currentSecTop);
    } else {
      let clickSectionIndex = props.sections.findIndex(
        (secTop) => secTop.section.id === section.id
      );

      if (clickSectionIndex < latestIndex.sectionIndex) {
        props.setShowQuiz(currentSecTop);
        props.setCurrentTime(0);
        props.setTopic(topic);
        props.setCurrentSectionTopic(currentSecTop);
        // will not set currentSecTopic, it will always be the current one which is not completed
      } else if (clickSectionIndex > latestIndex.sectionIndex) {
        // add condition here, if course complted, all videos will be played
        props.setShowQuiz(null);
        return;
      } else if (clickSectionIndex === latestIndex.sectionIndex) {
        let clickTopicIndex = props.sections[
          latestIndex.sectionIndex
        ].topics.findIndex((top) => top.id === topic.id);
        if (
          clickTopicIndex < latestIndex.topicIndex ||
          clickTopicIndex === latestIndex.topicIndex
        ) {
          // let currentSecTop = {
          //   section: section,
          //   topic: topic
          // };
          props.setShowQuiz(null);
          props.setCurrentTime(0);
          props.setTopic(topic);
          props.setCurrentSectionTopic(currentSecTop);
        } else if (clickTopicIndex > latestIndex.topicIndex) {
          // add condition here, if course complted, all videos will be played
          props.setShowQuiz(null);
          return;
        }
        // console.log("same section", currentTopicIndex);
      }
    }

    // setVideoLength(topic.videoLength);
    // console.log("sectionTopicselected", section);
    // document.getElementById().addEventListener('click')
  };

  const getVideoLength = (seconds) => {
    if (seconds < 60) {
      if (seconds < 10) {
        return "00:0" + seconds;
      } else {
        return "00:" + seconds;
      }
    } else {
      // mins
      let min = seconds / 60;
      if (seconds % 60 === 0) {
        // it will be, 1min, 2min, 10min etc
        if (min < 10) {
          return "0" + min + ":00";
        } else {
          return min + ":00";
        }
      } else {
        // it will be 01:10min, 10:50min
        let mstr = min.toString();
        let indexOfDot = mstr.indexOf(".");
        let minute = mstr.substring(0, indexOfDot);
        let seconds = mstr.substring(indexOfDot + 1, indexOfDot + 3);
        if (min < 10) {
          return "0" + minute + ":" + seconds;
        } else {
          return minute + ":" + seconds;
        }
      }
    }
  };

  return (
    <div className="section">
      <h3>Course Contents</h3>
      {/* <!------------Panel----------------------------> */}
      {props.sections.map((secTop) => {
        return (
          <div className="panel" key={secTop.section.id}>
            <details id={secTop.section.id}>
              <summary className="fas panel-title collapsible">
                {secTop.section.sectionName}
              </summary>
              {/* <!------------Panel Body-------------------> */}
              <div className="panel-body">
                {secTop.topics.map((topic) => {
                  return (
                    <div
                      key={topic.id}
                      id={topic.id}
                      className="vedio-details"
                      onClick={() => {
                        // props.setTopic(topic);
                        onClickHandler(secTop.section, topic);
                        // setVideoLength(topic.videoLength);
                        // console.log("sectionTopicselected", section);
                      }}
                    >
                      <TopicCheckBox
                        topic={topic}
                        section={secTop.section}
                        length={topic.videoLength}
                        currentTime={props.currentSec}
                        latestIndex={latestIndex}
                        currentSectionTopic={props.currentSectionTopic}
                        sections={props.sections}
                        ongoingCourse={props.ongoingCourse}
                      />
                      <p className="vedio-title">{topic.topicName}</p>
                      <p className="vedio-duration">
                        {/* {props.video.metadata.duration !== null
                          ? props.video.metadata.duration
                          : "empty"} */}
                        {getVideoLength(topic.videoLength)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </details>
          </div>
        );
      })}
    </div>
  );
};

export default SectionPanel;
