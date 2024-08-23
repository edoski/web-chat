import {db} from "./firebase-init.js";
import {ref, push, get} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const usernameField = document.querySelector("#username-field");
const passwordField = document.querySelector("#password-field");
const loginButton = document.querySelector("#login-button");
const registerButton = document.querySelector("#register-button");

usernameField.focus();

if (loginButton) {
	loginButton.addEventListener("click", () => {
		const username = usernameField.value;
		const password = passwordField.value;
		if (!username || !password) return;
		login(username, password);
	});

	usernameField.addEventListener("keydown", (event) => {
		if (event.key === "Enter") passwordField.focus();
	});

	passwordField.addEventListener("keydown", (event) => {
		if (event.key === "Enter") loginButton.click();
	});
}

if (registerButton) {
	registerButton.addEventListener("click", () => {
		const username = usernameField.value;
		const password = passwordField.value;
		if (!username || !password) return;
		login(username, password);
	});
}

function login(username, password) {
	get(ref(db, "users")).then((ss) => {
		if (!ss.exists()) {
			const user = [
				{
					username: username,
					password: password
				}
			];
			push(ref(db, "users"), user);
			proceedAfterLogin(username);
		} else {
			const users = Object.values(ss.val());
			const user = users.find((user) => user.username === username);

			if (!user) {
				const newUser = {
					username: username,
					password: password
				};
				push(ref(db, "users"), newUser);
				proceedAfterLogin(username);
			} else if (user.password !== password) {
				alert("Invalid password");
			} else {
				proceedAfterLogin(username);
			}
		}
	});
}

function proceedAfterLogin(username) {
	localStorage.setItem("username", username);
	window.location.href = "home.html";
}