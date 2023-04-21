const viewPassword = document.querySelector(".view-password");
const hidePassword = document.querySelector(".hide-password");
const passwordInput = document.querySelector(".password");
const viewPasswordSignUp = document.querySelector(".view-password-signup");
const hidePasswordSignUp = document.querySelector(".hide-password-signup");
const passwordInputSignUp = document.querySelector(".password-signup");
const forms = document.querySelectorAll(".forms");
const changeForm = document.querySelectorAll(".change-form");

// //////////////////////////////////////////
// SWITCH BETWEEN SIGN UP AND SIGN IN FORM
changeForm.forEach((change) =>
  change.addEventListener("click", function (e) {
    e.preventDefault();
    forms.forEach((form) => form.classList.toggle("fade-in"));
    // forms.forEach((form) => form.classList.toggle("hidden"));
  })
);

// //////////////////////////////////////
// TOGGLE PASSOWRD VIEW FOR BOTH SIGN UP AND SIGN IN FORM
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

// /////////////////////////////
// BANK ACCOUNT CLASS
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

// //////////////////////////
// BANK CLASS ALSO CONTAINING CREATE ACCOUNT FUNCTION
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

const bank = new Bank(); // create a new bank instance

// /////////////////////////////////
// HARD CODED ACCOUNTS FOR TESTING PURPOSE
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
    "2023-04-18T18:49:59.371Z",
    "2023-04-20T12:01:20.894Z",
  ],
  "USD",
  "en-US"
);

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
    "2023-04-14T17:01:17.194Z",
    "2023-04-18T23:36:17.929Z",
    "2023-04-20T10:51:36.790Z",
  ],
  "EUR",
  "pt-PT"
);
bank.addAccounts(account2);

// ///////////////////////////////
// CREATE USERNAME FOR EACH ACCOUNT
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

creatUserName(bank.acoounts);

const headerRight = document.querySelector(".header-right-content");
const loginForm = document.querySelector(".login-form");
const loginUsername = document.querySelector("#username");
const loginPassword = document.querySelector("#password");

// dashborad, date and balance content
const date = document.querySelector(".date");
const dashboard = document.querySelector(".main-dashboard");
const dateAndBalance = document.querySelector(".date-current-balance");
const balance = document.querySelector(".balance");
const welcomeMessage = document.querySelector(".welcome-el");
const withdrawals = document.querySelector(".withdrawal");
const movementSummary = document.querySelector(".movement-summary");
// console.log(movementSummary);
let currentAccount;

////////////////////////////////////////////
// date format
const formattedDate = function (date, locale) {
  const calcDaysPast = (date1, date2) =>
    Math.floor(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPast = calcDaysPast(new Date(), date);

  if (daysPast === 0) {
    return `TODAY`;
  }
  if (daysPast === 1) {
    return `YESTERDAY`;
  }
  if (daysPast <= 7) {
    return `${daysPast} DAYS AGO`;
  } else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// ////////////////////////////////
// DISPLAY MOVEMENTS
const displayMovements = function (account) {
  movementSummary.innerHTML = "";
  const moves = account.movements;
  // console.log(moves);

  moves.forEach(function (mo, i) {
    const type = mo > 0 ? `deposit` : `withdrawal`;

    const rawDate = new Date(account.movementDates[i]);
    const date = formattedDate(rawDate, account.locale);
    // console.log(date);

    const html = document.createElement("div");
    html.innerHTML = `
    <div
    class="withdrawal summary"
    >
       <div class="summary-subcontainer">
         <p class="summary-desc-${type}">
           ${i + 1} ${type}
         </p>
         <p class="text-gray-500">${date}</p>
       </div>
      <p class="text-xl text-gray-700">${mo}€</p>
    </div>
  `;

    movementSummary.insertAdjacentElement("afterbegin", html);
  });
};

// display Balance
const displayBalance = function (account) {
  account.balance = account.movements.reduce((mov, cur) => (mov += cur));
  balance.textContent = `${account.balance}€`;
};

const updateUI = function (account) {
  displayBalance(account);
  displayMovements(account);
};

// ////////////////////////
// login event handler

const dislayDashboard = function () {
  dashboard.classList.remove("opacity-0");
  dateAndBalance.classList.remove("opacity-0");
  forms.forEach((form) => form.classList.add("hidden"));
};

// currentAccount = account1;
// displayMovements(currentAccount);
// displayBalance(currentAccount);
// dislayDashboard();

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  currentAccount = bank.acoounts.find(
    (acc) => acc.username === loginUsername.value
  );

  if (currentAccount?.pin === +loginPassword.value) {
    console.log(currentAccount);
    dislayDashboard();

    welcomeMessage.textContent = `Welcom ${currentAccount.owner
      .split(" ")
      .slice(0, 1)}`;

    updateUI(currentAccount);

    const currenDate = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    date.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(currenDate);
    console.log(currentAccount.balance);
    loginPassword.value = loginUsername.value = "";
  } else {
    alert("username or password is incorrect");
  }
});

/////////////////////////////////////
// TRANSFER BUTTON
const transferInput = document.querySelector("#transfer");
const transferAmount = document.querySelector("#transfer-amount");
const transferBtn = document.querySelector(".transfer-btn");

transferBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = +transferAmount.value;

  const receiverAccount = bank.acoounts.find(
    (acc) => acc.username === transferInput.value
  );

  if (amount > currentAccount.balance) {
    alert("insufficient funds");
  }
  if (!receiverAccount) {
    alert("user does not exist");
  }
  if (
    receiverAccount &&
    amount > 0 &&
    amount < currentAccount.balance &&
    receiverAccount.username !== currentAccount.username
  ) {
    const confirmPin = prompt("input pin for cofirm transaction");
    if (+confirmPin === currentAccount.pin) {
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);
      currentAccount.movementDates.push(new Date().toISOString());
      updateUI(currentAccount);
      receiverAccount.movementDates.push(new Date().toISOString());
      // console.log(receiverAccount);
      transferAmount.value = transferInput.value = "";
    } else {
      alert("incorrect pin! try again");
    }
  }
});
// console.log(new Date().toISOString());

welcomeMessage.addEventListener("click", function () {
  forms.forEach((form) => form.classList.remove("hidden"));
});

// ///////////////////////////////////////////
// LOAN EVENT HANDLERS AND VARIABLES
const loanBtn = document.querySelector(".loan-btn");
const loanInput = document.querySelector("#loan-amount");
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = +loanInput.value;
  console.log(loanAmount);

  if (
    currentAccount.movements.some((mov) => mov >= loanAmount / 2) &&
    loanAmount > 0
  ) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementDates.push(new Date().toISOString());
      updateUI(currentAccount);
      loanInput.value = "";
    }, 1500);
    // console.log("yes");
  } else {
    alert("cannot process loan at the moment");
  }
});

// ///////////////////////////////////////////////
// CLOSE ACCOUNT EVENT HANDLERS AND VARIABLES
const closeUsername = document.querySelector("#close-usernmae");
const closePin = document.querySelector("#close-pin");
const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === closeUsername.value &&
    currentAccount.pin === +closePin.value
  ) {
    const confirmCloseAccount = prompt(
      "please input you pin to confirm closure of account"
    );
    if (currentAccount.pin === +confirmCloseAccount) {
      console.log("correct");
      welcomeMessage.textContent = "Login to get started";
      // dislayDashboard();
      dashboard.classList.add("opacity-0");
      dateAndBalance.classList.add("opacity-0");
      forms.forEach((form) => form.classList.remove("opacity-0"));
    }
  }
});
