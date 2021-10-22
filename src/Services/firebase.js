import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";

// config for institute
const config = {
  apiKey: "AIzaSyAfwW9eS7_rOdiS7kjavZVhJk-Cb95rnik",
  authDomain: "meritbodhi-courses.firebaseapp.com",
  projectId: "meritbodhi-courses",
  storageBucket: "meritbodhi-courses.appspot.com",
  messagingSenderId: "352967957649",
  appId: "1:352967957649:web:4ed3558194774b41af7330",
  measurementId: "G-7DTG94NNBW"
};
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };

const institute = firebase.initializeApp(config);
institute.analytics();
// firebase.analytics();
const db = institute.firestore();
const auth = institute.auth();
// const storage = institute.storage();
db.enablePersistence({ experimentalTabSynchronization: true })
  .then(() => {
    console.log("Woohoo! Multi-Tab Persistence!");
  })
  .catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log(
        "multiple tab is opened please close this tab and use only one tab, when offline"
      );
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log(
        "Current Browser or its version doesn't support offline mode"
      );
    }
  });
export { db, auth, firebase };
