// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/analytics";

// const config = {
//   apiKey: "AIzaSyB3Tn7A7TpIMJ7NIgeK4XFlVkxqbXTfVLQ",
//   authDomain: "meritbodhi-institute.firebaseapp.com",
//   projectId: "meritbodhi-institute",
//   storageBucket: "meritbodhi-institute.appspot.com",
//   messagingSenderId: "433605560319",
//   appId: "1:433605560319:web:973739d14d32c4bab0c9ca",
//   measurementId: "G-L13R2BT91B"
// };

// firebase.initializeApp(config);
// firebase.analytics();
// const dbInstitute = firebase.firestore();
// // const auth = firebase.auth();
// dbInstitute
//   .enablePersistence({ experimentalTabSynchronization: true })
//   .then(() => {
//     console.log("Woohoo! Multi-Tab Persistence!");
//   })
//   .catch((err) => {
//     if (err.code === "failed-precondition") {
//       // Multiple tabs open, persistence can only be enabled
//       // in one tab at a a time.
//       // ...
//       alert(
//         "multiple tab is opened please close this tab and use only one tab, when offline"
//       );
//     } else if (err.code === "unimplemented") {
//       // The current browser does not support all of the
//       // features required to enable persistence
//       // ...
//       console.log(
//         "Current Browser or its version doesn't support offline mode"
//       );
//     }
//   });
// export { dbInstitute };
