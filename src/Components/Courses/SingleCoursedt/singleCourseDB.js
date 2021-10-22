import { db, firebase } from "../../../Services/firebase";

const getCourse = (course, courseId, subcategoryId) => {
  console.log("getCourse() - from db");
  subcategoryId = subcategoryId.trim();
  db.collection("subCategories")
    .doc(subcategoryId)
    .collection("courses")
    .doc(courseId)
    .get()
    .then((doc) => course(doc.data()))
    .catch((e) => console.log(e));
};

// use promise resolve
const getSections = (sections, sectionIds) => {
  // console.log("sectionIds", sectionIds);
  let list = [];
  let listPromises = [];
  sectionIds.forEach((id) => {
    listPromises.push(db.collection("sections").doc(id.trim()).get());
  });
  // console.log("list", list);
  Promise.all(listPromises)
    .then((value) => {
      value.forEach((val) => {
        // console.log("promiseAll", val.data());
        list.push(val.data());
      });
      return list;
    })
    .then((data) => {
      // console.log("2nd then", data);
      sections(data);
    })
    .catch((e) => console.log(e));
};

const postQuestion = (ques, user, currentSectionTopic, setIsUpdated) => {
  let data = {
    ques: ques,
    user: user.id + "?**?" + user.name,
    uploadedDT: new Date().getTime(),
    ans: ""
  };

  db.collection("sections")
    .doc(currentSectionTopic.section.id)
    .collection("topics")
    .doc(currentSectionTopic.topic.id)
    .update({
      qa: firebase.firestore.FieldValue.arrayUnion(data)
    })
    .then(() => {
      console.log("then");
      let value = {
        ...data,
        sectionId: currentSectionTopic.section.id,
        topicId: currentSectionTopic.topic.id
      };
      setIsUpdated(value);
    })
    .catch((e) => {
      setIsUpdated(false);
      console.log(e);
    });
};

// const getPosts = (posts, postIds) => {
//   console.log("......", posts);
// let list = [];
// let listPromises = [];
// postIds.forEach((id) => {
//   listPromises.push(
//     db
//       .collection("sections")
//       .doc(posts.sectionId)
//       .collection("topics")
//       .doc(posts.topicId)
//       .get()
//   );
// });
// // console.log("list", list);
// Promise.all(listPromises)
//   .then((value) => {
//     value.forEach((val) => {
//       // console.log("promiseAll", val.data());
//       list.push(val.data());
//     });
//     return list;
//   })
//   .then((data) => {
//     // console.log("2nd then", data);
//     posts(data);
//   })
//   .catch((e) => console.log(e));
// };

const getTopics = (topics, sectionId) => {
  db.collection("sections")
    .doc(sectionId)
    .collection("topics")
    .orderBy("topicName")
    .get()
    .then((docs) => {
      let list = [];
      docs.forEach((doc) => {
        list.push(doc.data());
      });
      return list;
    })
    .then((topicsList) => {
      topics(topicsList);
    })
    .catch((e) => console.log(e));
};

const getSectionsTopics = (sectionsTopics, sectionIds) => {
  console.log("from db...");
  // sections will be returned here and stored in sec
  // let list = [];
  let listPromises = [];
  getSections((sections) => {
    // console.log("getSectionsTopics", sections);
    sections.forEach((sec) => {
      let promise = new Promise((resolve, reject) => {
        getTopics((topics) => {
          // list.push({
          //   section: sec,
          //   topics: topics
          // });
          resolve({
            section: sec,
            topics: topics
          });
        }, sec.id);
      });
      // pushing promises to the array
      listPromises.push(promise);
      // promise.then((data) => {
      //   // console.log("resolved", data);
      //   list.push(data);
      // });
    }); // end of sections forEach
    Promise.all(listPromises).then((value) => {
      // console.log("updated promise all", value);
      sectionsTopics(value);
    });
  }, sectionIds);
};

