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
    // forms.forEach((form) => form.classList.toggle("hidden"));
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

// trial

class BankAccount {
  constructor(
    owner,
    movements,
    pin,
    interestRates,
    movementDates,
    currency,
    locale
  ) {
    this.owner = owner;
    this.movements = movements;
    this.pin = pin;
    this.interestRates = interestRates;
    this.movementDates = movementDates;
    this.currency = currency;
    this.locale = locale;
  }
}

class Bank {
  constructor() {
    this.acoounts = [];
  }

  addAccounts(owner, movements, pin, interestRates, currency, locale) {
    const account = new BankAccount(
      owner,
      movements,
      pin,
      interestRates,
      [],
      currency,
      locale
    );
    this.acoounts.push(account.owner);
    return account;
  }
}

const bank = new Bank();

const account1 = new BankAccount(
  "Fortune Oliseyenum",
  [200, 450, -400, 3000, -650, -130, 70, 1300],
  1111,
  1.2,
  [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2023-03-18T14:43:26.374Z",
    "2023-03-19T18:49:59.371Z",
    "2023-03-20T12:01:20.894Z",
  ],
  "USD",
  "en-US"
);

// owner,
// movements,
// pin,
// interestRates,
// [],
// currency,
// locale

bank.addAccounts(account1);
// console.log(bank);

const account2 = new BankAccount(
  "Destiny Oliseyenum",
  [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  2222,
  1.5,
  [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-03-14T17:01:17.194Z",
    "2023-03-18T23:36:17.929Z",
    "2023-03-21T10:51:36.790Z",
  ],
  "EUR",
  "pt-PT"
);
bank.addAccounts(account2);

// const creatUserName = function (fullName) {
//   fullName.forEach(function (full) {
//     full.username = full.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };

const creatUserName = function (fullname) {
  fullname.forEach((full) => {
    full.username = full.owner
      .toLowerCase()
      .split(" ")
      .splice(0, 1)
      .join("")
      .concat(full.owner.split("").length);
  });
};

// const creatUserName = function (full) {
//   full.username = full.owner
//     .toLowerCase()
//     .split(" ")
//     .map((name) => name[0])
//     .join("");
// };

creatUserName(bank.acoounts);
console.log(bank.acoounts);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(bank);

const headerRight = document.querySelector(".header-right-content");
const loginForm = document.querySelector(".login-form");
const loginUsername = document.querySelector("#username");
const loginPassword = document.querySelector("#password");

// dashborad, date and balance content
const dashboard = document.querySelector(".main-dashboard");
const dateAndBalance = document.querySelector(".date-current-balance");
const balance = document.querySelector(".balance");
const welcomeMessage = document.querySelector(".welcome-el");
const withdrawals = document.querySelector(".withdrawal");
const movementSummary = document.querySelector(".movement-summary");
console.log(movementSummary);
let currentAccount;

// console.log(bank.acoounts[0].movements);
const moves = bank.acoounts[0].movements;
console.log(moves);

moves.forEach((mo, i) => {
  const html = document.createElement("div");
  html.innerHTML = `
<div
class="withdrawal summary"
>
<div class="summary-subcontainer">
  <p class="summary-desc bg-red-500 ">
    ${i + 1} withdrawal
  </p>
  <p class="text-gray-500">TODAY</p>
</div>
<p class="text-xl text-gray-700">${mo}€</p>
</div>
  `;

  movementSummary.insertAdjacentElement("afterbegin", html);
});

// html.innerHTML = `
// <div
// class="withdrawal flex flex-row h-16 items-center justify-between md:px-10 bg-blue-300 border-b-2"
// >
// <div class="flex flex-row font-semibold text-xs space-x-5">
//   <p class="text-white bg-red-500 px-2 rounded-full">
//     9 WITHDRAWAL
//   </p>
//   <p class="text-gray-500">TODAY</p>
// </div>
// <p class="text-xl text-gray-700">-4 000€</p>
// </div>
//   `;

// movementSummary.insertAdjacentElement("afterbegin", html);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  currentAccount = bank.acoounts.find(
    (acc) => acc.username === loginUsername.value
  );

  if (currentAccount?.pin === +loginPassword.value) {
    console.log(currentAccount);
    dashboard.classList.remove("opacity-0");
    dateAndBalance.classList.remove("opacity-0");
    forms.forEach((form) => form.classList.add("hidden"));
    const move = currentAccount.movements.reduce((mov, cur) => (mov += cur));
    balance.textContent = `${move}€`;
    welcomeMessage.textContent = `Welcom ${currentAccount.owner
      .split(" ")
      .slice(0, 1)}`;

    console.log(move);
  } else {
    alert("username or password is incorrect");
    loginPassword.value = loginUsername.value = "";
  }
});
