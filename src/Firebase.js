import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDBi7PtjYCQ1doNoJMvxVH8igukY-IK12Y",
    authDomain: "kais-shopping.firebaseapp.com",
    projectId: "kais-shopping",
    storageBucket: "kais-shopping.appspot.com",
    messagingSenderId: "349048772850",
    appId: "1:349048772850:web:973d0aebec0c3aa6f0586b",
    measurementId: "G-CFFRNVBCSS"
  };
const fire=firebase.initializeApp(firebaseConfig)
export default fire;