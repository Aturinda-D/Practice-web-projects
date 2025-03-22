let userInfo = JSON.parse(localStorage.getItem("user-account"));
const depositForm = document.querySelector(".deposit");
const withdrawForm = document.querySelector(".withdraw");

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
  const lastTransactionDate = document.getElementById("last-transaction-date");
  const lastTransactionTime = document.getElementById("last-transaction-time");
  const tableContent = document.querySelector(".tables table tbody");
  balanceDisplay.innerHTML = userInfo.balance.toLocaleString();
  transactionsDisplay.innerHTML = userInfo.transactionHistory.length;
  if (userInfo.transactionHistory.length > 0) {
    lastTransactionDate.innerHTML = userInfo.transactionHistory[0].date;
    lastTransactionTime.innerHTML = userInfo.transactionHistory[0].time;
    tableContent.innerHTML = "";
    for (const transaction of userInfo.transactionHistory) {
      const item = document.createElement("tr");
      item.innerHTML = `
      <td>${transaction.type}</td>
      <td>${transaction.amount.toLocaleString()}</td>
      <td>${transaction.date}</td>
      `;
      tableContent.appendChild(item);
    }
  }
}

if (window.location.pathname === "/Simple-banking-system/src/index.html") {
  const loginButton = document.querySelector("[type = 'submit']");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputs();
  });
} else if (
  window.location.pathname === "/Simple-banking-system/src/home/home.html"
) {
  const logoutButton = document.getElementById("logout");
  const depositButton = document.getElementById("deposit");
  const withdrawButton = document.getElementById("withdraw");

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
    if (deposit.value) {
      const amount = parseInt(deposit.value);
      const [date, time] = fetchDateTime();
      userInfo.balance += amount;
      userInfo.transactionCount++;
      userInfo.transactionHistory.unshift({
        type: "Deposit",
        amount: amount,
        date: date,
        time: time,
      });
      localStorage.setItem("user-account", JSON.stringify(userInfo));
      updateInfo();
      deposit.value = null;
    }
  });
  withdrawForm.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    const withdraw = document.getElementById("withdraw-amount");
    if (withdraw.value) {
      const amount = parseInt(withdraw.value);
      const [date, time] = fetchDateTime();
      if (amount <= userInfo.balance) {
        userInfo.balance -= amount;
        userInfo.transactionCount++;
        userInfo.transactionHistory.unshift({
          type: "Withdraw",
          amount: amount,
          date: date,
          time: time,
        });
        localStorage.setItem("user-account", JSON.stringify(userInfo));
        updateInfo();
        withdraw.value = null;
      }
    }
  });
  if (!userInfo) {
    const userInfo = {
      balance: 0,
      transactionHistory: [],
    };
    localStorage.setItem("user-account", JSON.stringify(userInfo));
  }
  updateInfo();
}
