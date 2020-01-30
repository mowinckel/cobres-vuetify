import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyA8raGqQ-n4XgAtPNZQoEZJ9zeJJbbpGzo",
    authDomain: "supergate-cobre.firebaseapp.com",
    databaseURL: "https://supergate-cobre.firebaseio.com",
    projectId: "supergate-cobre",
    storageBucket: "supergate-cobre.appspot.com",
    messagingSenderId: "396011500373",
    appId: "1:396011500373:web:d0846f2baa34b1ec4a75dc"
  })
  .firestore();
