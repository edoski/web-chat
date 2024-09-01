import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
	databaseURL: "https://web-chat-68f66-default-rtdb.europe-west1.firebasedatabase.app"
};


const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const generalChatRef = ref(db, "general");