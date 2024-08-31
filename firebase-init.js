import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
// require('dotenv').config()
// const db = require('db')

const firebaseConfig = {
	// apiKey: process.env.FIREBASE_API_KEY,
	// authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: "__FIREBASE_DATABASE_URL__",
	// projectId: process.env.FIREBASE_PROJECT_ID,
	// storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	// appId: process.env.FIREBASE_APP_ID
};

console.log("Firebase Database URL:", firebaseConfig.databaseURL);

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const generalChatRef = ref(db, "general");