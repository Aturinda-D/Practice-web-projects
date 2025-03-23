const popup = document.querySelector(".popup");
const retry = document.getElementById("retry");
const container = document.getElementById("container");
const showAttempts = document.getElementById("attempts");
let attempts = 0;
let selected = [];
let found = 0;
const fruits = [
  "apple",
  "orange",
  "banana",
  "grapes",
  "pineapple",
  "watermelon",
  "strawberry",
  "avocado",
];
let randomizedFruits = [];

function checkMatch() {
  const item1 = selected[0].querySelector(".back img").alt;
  const item2 = selected[1].querySelector(".back img").alt;
  return item1 === item2 ? true : false;
}

function findAll(item, array) {
  let discovered = [];
  for (const element of array) {
    if (element === item) {
      discovered.push(element);
    }
  }
  return discovered;
}

while (randomizedFruits.length < 16) {
  const index = Math.floor(Math.random() * fruits.length);
  if (findAll(fruits[index], randomizedFruits).length < 2) {
    randomizedFruits.push(fruits[index]);
  }
}

for (const fruit of randomizedFruits) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.transform = "rotateY(0deg)";
  card.innerHTML = `
        <div class="face front">
            <h2><span class="material-icons">psychology</span></h2>
        </div>
        <div class="face back">
            <img src="../assets/${fruit}.png" alt="${fruit}"/>
        </div>
    `;
  container.appendChild(card);
  card.addEventListener("click", () => {
    switch (card.style.transform) {
      case "rotateY(0deg)":
        card.style.transform = "perspective(200px) rotateY(-180deg)";
        selected.push(card);
        break;
      default:
        card.style.transform = "rotateY(0deg)";
        selected.splice(selected.indexOf(card), 1);
        break;
    }
    if (selected.length >= 2 && checkMatch()) {
      found++;
      attempts++;
      showAttempts.innerHTML = attempts;
      if (found >= 8) {
        document.getElementById("accuracy").innerHTML = Math.round(
          (found * 100) / attempts
        );
        popup.style.visibility = "visible";
        popup.style.animation = "riseIn 1s ease-out";
      }
      selected.splice(0);
    } else if (selected.length >= 2) {
      attempts++;
      showAttempts.innerHTML = attempts;
      setTimeout(() => {
        for (item of selected) {
          item.style.transform = "rotateY(0deg)";
        }
        selected.splice(0);
      }, 1000);
    }
  });
}

retry.addEventListener("click", () => {
  window.location.reload();
});
