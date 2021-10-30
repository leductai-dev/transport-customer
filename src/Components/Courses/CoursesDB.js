
const getFilterOptions = (filter) => {
 
};

const getCourses = (courses, subcatId) => {
 
};

const addBookmark = (user, course) => {
  let bookmarks = user.bookmarks;
  let index = bookmarks.findIndex((b) => {
    return b.id === course.id;
  });
  let updatedCourse = {
    ...bookmarks[index],
    bookmarkedTimestamp: new Date().getTime()
  };
  bookmarks[index] = updatedCourse;

 
};

const removeBookmark = (user, course) => {
  let bookmarks = user.bookmarks;
  let filteredBookmarks = bookmarks.filter((b) => {
    return b.id !== course.id;
  });
 
};

const buyCourse = (user, course, subcategoryId, price, setOngoingCourse) => {
  // example data, change after
  subcategoryId = subcategoryId.trim();
  
  // to add 30days to a current date
  // var date = new Date(); // Now
  // date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
  // console.log(date);

  // to add months to current date
  // var newDate = new Date(date.setMonth(date.getMonth()+8));

  let data = {
    id: course.id,
    courseRef: courseRef,
    courseBought: true,
    courseValid: true,
    courseBoughtTimestamp: new Date().getTime(),
    // courseEndTimestamp: '',
    // https://stackoverflow.com/questions/44827066/add-30-days-to-a-current-date-js
    isCourseCompleted: false,
    currentSectionTopic: {
      sectionId: "",
      topic: {
        topicId: "",
        currentTime: 0
      }
    },
    completedPercent: 0,
    reviewDet: {
      rating: -1,
      reviewContent: "",
      reviewTitle: "",
      uploadedDT: ""
    },
    quizAnswers: [], // based on sections
    courseDuration: price.period // how many days this course last for this user
  };

  let currentDT = new Date().getTime();
  let orderDet = {
    orderId: user.id + course.id + currentDT,
    courseId: course.id,
    courseRef: courseRef,
    courseName: course.courseName,
    category: course.category,
    status: "waiting for payment gateway",
    courseBoughtTimestamp: currentDT,
    courseDuration: price.period,
    price: price.discountedPrice
  };
  // let docIds = user.ongoingDocIds;
  // console.log("docIds", docIds);
  // initially now it is docIds, in future make an for loop on docIds
  // and each docIds, put that in a promise and resolve it
  let ongoingCourses = [...user.ongoingCourses, data];
  let orders = [...user.orders, orderDet];
  // console.log("buy course", user, ongoingCourses, orders);
  
   
};

const removeExpiredCourse = (authCtx, ongoingCourse) => {
  let user = authCtx.user;
  let ongoingCourses = user.ongoingCourses;
  let filteredOngoingCourses = ongoingCourses.filter((og) => {
    return og.id !== ongoingCourse.id;
  });
  // console.log("beforeRemove", user);
  user = {
    ...user,
    ongoingCourses: filteredOngoingCourses
  };


};

export {
  getCourses,
  getFilterOptions,
  addBookmark,
  removeBookmark,
  buyCourse,
  removeExpiredCourse
};
// AWS DB Code:
// import AWS from "../../Services/AWS";
// const docClient = new AWS.DynamoDB.DocumentClient();

// const getCourses = async (courses) => {
// Global Secondary Indexes (GSI) allow you to query
// efficiently over any field (attribute) in your DynamoDB
// table. GSIs can treat any table attribute as a key,
// even attributes not present in all items.
// var params = {
//   TableName: "Courses"
// };
// let datas = null;
// await docClient.scan(params, function (err, data) {
//   if (!err) {
//     console.log("from dynamo", data);
//     datas = data;
//     courses(datas);
//     // return datas;
//   } else {
//     console.log(err);
//   }
// });
// console.log("docCLient", docClient);
// return datas;
// };
