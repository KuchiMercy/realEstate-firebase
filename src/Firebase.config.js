import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBN95VGXMN4wvajAr4ypC04oBGLr53jNt4",
    authDomain: "real-estate-2d0fc.firebaseapp.com",
    projectId: "real-estate-2d0fc",
    storageBucket: "real-estate-2d0fc.appspot.com",
    messagingSenderId: "833123139099",
    appId: "1:833123139099:web:aacbbc27180e2afc1782be"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()