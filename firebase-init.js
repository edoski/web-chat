import {initializeApp} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js"
import {getDatabase, ref} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyBRFbkDseCyQSLMaXOW61nzWvaBM-i3Leo",
	authDomain: "baby-chat-b14a2.firebaseapp.com",
	databaseURL: "https://baby-chat-b14a2-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "baby-chat-b14a2",
	storageBucket: "baby-chat-b14a2.appspot.com",
	messagingSenderId: "1083005656246",
	appId: "1:1083005656246:web:baddf6eadcc3c15c8b5a17"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const dbRef = ref(db, "chat");