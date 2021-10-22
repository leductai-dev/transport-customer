const getOngoingCourses = (ongoingCourses, setOngoingCourses) => {
  // console.log("getOngoi", ongoingCourses);
  let list = [];
  let listPromises = [];
  ongoingCourses.forEach((course) => {
    listPromises.push(course.courseRef.get());
  });
  Promise.all(listPromises)
    .then((values) => {
      values.forEach((val) => {
        list.push(val.data());
      });
      return list;
    })
    .then((data) => {
      setOngoingCourses(data);
    })
    .catch((e) => console.log(e));
};

export { getOngoingCourses };
