const viewPassword = document.querySelectorAll(".view-password");
const hidePassword = document.querySelectorAll(".hide-password");
console.log(hidePassword);

viewPassword.forEach((view) => {
  view.addEventListener("click", function () {
    view.classList.toggle("hidden");
    hidePassword.forEach((hide) => {
      hide.classList.toggle("hidden");
    });
  });
});

// hidePassword.forEach((hide) => {
//   hide.addEventListener("click", function (v, h) {
//     hide.classList.toggle("hidden");
//     viewPassword.forEach((view) => {
//       view.classList.toggle("hidden");
//     });
//   });
// });

const toggleHidden = function (view) {
  view.classList.toggle("hidden");
  // hide.forEach((h) => h.classList.toggle("hidden"));
};
// const toggleHidden = function (view, hide) {
//   view.forEach((v) => v.classList.toggle("hidden"));
//   hide.forEach((h) => h.classList.toggle("hidden"));
// };
hidePassword.forEach((hide) => {
  hide.addEventListener("click", toggleHidden);
});

// hide.classList.toggle("hidden");
// viewPassword.forEach((view) => {
//   view.classList.toggle("hidden");
// });
