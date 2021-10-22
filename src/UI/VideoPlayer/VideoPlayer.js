import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";

import "./VideoPlayer.css";

const VideoPlayer = (props) => {
  // console.log("video", props.video.url);
  const [videoPlayTime, setVideoPlayTime] = useState(0);
  // const [captions, setCaptions] = useState();
  const videoRef = useRef();
  const previousUrl = useRef(props.topic.video);

  useEffect(() => {
    if (previousUrl.current === props.topic.video) {
      return;
    }

    if (videoRef.current) {
      videoRef.current.load();
    }

    previousUrl.current = props.topic.video;
  }, [props.topic.video]);

  useEffect(() => {
    if (props.ongoingCourse !== null) {
      // console.log("video--", props.latestSecTop, props.currentSecTop);
      // console.log("ongoingCourse", props.ongoingCourse);
      // here some changes need to be made, every time, the video
      //is loaded, its setting to latest time for all videos
      // solution: check onLoadedMetaData in Video

      setVideoPlayTime(
        props.ongoingCourse.currentSectionTopic.topic.currentTime
      );

      // console.log(props.currentSecTop);
      // dynamically adding captions and subtitles using vtt
      // let video = document.querySelector("video");
      // video.currentTime = 8;
      // let track = video.addTextTrack("chapters", "English", "en");
      // track.mode = "showing";
      // track.addCue(new VTTCue(0, 0.9, "Hildy!"));
      // track.addCue(new VTTCue(1, 1.4, "How are you?"));
      // track.addCue(
      //   new VTTCue(1.5, 2.9, "Tell me, is the lord of the universe in?")
      // );
      // track.addCue(new VTTCue(3, 4.2, "Yes, he's in - in a bad humor"));
      // track.addCue(
      //   new VTTCue(4.3, 6, "Somebody must've stolen the crown jewels")
      // );
      // console.log(track.cues);
    }
  }, [props.ongoingCourse]);

  useEffect(() => {
    // console.log(props.caption);
    if (props.caption !== null) {
      let video = document.querySelector("video");
      let captionTiming = props.caption.timing;
      let timing = captionTiming.split(":");
      let min = parseInt(timing[0]);
      let sec = parseInt(timing[1]);
      let time = min * 60 + sec;
      // 01: 00 -> 1,0
      // 01: 10 -> 1, 10
      // console.log("captionTiming", time);
      video.currentTime = time;
    }
  }, [props.caption]);
  $(document).ready(function () {
    $("#vbn").bind("contextmenu", function () {
      return false;
    });
  });
  // https://stackoverflow.com/questions/41303012/updating-source-url-on-html5-video-with-react
  return (
    <video
      id="vbn"
      className="videoframe"
      controlsList="nodownload"
      controls
      // key={props.topic.video}
      ref={videoRef}
      onTimeUpdate={(e) => props.setCurrentTime(e.target.currentTime)}
      onEnded={(e) => {
        console.log("ended");
        props.getNextTopic();
        // make activePlaytime to 0
        // play next video after 5secs and set it as current video
      }}
      onLoadedMetadata={(e) => {
        console.log("duration", e.target.duration);
        if (
          props.ongoingCourse.currentSectionTopic.topic.topicId ===
          props.topic.id
        ) {
          setVideoPlayTime(
            props.ongoingCourse.currentSectionTopic.topic.currentTime
          );
        } else {
          setVideoPlayTime(0);
        }
      }}
    >
      <source
        // src="https://secure--storage.s3.ap-south-1.amazonaws.com/zIRk7-DMMwZ-OxFFf-V5COz.vtt"
        src={
          "https://secure--storage.s3.ap-south-1.amazonaws.com/" +
          props.topic.video +
          `#t=${videoPlayTime}`
        }
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
