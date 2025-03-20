const container = document.getElementById("container");
const showAttempts = document.getElementById("attempts");
let attempts = 0;
let visible = [];
const fruits = ['apple', 'orange', 'banana', 'grapes', 'pineapple', 'watermelon', 'strawberry', 'avocado'];
let randomizedFruits = [];

function findAll(item, array) {
    let discovered = [];
    for (const element of array) {
        if (element===item) {
            discovered.push(element);
        }
    }
    return discovered;
}

while (randomizedFruits.length < 16) {
    const index = Math.floor(Math.random()*fruits.length);
    if (findAll(fruits[index], randomizedFruits).length<2) {
        randomizedFruits.push(fruits[index]);
    }
}

for (const fruit of randomizedFruits) {
    const card = document.createElement('div');
    card.className = "card";
    card.style.transform = "rotateY(0deg)";
    card.innerHTML = `
        <div class="face front">
            <h2>FRONT</h2>
        </div>
        <div class="face back">
            <img src="../assets/${fruit}.png" alt="${fruit}"/>
        </div>
    `;
    container.appendChild(card);
    card.addEventListener('click', ()=>{
        switch (card.style.transform) {
            case "rotateY(0deg)":
                card.style.transform = "perspective(200px) rotateY(-180deg)";
                visible.push(card);
                break;
            default:
                card.style.transform = "rotateY(0deg)";
                visible.splice(visible.indexOf(card), 1);
                break;
        }
        if (visible.length >= 2) {
            attempts++;
            showAttempts.innerHTML = attempts;
            setTimeout(()=>{
                for (item of visible) {
                    item.style.transform = "rotateY(0deg)";
                }
                visible.splice(0);
            }, 1000);
        }
    });
}
