const loginButton = document.querySelector("[type = 'submit']");
const logoutButton = document.getElementById("logout");
const username = document.getElementById("username");
const password = document.getElementById("password");

const depositButton = document.getElementById("deposit");
const withdrawButton = document.getElementById("withdraw");
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
}
