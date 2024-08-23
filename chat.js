import {dbRef} from "./firebase-init.js";
import {onValue, push, remove, get} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const userHero = document.querySelector("#user-hero");
const userName = document.querySelector("#user-name");
const userArea = document.querySelector("#user-area");

const chatArea = document.querySelector("#chat-area");
const chatWindow = document.querySelector("#chat-window");
const chatInputField = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-button");
const clearButton = document.querySelector("#clear-button");
const logoutButton = document.querySelector("#logout-button");

let initialRender = false;

function getUser() {
	return localStorage.getItem("username");
}

get(dbRef).then((ss) => {
	if (ss.exists()) renderAll(Object.values(ss.val()));
	userName.textContent = getUser();
	initialRender = true;
});

onValue(dbRef, function (ss) {
	if (ss.exists() && initialRender) {
		const messages = Object.values(ss.val());
		const latestMessage = messages[messages.length - 1];
		render(latestMessage.user, latestMessage.message, new Date(latestMessage.timestamp));
	}
});

logoutButton.addEventListener("click", () => {
	window.location.href = "login.html";
});

sendButton.addEventListener("click", () => {
	saveInput();
});

chatInputField.addEventListener("keydown", (event) => {
	if (event.key === "Enter") saveInput();
});

clearButton.addEventListener("dblclick", () => {
	chatWindow.innerHTML = "";
	remove(dbRef);
});

function saveInput() {
	const message = chatInputField.value;
	if (!message) return;
	const messageObject = {
		user: getUser(),
		message: message,
		timestamp: new Date().toISOString()
	};
	push(dbRef, messageObject);
	chatInputField.value = "";
}

function renderAll(messages) {
	messages.forEach(messageObject => {
		render(
			messageObject.user,
			messageObject.message,
			new Date(messageObject.timestamp)
		);
	});
}

function render(user, message, date) {
	const messageBubble = document.createElement("div");
	const messageContent = document.createElement("p");
	const messageAuthor = document.createElement("p");

	messageContent.textContent = message;
	messageBubble.classList.add("message-bubble");
	messageBubble.append(messageContent);

	const lastMessage = chatWindow.lastElementChild;
	const lastMessageAuthor = lastMessage ? lastMessage.querySelector(".message-author") : null;
	const lastUser = lastMessageAuthor ? lastMessageAuthor.textContent.split(",")[0] : null;

	if (lastUser === user) {
		messageAuthor.textContent = date.toLocaleTimeString().slice(0, 5);
		const lastMessageContent = lastMessage.querySelector(".message-bubble");
		lastMessage.removeChild(lastMessageAuthor);
		lastMessageContent.style.marginBottom = "5px";
	}

	messageAuthor.textContent = `${user}, ${date.toLocaleTimeString().slice(0, 5)}`;
	messageAuthor.classList.add("message-author");

	if (user === getUser()) styleSentMessage(messageBubble, messageAuthor);

	const messageElement = document.createElement("div");
	messageElement.classList.add("message-element");
	messageElement.append(messageBubble);
	messageElement.append(messageAuthor);
	chatWindow.append(messageElement);

	chatWindow.scrollTop = chatWindow.scrollHeight;
}

function styleSentMessage(messageBubble, messageAuthor) {
	messageBubble.style.alignSelf = "flex-end";
	messageBubble.style.backgroundColor = "lightblue";
	messageAuthor.style.alignSelf = "flex-end";
}