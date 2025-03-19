const container = document.getElementById("container");
const showAttempts = document.getElementById("attempts");
let attempts = 0;
let visible = [];

for (let i=1; i<=16; i++) {
    const card = document.createElement('div');
    card.className = "card";
    card.style.transform = "rotateY(0deg)";
    card.innerHTML = `
        <div class="face front">
            <h2>FRONT</h2>
        </div>
        <div class="face back">
            <h2>BACK</h2>
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
