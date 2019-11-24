import firebase from 'firebase';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyCn1S6RA-cWuAP9UiwWf9Rj0zaCNqEFpH4",
    authDomain: "react-photo-3a6bf.firebaseapp.com",
    databaseURL: "https://react-photo-3a6bf.firebaseio.com",
    projectId: "react-photo-3a6bf",
    storageBucket: "react-photo-3a6bf.appspot.com",
    messagingSenderId: "223291348499",
    appId: "1:223291348499:web:2acfa0f2713905b0ce91e6",
    measurementId: "G-V7N8VS7E0Z"
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();


const storage = firebase.storage();

export {
    storage, firebase as default
}