const setLatestSectionTopicDB = (
  latestData,
  authCtx,
  course,
  sectionTopics,
  ongoingCourse
) => {
  let userId = authCtx.user.id;
  // let ongoingDocIds = authCtx.user.ongoingDocIds;
  // console.log("setLatestSectionTopicDB", latestData, userId, course);
  // completedPercent

  // last section & last topic
  let percentageCompleted = 0;
  console.log("ongoigCourse", ongoingCourse);
  if (ongoingCourse.isCourseCompleted) {
    // percentageCompleted = 100;
    console.log("Course Already compelted, dont again set db to 100%");
  } else {
    // before last section & last topic
    // console.log();
    let sectionLength = sectionTopics.length;
    let sectionIndex = sectionTopics.findIndex((secTop) => {
      return secTop.section.id === latestData.sectionId;
    });
    // add 1 to sectionIndex bcs  array.length, sectionLength
    sectionIndex += 1;
    // formula
    // ((completedBeforeSection + currentSection, how many topics completed)/totalSectionsLength) * 100
    let completedBeforeSection = sectionIndex - 1;
    let currentCompletedSectionTopic = 0;
    let sectionTopic = sectionTopics[sectionIndex - 1];
    // console.log("sectionTopic", sectionTopic);
    let topics = sectionTopic.topics;
    let topicsLength = topics.length;
    let topicIndex = topics.findIndex((topic) => {
      // console.log("topInx", topic.id, latestData.topic.topicId);
      return topic.id === latestData.topic.topicId;
    });
    topicIndex += 1;

    console.log("topicIndex", topicIndex);
    currentCompletedSectionTopic = (topicIndex - 1) / topicsLength;
    console.log("completedBeforeSection", completedBeforeSection);
    console.log("currentCompletedSectionTopic", currentCompletedSectionTopic);
    console.log("sectionLength", sectionLength);
    percentageCompleted =
      ((completedBeforeSection + currentCompletedSectionTopic) * 100) /
      sectionLength;

    // else, get the last doc id and update in there
    let ongoingCourses = authCtx.user.ongoingCourses;
    let ongoingCourseIndex = ongoingCourses.findIndex(
      (c) => c.id === course.id
    );
    // let completedCourses = authCtx.user.completedCourses;
    let updatedCourse = {
      ...ongoingCourses[ongoingCourseIndex],
      currentSectionTopic: latestData,
      completedPercent: percentageCompleted
    };
    console.log("updatedCourse", updatedCourse);
    ongoingCourses[ongoingCourseIndex] = updatedCourse;
    console.log("ongoingCourses set", ongoingCourses);
    // let completedIndex = completedCourses.findIndex((courses) => {
    //   return courses.id === course.id;
    // });
    // completedCourses[completedIndex] = updatedCourse;

    // // update ongoingCourses in auth-context
    authCtx.setUser({
      ...authCtx.user,
      ongoingCourses: ongoingCourses
      // completedCourses: completedCourses
    });

    db.collection("students")
      .doc(userId)
      .collection("userCourseDetails")
      .doc("courseDetails")
      .update({
        ongoingCourses: ongoingCourses
      })
      .then(() => console.log("successfully set the latest section and topic"))
      .catch((e) => {
        console.log("singleCourseDB", e);
        if (e.code.includes("exceeds")) {
          // if max doc size is reached, create new doc and update there
        } else {
        }
      });
  }
};

const getReviews = (reviews, subcategoryId, courseId, authCtx) => {
  courseId = courseId.trim();
  subcategoryId = subcategoryId.trim();
  console.log("getReviews--db");
  let list = [];
  db.collection("subCategories")
    .doc(subcategoryId)
    .collection("courses")
    .doc(courseId)
    .collection("reviews")
    .doc("reviews")
    // .limit(5) // check this out later
    .get()
    .then((doc) => {
      // docs.forEach((doc) => {
      //   doc.data().reviews.forEach((review) => {
      //     list.push(review);
      //   });
      // });
      // the user review will not be shown
      let reviews = doc.data().reviews;
      // let reviews = doc.data().reviews.filter((rev) => {
      //   return rev.userId !== authCtx.user.id;
      // });
      list = [...reviews];
    })
    .catch((e) => console.log(e))
    .finally(() => {
      // console.log("listReviews", list);
      reviews(list);
    });
};

const setCourseCompleted = (authCtx, course) => {
  console.log("authCtx", authCtx.user, course);
  let ongoingCourses = authCtx.user.ongoingCourses;
  let completedCourses = authCtx.user.completedCourses;
  let updatedCourse = {
    ...course,
    completedPercent: 100,
    isCourseCompleted: true
  };
  let index = ongoingCourses.findIndex((courses) => {
    return courses.id === course.id;
  });
  ongoingCourses[index] = updatedCourse;
  let completedIndex = completedCourses.findIndex((courses) => {
    return courses.id === course.id;
  });
  completedCourses[completedIndex] = updatedCourse;

  // update ongoingCourses in auth-context
  authCtx.setUser({
    ...authCtx.user,
    ongoingCourses: ongoingCourses,
    completedCourses: completedCourses
  });
  // set in db
  db.collection("students")
    .doc(authCtx.user.id)
    .collection("userCourseDetails")
    .doc("courseDetails")
    .update({
      ongoingCourses: ongoingCourses,
      completedCourses: firebase.firestore.FieldValue.arrayUnion(updatedCourse)
    })
    .then(() => console.log("successfully updated!!!"))
    .catch((e) => console.log(e));
  // console.log("updated", ongoingCourses);
};

