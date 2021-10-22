import React, { useState, useEffect } from "react";

const TopicCheckBox = (props) => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // console.log("topicCheckbox useeffect");
    // console.log("currentTime", props.currentTime >= props.length);
    // console.log("check topic", props.topic, props.section);

    // if course is completed, check all to true
    // console.log("checkbox", props.ongoingCourse);
    if (props.ongoingCourse !== null) {
      if (props.ongoingCourse.isCourseCompleted) {
        // console.log("topicCheckBox - course completed");
        setIsCompleted(true);
      } else {
        // sec < latestSection - true
        // sec > latestSec - false
        // sec == latestSec, top < lateTop - true
        // console.log("id", props.section);

        let sectionInd = props.sections.findIndex(
          (secTop) => secTop.section.id === props.section.id
        );

        console.log("id", sectionInd, props.latestIndex.sectionIndex);

        if (sectionInd < props.latestIndex.sectionIndex) {
          setIsCompleted(true);
        } else if (sectionInd === props.latestIndex.sectionIndex) {
          let topicIndex = props.sections[sectionInd].topics.findIndex(
            (top) => top.id === props.topic.id
          );
          if (topicIndex < props.latestIndex.topicIndex) {
            setIsCompleted(true);
          }
        }

        // console.log('sections')
        // last section & last topic
        // if (sectionInd === props.sections.length - 1) {
        //   let section = props.sections[sectionInd];
        //   // console.log("last section", props.sections);
        //   // console.log("sectionIndex", sectionInd, props.sections.length);
        //   // let topics = props.sections[sectionInd].topics;
        //   let topics = section.topics;
        //   let topicIndex = topics.findIndex((top) => top.id === props.topic.id);
        //   // console.log("topicIndex", topicIndex);
        //   if (topicIndex === topics.length - 1) {
        //     // check this one
        //     if (props.currentTime >= props.length) {
        //       setIsCompleted(true);
        //     }
        //     // return () => {
        //     //   console.log("cleanup--topicchekbox");
        //     // };
        //   }
        // }
      }
    }
  }, [
    // props.section,
    props.latestIndex.sectionIndex,
    props.latestIndex.topicIndex,
    props.sections,
    props.section.id,
    props.topic.id,
    // props.currentTime,
    // props.length,
    props.ongoingCourse
  ]);

  return <input type="checkbox" disabled checked={isCompleted} />;
};

export default TopicCheckBox;
