const viewPassword = document.querySelector(".view-password");
const hidePassword = document.querySelector(".hide-password");
const passwordInput = document.querySelector(".password");
const viewPasswordSignUp = document.querySelector(".view-password-signup");
const hidePasswordSignUp = document.querySelector(".hide-password-signup");
const passwordInputSignUp = document.querySelector(".password-signup");
const forms = document.querySelectorAll(".forms");
const changeForm = document.querySelectorAll(".change-form");

changeForm.forEach((change) =>
  change.addEventListener("click", function (e) {
    e.preventDefault();
    forms.forEach((form) => form.classList.toggle("fade-in"));
  })
);

viewPasswordSignUp.addEventListener("click", function () {
  toggleSignUp();
  passwordInputSignUp.setAttribute("type", "password");
});
hidePasswordSignUp.addEventListener("click", function () {
  toggleSignUp();
  passwordInputSignUp.setAttribute("type", "text");
});

viewPassword.addEventListener("click", function () {
  togglLogin();
  passwordInput.setAttribute("type", "password");
});
hidePassword.addEventListener("click", function () {
  togglLogin();
  passwordInput.setAttribute("type", "text");
});

function togglLogin() {
  viewPassword.classList.toggle("hidden");
  hidePassword.classList.toggle("hidden");
}
function toggleSignUp() {
  hidePasswordSignUp.classList.toggle("hidden");
  viewPasswordSignUp.classList.toggle("hidden");
}
