// forms variable declarations
const viewPassword = document.querySelector(".view-password");
const hidePassword = document.querySelector(".hide-password");
const passwordInput = document.querySelector(".password");
const viewPasswordSignUp = document.querySelector(".view-password-signup");
const hidePasswordSignUp = document.querySelector(".hide-password-signup");
const passwordInputSignUp = document.querySelector(".password-signup");
const forms = document.querySelectorAll(".forms");
const signUpForm = document.querySelector(".sign-up");
const SignUpName = document.querySelector("#fullname");
const initialDeposit = document.querySelector("#initial-deposit");
const newPassowrd = document.querySelector("#create-password");
const changeForm = document.querySelectorAll(".change-form");

// //////////////////////////////////
// dashboard variable declarations
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

// login event handler
const summaryIn = document.querySelector(".summary-in");
const summaryOut = document.querySelector(".summary-out");
const summaryInterest = document.querySelector(".summary-interest");

// TRANSFER BUTTON
const transferInput = document.querySelector("#transfer");
const transferAmount = document.querySelector("#transfer-amount");
const transferBtn = document.querySelector(".transfer-btn");

// CLOSE ACCOUNT EVENT HANDLERS AND VARIABLES
const closeUsername = document.querySelector("#close-usernmae");
const closePin = document.querySelector("#close-pin");
const closeBtn = document.querySelector(".close-btn");
// console.log(movementSummary);

const logo = document.querySelector(".logo");
logo.addEventListener("click", function () {
  const pin = prompt("input pin to confirm logout");
  currentAccount.pin === pin ? logout() : alert("incorrect pin! Try again");
});

// //////////////////////////////////////////
// SWITCH BETWEEN SIGN UP AND SIGN IN FORM
changeForm.forEach((change) =>
  change.addEventListener("click", function (e) {
    e.preventDefault();
    forms.forEach((form) => form.classList.toggle("fade-in"));
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
    locale,
    currencyRatio
  ) {
    this.owner = owner;
    this.movements = movements;
    this.pin = pin;
    this.interestRates = interestRates;
    this.movementDates = movementDates;
    this.currency = currency;
    this.locale = locale;
    this.currencyRatio = currencyRatio;
  }
}

// //////////////////////////
// BANK CLASS ALSO CONTAINING CREATE ACCOUNT FUNCTION
class Bank {
  constructor() {
    this.acoounts = [];
  }

  addAccounts(
    owner,
    movements,
    pin,
    interestRates,
    currency,
    locale,
    currencyRatio
  ) {
    const account = new BankAccount(
      owner,
      movements,
      pin,
      interestRates,
      [],
      currency,
      locale,
      currencyRatio
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
  "1111",
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
  "en-US",
  0.9
);

bank.addAccounts(account1);
// console.log(bank);

const account2 = new BankAccount(
  "Destiny Oliseyenum",
  [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  "2222",
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
  "pt-PT",
  1
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

let currentAccount, timer;

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

// ///////////////
// CURRENCY FORMATTING
const formatCur = function (locale, currency, value) {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const logout = function () {
  welcomeMessage.textContent = "Login to get started";
  // dislayDashboard();
  dashboard.classList.add("opacity-0");
  dateAndBalance.classList.add("opacity-0");
  forms.forEach((form) => form.classList.remove("hidden"));
};

// //////////////////////////////
// SETTTING LOGOUT TIMER AND FUNCTION
const logoutTimer = document.querySelector(".logout-timer");

const setLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    logoutTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      logout();
    }
    {
      time--;
    }
  };
  let time = 200;
  tick();

  const timer = setInterval(tick, 1000);

  return timer;
};

// ////////////////////////////////
// DISPLAY MOVEMENTS FUNCTION
const displayMovements = function (account, sort = false) {
  movementSummary.innerHTML = "";
  const sortedMov = account.movements.slice().sort((a, b) => a - b);
  const moves = sort ? sortedMov : account.movements;

  moves.forEach(function (mo, i) {
    const type = mo > 0 ? `deposit` : `withdrawal`;

    const rawDate = new Date(account.movementDates[i]);
    const date = formattedDate(rawDate, account.locale);
    const formattedCur = formatCur(account.locale, account.currency, mo);

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
      <p class="text-xl text-gray-700">${formattedCur}</p>
    </div>
  `;

    movementSummary.insertAdjacentElement("afterbegin", html);
  });
};

// /////////////////////////////////
// display Balance FUNCTION
const displayBalance = function (account) {
  account.balance = account.movements.reduce((mov, cur) => (mov += cur));
  balance.textContent = `${formatCur(
    account.locale,
    account.currency,
    account.balance
  )}`;
};

const updateUI = function (account) {
  displayBalance(account);
  displayMovements(account);
  displaySummary(account);
};

// ////////////////////////
// login event handler

const displaySummary = function (account) {
  // incomes
  const income = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => (acc += cur));
  summaryIn.textContent = `${formatCur(
    account.locale,
    account.currency,
    income
  )}`;

  // expenditures
  const expenseArray = account.movements.filter((mov) => mov < 0);
  if (expenseArray.length < 1) {
    summaryOut.textContent = `${formatCur(
      account.locale,
      account.currency,
      Math.abs(expenseArray)
    )}`;
  } else {
    const expense = expenseArray.reduce((acc, cur) => (cur += acc));
    summaryOut.textContent = `${formatCur(
      account.locale,
      account.currency,
      Math.abs(expense)
    )}`;
  }

  // interests
  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => mov * (account.interestRates / 100))
    .filter((int) => int > 1)
    .reduce((acc, cur) => (acc += cur));
  summaryInterest.textContent = `${formatCur(
    account.locale,
    account.currency,
    interest
  )}`;
};

const dislayDashboard = function () {
  dashboard.classList.remove("opacity-0");
  dateAndBalance.classList.remove("opacity-0");
  forms.forEach((form) => form.classList.add("hidden"));
};

// currentAccount = account1;
// displayMovements(currentAccount);
// displayBalance(currentAccount);
// dislayDashboard();

//
// EVENT HANDLERS
// //////////////////////////////
// LOGIN FORM EVENR HANDLER
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  currentAccount = bank.acoounts.find(
    (acc) => acc.username === loginUsername.value
  );

  if (currentAccount?.pin === loginPassword.value) {
    alert(
      "IMPORTANT NOTICE: You can make transfers to either of these accounts ('fortune18' or 'destiny18' )"
    );
    // console.log(currentAccount);
    dislayDashboard();

    welcomeMessage.textContent = `Welcome ${currentAccount.owner
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
    loginPassword.value = loginUsername.value = "";
  } else {
    alert("username or password is incorrect");
  }
  if (timer) {
    clearInterval(timer);
  }
  timer = setLogoutTimer();
});

/////////////////////////////////////
// TRANSFER BUTTON HANDLERS

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
    alert(
      `User does not exist
you can make transfers to the following account
'fortune18' or 'destiny18`
    );
  }
  if (
    receiverAccount &&
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAccount.username !== currentAccount.username
  ) {
    const confirmPin = prompt("input pin for cofirm transaction");
    if (confirmPin === currentAccount.pin) {
      currentAccount.movements.push(-amount);
      if (currentAccount.currencyRatio === receiverAccount.currencyRatio) {
        receiverAccount.movements.push(amount);
      }
      if (currentAccount.currencyRatio > receiverAccount.currencyRatio) {
        receiverAccount.movements.push(amount / receiverAccount.currencyRatio);
      }
      if (currentAccount.currencyRatio < receiverAccount.currencyRatio) {
        receiverAccount.movements.push(amount * currentAccount.currencyRatio);
      }

      currentAccount.movementDates.push(new Date().toISOString());
      updateUI(currentAccount);
      receiverAccount.movementDates.push(new Date().toISOString());
      transferAmount.value = transferInput.value = "";
      setTimeout(() => {
        alert(
          `click the logo icon to logout and login to ${receiverAccount.username} using ${receiverAccount.pin} as password to view your recent transactions! please do this without refreshing your browser as you details are not stored in any database`
        );
      }, 1200);
    } else {
      alert("incorrect pin! try again");
    }
  }

  clearInterval(timer);
  timer = setLogoutTimer();
});

// ///////////////////////////////////////////
// LOAN EVENT HANDLERS AND VARIABLES
const loanBtn = document.querySelector(".loan-btn");
const loanInput = document.querySelector("#loan-amount");
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = +loanInput.value;

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
  } else {
    alert("cannot process loan at the moment");
  }
  clearInterval(timer);
  timer = setLogoutTimer();
});

