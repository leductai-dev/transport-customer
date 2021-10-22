import { db } from "../../Services/firebase";

const getInstitutions = (institution) => {
  // const db = firebaseInstitute.firestore();
  db.collection("institute")
    .where("isVerified", "==", true)
    .limit(9)
    .get()
    .then((data) => {
      let fromCache = data.metadata.fromCache;

      let list = [];
      data.forEach((doc) => {
        // console.log(doc.data());
        list.push(doc.data());
      });
      institution(list, fromCache);
    })
    .catch((e) => console.log(e));
};

const getInstitute = (instituteId, setInstitute) => {
  db.collection("institute")
    .doc(instituteId)
    .get()
    .then((data) => {
      let fromCache = data.metadata.fromCache;

      setInstitute(data.data(), fromCache);
    })
    .catch((e) => console.log(e));
};

const getFaculties = (ctx, setFaculties) => {
  console.log("ctx", ctx.institute);
  // let institute = ctx.institute;
  let facultyIds = ctx.institute.facultyIds;
  let list = [];
  let listPromises = [];
  facultyIds.forEach((id) => {
    listPromises.push(db.collection("faculty").doc(id.trim()).get());
  });
  // console.log("list", list);
  Promise.all(listPromises)
    .then((values) => {
      values.forEach((val) => {
        // console.log("promiseAll", val.data());
        list.push(val.data());
      });
      return list;
    })
    .then((data) => {
      // console.log("2nd then", data);
      setFaculties(data);
    })
    .catch((e) => console.log(e));
};

export { getInstitutions, getFaculties, getInstitute };

// AWS DB Code:

// const docClient = new AWS.DynamoDB.DocumentClient();
// const getInstitutions = async (institution) => {
//   var params = {
//     TableName: "Institutes"
//   };
//   let datas = null;
//   await docClient.scan(params, function (err, data) {
//     if (!err) {
//       console.log("from dynamo", data);
//       datas = data;
//       institution(datas);
//     } else {
//       console.log(err);
//     }
//   });
// console.log("docCLient", docClient);
// return datas;
// };
