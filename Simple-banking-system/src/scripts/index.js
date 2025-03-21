const loginButton = document.querySelector("[type = 'submit']");
const logoutButton = document.getElementById("logout");
const username = document.getElementById("username");
const password = document.getElementById("password");

const depositButton = document.getElementById("deposit");
const withdrawButton = document.getElementById("withdraw");
const depositForm = document.querySelector(".deposit");
const withdrawForm = document.querySelector(".withdraw");

// localStorage.setItem(
//   "user-account",
//   JSON.stringify({
//     balance: 25000,
//     transactionCount: 3,
//     transactionHistory: [
//       {
//         type: "Deposit",
//         amount: 30000,
//         date: "February 14th, 2025",
//       },
//       {
//         type: "Withdraw",
//         amount: 10000,
//         date: "March 3rd, 2025",
//       },
//       {
//         type: "Deposit",
//         amount: 5000,
//         date: "March 8th, 2025",
//       },
//     ],
//   })
// );
let userInfo = JSON.parse(localStorage.getItem("user-account"));

const checkInputs = () => {
  if (username.value && password.value) {
    window.location.href = "/Simple-banking-system/src/home/home.html";
  }
};

function toggleForm(button) {
  let form;
  let other;
  if (button.id === "deposit") {
    form = depositForm;
    other = withdrawForm;
  } else if (button.id === "withdraw") {
    form = withdrawForm;
    other = depositForm;
  }
  switch (form.style.display) {
    case "none":
      form.style.display = "block";
      other.style.display = "none";
      break;
    default:
      form.style.display = "none";
      break;
  }
}

function fetchDateTime() {
  return new Date()
    .toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })
    .split(" at ");
}

function updateInfo() {
  const userInfo = JSON.parse(localStorage.getItem("user-account"));
  const balanceDisplay = document.getElementById("account-balance");
  const transactionsDisplay = document.getElementById("num-of-transations");
  balanceDisplay.innerHTML = userInfo.balance.toLocaleString();
  transactionsDisplay.innerHTML = userInfo.transactionCount;
}

if (window.location.pathname === "/Simple-banking-system/src/index.html") {
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputs();
  });
} else if (
  window.location.pathname === "/Simple-banking-system/src/home/home.html"
) {
  logoutButton.addEventListener("click", () => {
    window.location.href = "/Simple-banking-system/src/index.html";
  });
  depositButton.addEventListener("click", (e) => {
    toggleForm(e.target);
  });
  withdrawButton.addEventListener("click", (e) => {
    toggleForm(e.target);
  });
  depositForm.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    const deposit = document.getElementById("deposit-amount");
    const amount = parseInt(deposit.value ? deposit.value : 0);
    userInfo.balance += amount;
    userInfo.transactionCount++;
    localStorage.setItem("user-account", JSON.stringify(userInfo));
    updateInfo();
    deposit.value = null;
  });
  withdrawForm.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    const withdraw = document.getElementById("withdraw-amount");
    const amount = parseInt(withdraw.value ? withdraw.value : 0);
    if (amount <= userInfo.balance) {
      userInfo.balance -= amount;
      userInfo.transactionCount++;
      localStorage.setItem("user-account", JSON.stringify(userInfo));
      updateInfo();
      withdraw.value = null;
    }
  });
  updateInfo();
}
