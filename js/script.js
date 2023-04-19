const viewPassword = document.querySelectorAll(".view-password");
const hidePassword = document.querySelectorAll(".hide-password");
const passwordInput = document.querySelectorAll(".password");
const forms = document.querySelectorAll(".forms");
const changeForm = document.querySelectorAll(".change-form");
console.log(changeForm);

changeForm.forEach((change) =>
  change.addEventListener("click", function (e) {
    e.preventDefault();
    forms.forEach((form) => form.classList.toggle("fade-in"));
  })
);

viewPassword.forEach((view) => {
  view.addEventListener("click", function () {
    view.classList.toggle("hidden");
    hidePassword.forEach((hide) => {
      hide.classList.toggle("hidden");
      passwordInput.forEach((inp) => inp.setAttribute("type", "password"));
    });
  });
});

hidePassword.forEach((hide) => {
  hide.addEventListener("click", function (v, h) {
    hide.classList.toggle("hidden");
    viewPassword.forEach((view) => {
      view.classList.toggle("hidden");
      passwordInput.forEach((inp) => inp.setAttribute("type", "text"));
    });
  });
});

// const toggleHidden = function (view) {
//   view.classList.toggle("hidden");
//   // hide.forEach((h) => h.classList.toggle("hidden"));
// };
// // const toggleHidden = function (view, hide) {
// //   view.forEach((v) => v.classList.toggle("hidden"));
// //   hide.forEach((h) => h.classList.toggle("hidden"));
// // };
// hidePassword.forEach((hide) => {
//   hide.addEventListener("click", toggleHidden(hide));
// });

// hide.classList.toggle("hidden");
// viewPassword.forEach((view) => {
//   view.classList.toggle("hidden");
// });
