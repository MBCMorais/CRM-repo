// count/highlight class that are repeated.

function setFormMessage(formElement, type, message) {
	const messageElement = formElement.querySelector(".form__message");

	messageElement.textContent = message;
	messageElement.classList.remove("form__message--success", "form__message--error");
	messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
	inputElement.classList.add("form__input--error");
	inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function setInputSuccess(inputElement, message) {
	inputElement.classList.add("form__input--error");
	inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
	inputElement.classList.remove("form__input--error");
	inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function validarEmail(input) {
	let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
	if (input.value.match(regex)) {
		console.log("deu ");
	} else {
		let message = "Invalid Email";
		setInputError(input, message);
	}
}

function validarPassword(input) {
	let regExpWeak = /[a-z]/;
	let regExpMedium = /\d+/;
	let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
	let min_week_password = 3;
	let min_medium_password = 6;
	let min_strong_password = 6;

	let input_week = input.value.match(regExpWeak);
	let input_medium = input.value.match(regExpMedium);
	let input_strong = input.value.match(regExpStrong);
	if (input.value) {
		if (input.value.length <= min_week_password && (input_week || input_medium || input_strong)) {
			return "Your password is too week";
		}
		if (
			input.value.length >= min_medium_password &&
			((input_week && input_medium) ||
				(input_medium && input_strong) ||
				(input_week && input_strong))
		) {
			return "Your password is medium";
		}
		if (input.value.length >= min_strong_password && input_week && input_medium && input_strong) {
			return "Your password is strong";
		}
	}
}

function comparePass(input) {
	var pass = document.querySelector(`input[name$="password"]`);

	if (pass.value == input) {
		message = "Password Match";

		// clearInputError(cnfPass)
	} else {
	}
}

function validation(Username, Password) {
	// validate
	console.log("login");
	for (let i = 0; i < users.length; i++) {
		if (Username.value == users[i].username && Password.value == users[i].password) {
			console.log(Username.value + " is logged in!!");
			self.location = "../view/user.html";
		}
	}
	console.log("username doesn't exist");
}

function replaceUrl(lol) {
	location.hash = "";

	if (lol.href == location.href + "register") {
		history.replaceState("", "", lol.href);
	} else {
		history.replaceState("", "", lol.href);
	}
	console.log(location.href);

	if (lol.href == location.href + "login") {
		history.replaceState("", "", lol.href);
	}
}
document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.querySelector("#login");
	const createAccountForm = document.querySelector("#createAccount");
	const forgotPassForm = document.querySelector("#forgotPass");

	document.querySelector("#linkCreateAccount").addEventListener("click", e => {
		e.preventDefault();
		loginForm.classList.add("form--hidden");
		createAccountForm.classList.remove("form--hidden");
		setFormMessage(loginForm, "error", "");
		replaceUrl(e.target);
	});

	document.querySelector("#linkLogin").addEventListener("click", e => {
		e.preventDefault();
		loginForm.classList.remove("form--hidden");
		createAccountForm.classList.add("form--hidden");

		replaceUrl(e.target);
	});

	document.querySelector("#linkForgotPass").addEventListener("click", e => {
		e.preventDefault();
		forgotPassForm.classList.remove("form--hidden");
		loginForm.classList.add("form--hidden");

		setFormMessage(loginForm, "error", "");
	});

	document.querySelector("#linkReturn").addEventListener("click", e => {
		e.preventDefault();
		loginForm.classList.remove("form--hidden");
		forgotPassForm.classList.add("form--hidden");
	});

	loginForm.addEventListener("submit", e => {
		e.preventDefault();
		var username = document.querySelector(`input[name$="email"]`);
		var password = document.querySelector(`input[name$="pass"]`);

		// perform ajax/fetch login
		validation(username, password);
		setFormMessage(loginForm, "error", "invalid username/password combination");
	});

	document.querySelectorAll(".form__input").forEach(inputElement => {
		inputElement.addEventListener("blur", e => {
			if (
				e.target.id === "signupUsername" &&
				e.target.value.length > 0 &&
				e.target.value.length < 10
			) {
				setInputError(inputElement, "username must be 10 characters in length");
			}
		});

		document.querySelector("#checkEmail").addEventListener("blur", e => {
			console.log(e.target.value);
			validarEmail(e.target);
		});
		inputElement.addEventListener("blur", e => {
			if (e.target.id === "inputPass") {
				setInputError(inputElement, validarPassword(inputElement));

				// setTimeout(setInputError,3000,inputElement,validarPassword(inputElement))
				setTimeout(() => {
					clearInputError(inputElement);
				}, 2500);
				// verificar se deve ter timeout de mensagem ---fraca/media/forte
			}
		});
		inputElement.addEventListener("blur", e => {
			if ((e.target.id = "checkPass")) {
				comparePass(e.target.value);
			}
		});

		inputElement.addEventListener("input", e => {
			clearInputError(inputElement);
		});
	});
});