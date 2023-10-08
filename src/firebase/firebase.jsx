import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseApiKey, firebaseAuthDomain, firebaseProjectId, 
    firebaseStorageBucket, firebaseMessagingSenderId, firebaseAppId, 
    firebaseMeasurementId } from '../../env.js'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasurementId
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