// basic one, one doc 2000 to 4000 reviews can be there
// for advance one next function which is in comment
const addReview = (
  authCtx,
  ongoingCourse,
  course,
  reviewDet,
  setReview,
  reviewsList
) => {
  // add review to that particular user/student ongoigncourse
  // console.log("course", authCtx.user, course, reviewDet);
  // setReview(reviewDet);
  let review = {
    ...reviewDet,
    uploadedDT: new Date().getTime().toString()
  };
  let ongoingCourses = authCtx.user.ongoingCourses;
  let updatedCourse = {
    ...ongoingCourse,
    reviewDet: review // {rating: 3, review: ''}
  };
  let index = ongoingCourses.findIndex((courses) => {
    return courses.id === ongoingCourse.id;
  });
  ongoingCourses[index] = updatedCourse;

  // update ongoingCourses in auth-context
  authCtx.setUser({
    ...authCtx.user,
    ongoingCourses: ongoingCourses
  });

  db.collection("students")
    .doc(authCtx.user.id)
    .collection("userCourseDetails")
    .doc("courseDetails")
    .update({
      ongoingCourses: ongoingCourses
    })
    .then(() => {
      console.log("successfully updated review in ongoingCourse!!!");
      // db.collection("subCategories")
      //   .doc(course.subcategoryId)
      //   .collection("courses")
      //   .doc(course.id)
      //   .collection("reviews")
      //   .doc("reviews")
      //   .get()
      //   .then((doc) => {
      // let reviews = doc.data().reviews;
      let reviews = reviewsList;
      let index = reviews.findIndex((rev) => {
        return rev.userId === authCtx.user.id;
      });
      let rev = {
        rating: review.rating,
        reviewContent: review.reviewContent,
        reviewTitle: review.reviewTitle,
        uploadedDT: review.uploadedDT,
        userId: authCtx.user.id,
        username: authCtx.user.name
      };
      if (index === -1) {
        // new review
        reviews.push(rev);
      } else {
        // udpate review
        reviews[index] = rev;
      }
      db.collection("subCategories")
        .doc(course.subcategoryId)
        .collection("courses")
        .doc(course.id)
        .collection("reviews")
        .doc("reviews")
        .update({
          reviews: reviews
        })
        .then(() => {
          console.log("updated in course reviews");
          setReview(review);
        })
        .catch((e) => {
          // if we get error due to 1mb limit
          console.log(e);
        });
    })
    .catch((e) => console.log(e));
  // })
  // .catch((e) => console.log(e));
};

// next update
// const addReview = (authCtx, ongoingCourse, course, reviewDet, setReview) => {
//   // add review to that particular user/student ongoigncourse
//   // console.log("course", authCtx.user, course, reviewDet);
//   // setReview(reviewDet);
//   let review = {
//     ...reviewDet,
//     uploadedDT: new Date().getTime().toString()
//   };
//   let ongoingCourses = authCtx.user.ongoingCourses;
//   let updatedCourse = {
//     ...ongoingCourse,
//     reviewDet: review // {rating: 3, review: ''}
//   };
//   let index = ongoingCourses.findIndex((courses) => {
//     return courses.id === ongoingCourse.id;
//   });
//   ongoingCourses[index] = updatedCourse;

//   // update ongoingCourses in auth-context
//   authCtx.setUser({
//     ...authCtx.user,
//     ongoingCourses: ongoingCourses
//   });

//   // ongoingDocIds, like the below shouldnt not be given,
//   // we must get all the ongoignCourses docs, and find which doc,
//   // the current course is there, and update only that doc
//   // not other document
//   // set in db
//   db.collection("students")
//     .doc(authCtx.user.id)
//     .collection("userCourseDetails")
//     .doc("courseDetails")
//     .update({
//       ongoingCourses: ongoingCourses
//     })
//     .then(() => {
//       console.log("successfully updated review in ongoingCourse!!!");

//       // this will happen, if we give docIds in course - 1write in ongoingcourse, 1write in course-reviews, 1write in course(docIds)
//       // in course check, there is reviewIds are there,
//       // if it is there, just get the last id and set the
//       // review to that id

//       // if reviewIds, is not there, then add new doc to
//       // the review collection

