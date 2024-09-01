import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

require('dotenv').config();

const firebaseConfig = {
	databaseURL: process.env.FIREBASE_DATABASE_URL,
};


const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const generalChatRef = ref(db, "general");