// ///////////////////////////////////////////////
// CLOSE ACCOUNT EVENT HANDLERS AND VARIABLES

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === closeUsername.value &&
    currentAccount.pin === closePin.value
  ) {
    const confirmCloseAccount = prompt(
      "please input you pin to confirm closure of account"
    );
    if (currentAccount.pin === confirmCloseAccount) {
      // console.log("correct");

      const index = bank.acoounts.findIndex(
        (acc) => acc.username === currentAccount.username
      );
      bank.acoounts.splice(index, 1);
      logout();
    }
  }
});

// SORTING MOVEMENTS
const btnSort = document.querySelector(".btn-sort");
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const locale = document.querySelector("#locale").value;
  const userCurrency = document.querySelector("#user-currency").value;
  const name = SignUpName.value;
  const deposit = Number(initialDeposit.value);
  const password = newPassowrd.value;

  const nameCheck = name.split(" ");
  let curRatio;

  if (nameCheck.length > 1 && userCurrency && password && deposit && locale) {
    if (userCurrency === "USD") {
      curRatio = 0.9;
    }
    if (userCurrency === "EUR") {
      curRatio = 1;
    }
    if (userCurrency === "NGN") {
      curRatio = 0.002;
    }
    const account = new BankAccount(
      name,
      [deposit],
      password,
      1.2,
      [new Date().toISOString()],
      userCurrency,
      locale,
      curRatio
    );
    bank.addAccounts(account);
    creatUserName(bank.acoounts);
    // console.log(bank.acoounts);
    alert(`Your username is ${account.username}`);
    forms.forEach((form) => form.classList.toggle("fade-in"));
  } else {
    alert("error! please make sure all forms are filled corectly");
  }
});