//       // below will happen, if we dont want to give docIds - n doc reads in course-reviews, 1 write in reviews, 1 write in ongoingcourse
//       // read all docs from reviews, and update in last doc.
//       let reviewDocs = [];
//       db.collection("subCategories")
//         .doc(course.subcategoryId)
//         .collection("courses")
//         .doc(course.id)
//         .collection("reviews")
//         .get()
//         .then((docs) => {
//           // console.log("reviewDoc", docs, course.id, course.subcategoryId);
//           docs.forEach((doc) => {
//             // console.log("reviews", doc.data());
//             reviewDocs.push(doc.data());
//           });
//         })
//         .then(() => {
//           console.log("reviewDocs", reviewDocs);
//           let cur = reviewDocs[reviewDocs.length - 1];
//           // this will show an error, if there is no review collection
//           // and no docs in that collection
//           console.log("cur", cur);
//           db.collection("subCategories")
//             .doc(course.subcategoryId)
//             .collection("courses")
//             .doc(course.id)
//             .collection("reviews")
//             .doc(cur.id)
//             .update({
//               reviews: firebase.firestore.FieldValue.arrayUnion({
//                 rating: review.rating,
//                 review: review.reviewContent,
//                 reviewTitle: review.reviewTitle,
//                 uploadedDT: review.uploadedDT,
//                 userId: authCtx.user.id,
//                 username: authCtx.user.name
//               })
//             })
//             .then(() => {
//               console.log("updated in course reviews");
//               setReview(review);
//             })
//             .catch((e) => {
//               // if we get error due to 1mb limit
//               console.log(e);
//             });
//         })
//         .catch((e) => console.log(e));
//     })
//     .catch((e) => console.log(e));
// };

const deleteReview = (
  authCtx,
  ongoingCourse,
  course,
  reviewsList,
  setReviews
) => {
  console.log("user", authCtx.user);
  console.log("course", course);
  let ongoingCourses = authCtx.user.ongoingCourses;

  let index = ongoingCourses.findIndex((courses) => {
    return courses.id === ongoingCourse.id;
  });
  let updatedCourse = {
    ...ongoingCourse,
    reviewDet: {
      rating: 0,
      reviewContent: "",
      reviewTitle: "",
      uploadedDT: ""
    }
  };
  ongoingCourses[index] = updatedCourse;

  // update ongoingCourses in auth-context
  authCtx.setUser({
    ...authCtx.user,
    ongoingCourses: ongoingCourses
  });

  db.collection("students")
    .doc(authCtx.user.id)
    .collection("userCourseDetails")
    .doc("courseDetails")
    .update({
      ongoingCourses: ongoingCourses
    })
    .then(() => {
      console.log("successfully updated review in ongoingCourse!!!");

      let reviews = reviewsList;
      let filteredCourses = reviews.filter((rev) => {
        return rev.userId !== authCtx.user.id;
      });

      db.collection("subCategories")
        .doc(course.subcategoryId)
        .collection("courses")
        .doc(course.id)
        .collection("reviews")
        .doc("reviews")
        .update({
          reviews: filteredCourses
        })
        .then(() => {
          console.log("deleted from course reviews");
          setReviews(filteredCourses);
        })
        .catch((e) => {
          // if we get error due to 1mb limit
          console.log(e);
        });
    })
    .catch((e) => console.log(e));
};

const setQuizAnswers = (authCtx, course, sectionId, answers) => {
  let ongoingCourses = authCtx.user.ongoingCourses;
  // console.log("setQuizNas", ongoingCourses, course, sectionId, answers);
  let index = ongoingCourses.findIndex((cour) => {
    return cour.id === course.id;
  });
  // quizAnswers - new section, old section udpate
  let quizAnswers = ongoingCourses[index].quizAnswers;
  let newQuiz = {
    sectionId: sectionId,
    answers: answers
  };
  let quizIndex = quizAnswers.findIndex((q) => q.sectionId === sectionId);
  if (quizIndex === -1) {
    // new section quiz
    quizAnswers.push(newQuiz);
  } else {
    // need to update the quiz Answers
    quizAnswers[quizIndex] = newQuiz;
  }
  let updatedCourse = {
    ...ongoingCourses[index],
    quizAnswers: quizAnswers
  };
  ongoingCourses[index] = updatedCourse;
  console.log("after stored ongoignCourses", ongoingCourses);
  // updating in context
  let user = authCtx.user;
  let updatedUser = {
    ...user,
    ongoingCourses: ongoingCourses
  };
  authCtx.setUser(updatedUser);

  // updating in db
  // ongoingDocIds - find the docIds, for this current specific course
  db.collection("students")
    .doc(authCtx.user.id)
    .collection("userCourseDetails")
    .doc("courseDetails")
    .update({
      ongoingCourses: ongoingCourses
    })
    .then(() => console.log("successfully updated in db - quiz"))
    .catch((e) => console.log(e));
};

export {
  getCourse,
  getSections,
  getReviews,
  getSectionsTopics,
  setLatestSectionTopicDB,
  setCourseCompleted,
  addReview,
  setQuizAnswers,
  postQuestion,
  deleteReview
};
