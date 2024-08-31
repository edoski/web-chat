import {db, generalChatRef} from "./firebase-init.js";
import {ref, push, get} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const userHero = document.querySelector("#user-hero");
// const chatSelection = document.querySelector("#chat-selection");
const chatInput = document.querySelector("#chat-input");
const joinButton = document.querySelector("#join-button");
const logoutButton = document.querySelector("#logout-button");
const generalButton = document.querySelector("#general-button");

const username = localStorage.getItem("username");
userHero.textContent = `welcome, ${username}.`;

document.addEventListener("DOMContentLoaded", () => {
	if (!username) window.location.href = "login.html";
});

// if (chatSelection) {
// 	const usersRef = ref(db, "users/");
// 	get(usersRef).then((snapshot) => {
// 		const data = snapshot.val();
// 		for (const key in data) {
// 			if (data[key].username !== (username)) {
// 				const chatOption = document.createElement("option");
// 				chatOption.textContent = data[key].username;
// 				chatOption.value = data[key].username;
// 				chatSelection.appendChild(chatOption);
// 			}
// 		}
// 	});
// }

export let chatRef;

function connectToChat() {
	// const chatWith = chatSelection.value;
	const chatWith = chatInput.value;
	if (chatWith === "chat") return;
	chatRef = ref(db, `chats/${chatUID(username, chatWith)}`);
	get(chatRef).then((snapshot) => {
		if (!snapshot.exists()) push(chatRef, {messages: []});
		window.location.href = `chat.html?chat=${chatUID(username, chatWith)}`;
	});
}

if (joinButton) {
	joinButton.addEventListener("click", () => {
		connectToChat();
	});
}

if (logoutButton) {
	logoutButton.addEventListener("click", () => {
		localStorage.removeItem("username");
		window.location.href = "login.html";
	});
}

// if (generalButton) {
// 	generalButton.addEventListener("click", () => {
// 		get(generalChatRef).then((snapshot) => {
// 			if (!snapshot.exists()) push(generalChatRef, {messages: []});
// 			window.location.href = "chat.html?chat=general";
// 		});
// 	});
// }

function chatUID(username, chatWith) {
	return username < chatWith ?
		`${username}-${chatWith}` : `${chatWith}-${username}`;
}

document.addEventListener("keydown", (event) => {
	if (event.key === "Enter") connectToChat();
});