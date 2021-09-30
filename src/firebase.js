import firebase from "firebase";
import "firebase/database";

let config = {
    apiKey: "AIzaSyB_G7QWaGt6GTOGXw2DobavmC4O9mABB2A",
    authDomain: "vuecrud-78fa1.firebaseapp.com",
    databaseURL: "https://vuecrud-78fa1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vuecrud-78fa1",
    storageBucket: "vuecrud-78fa1.appspot.com",
    messagingSenderId: "291803227064",
    appId: "1:291803227064:web:6684aff6315538cc29654d",
    measurementId: "G-F24Y8VZQ1J"
};

firebase.initializeApp(config);

export default firebase.database();