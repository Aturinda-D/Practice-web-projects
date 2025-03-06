const deleteButtons = document.getElementsByClassName("delete-button");
const editButtons = document.getElementsByClassName("edit-button");
let taskItems = JSON.parse(localStorage.getItem("tasks"));


const editTask = (e) => {
    const editButton = e.target.closest(".edit-button");
    if (editButton){
        const todoItem = editButton.closest(".todo-item");
        const span = todoItem.querySelector("span");
        const dataId = parseInt(todoItem.getAttribute("data-id"));
        const input = document.createElement('input');
        input.type = "text";
        input.value = span.textContent;
        input.className = "edit-input";
        todoItem.replaceChild(input, span);
        todoItem.style.paddingLeft = "0";
        input.focus();
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText.length != 0) {
                span.textContent = newText;
                todoItem.style.paddingLeft = "20px";
                todoItem.replaceChild(span, input);
                span.style.opacity = "1";
                taskIndex = taskItems.findIndex(task => task.id === dataId);
                if (taskIndex !== -1) {
                    taskItems[taskIndex].text = newText;
                    localStorage.setItem("tasks", JSON.stringify(taskItems));
                }
            } else {
                todoItem.replaceChild(span, input);
                span.style.opacity = "1";
            }
        };
        input.addEventListener('blur', saveEdit);
    }
}

const deleteTask = (e) => {
    const deleteButton = e.target.closest(".delete-button");
    if (deleteButton) {
        const todoItem = deleteButton.closest(".todo-item");
        const dataId = parseInt(todoItem.getAttribute("data-id"));
        taskItems = taskItems.filter(todo => todo.id !== dataId);
        localStorage.setItem("tasks", JSON.stringify(taskItems));
        updateTaskList();
    }
    // document.getElementById("todo-items").removeChild(task);
}

const updateTaskList = () => {
    const taskContainer = document.getElementById("todo-items");
    taskContainer.innerHTML = '';
    for (task of taskItems) {
        const todoItem = document.createElement('div');
        todoItem.className = "todo-item";
        todoItem.innerHTML = `
        <span>${task.text}</span>
        <div class="todo-item-modify">
            <button class="edit-button"><span class="material-icons">edit</span></button>
            <button class="delete-button"><span class="material-icons">delete</span></button>
        </div>
        `;
        taskContainer.appendChild(todoItem);
        todoItem.setAttribute('data-id', task.id)
        todoItem.addEventListener("click", ()=>{
            toggleModifyDialogue(checkSelected(taskContainer.children), todoItem.children[0], todoItem.children[1]);
        });
        const modifyDialogue = todoItem.children[1];
        for (const button of modifyDialogue.children) {
            if (button.className === "delete-button") {
                button.addEventListener('click', (e)=>{
                    deleteTask(e);
                })
            } else if (button.className === "edit-button") {
                button.addEventListener('click', (e)=>{
                    editTask(e);
                })
            }
        }
    }
    document.querySelector(".analytics p > span").innerHTML = taskItems.length;
}

const checkSelected = (taskItems) => {
    for (const item of taskItems) {
        if (item.children[1].style.width === "100px") {
            return item;
        }
    }
    return false;
}

const toggleModifyDialogue = (selected, itemText, modifyDialogue) => {
    if (!selected || selected.children[0] == itemText) {
        switch (modifyDialogue.style.width) {
            case "100px":
                itemText.style.opacity = "1";
                modifyDialogue.style.width = "0";
                break;
                default:
                    itemText.style.opacity = "0.5";
                    modifyDialogue.style.width = "100px";
                    break;
                }
            } else {
                selected.children[0].style.opacity = "1";
                selected.children[1].style.width = "0";
                itemText.style.opacity = "0.5";
                modifyDialogue.style.width = "100px";
            }
        };
        
        
document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.getElementById("new-task").value) {
        taskItems.push({
            id: taskItems.length,
            text: document.getElementById("new-task").value
        })
        localStorage.setItem("tasks", JSON.stringify(taskItems));
        updateTaskList();
        document.getElementById("new-task").value = "";
    }
});
        
document.getElementById("clear-all").addEventListener('click', ()=>{
    taskItems = [{
        id: 0,
        text: "Add your first task!"
    }]
    localStorage.setItem("tasks", JSON.stringify(taskItems));
    updateTaskList();
})


updateTaskList();
