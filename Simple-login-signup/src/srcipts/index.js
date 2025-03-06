const hideShowBtn = document.getElementById("hideShow");
const passwordField = document.getElementById("password-field");
const pathname = window.location.pathname;
let users = JSON.parse(localStorage.getItem('users'))


function togglePassword() {
    /**
     * The following code demonstrates a shorthand for accessing attribute values of elements.
     * This follows the syntax: element.attribute 
     * This replaces the usual element.getAttribute('attribute')
     */
    // const text = hideShowBtn.getAttribute('value'); 
    const text = hideShowBtn.value;
    console.log(text);
       
    switch (text) {
        case "show":
            // hideShowBtn.setAttribute('value', 'hide');
            hideShowBtn.value = 'hide';
            // passwordField.setAttribute('type', 'text');
            passwordField.type = 'text';
            break;
        default:
            hideShowBtn.setAttribute('value', 'show');
            passwordField.setAttribute('type', 'password');
            break;
    }
}

function handleLoginFormSubmission(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll("input");
    let person = {};
    inputs.forEach(input => {
        if (input.name === 'username'){
            person["username"] = input.value;
        } else if (input.name === 'password') {
            person["password"] = input.value;
        }
    });
    if ((person["username"] in users) && (person["password"] === users[person["username"]])){
        console.log("User verified!"); 
    } else if ((person["username"] in users) && (person["password"] !== users[person["username"]])){
        alert("Password is incorrect!");
    } else if (!(person["username"] in users)){
        alert("User not found!\nMaybe signup instead?");
    }
}

function handleRegisterFormSubmission (e) {
    e.preventDefault();
    const inputs = document.querySelectorAll('input');
    let person = {};
    inputs.forEach(input => {
        if (input.name === 'username' && !(input.value in users)){
            person['username'] = input.value;
            // Below is an alternative to using (key in object) notation
        } else if (input.name === 'username' && (Object.keys(users).includes(input.value))){
            alert(`User \'${input.value}\' already exists!`);
        } else if (input.name === 'password' && input.value.length >= 8){
            person['password'] = input.value;
        } else if (input.name === 'password' && input.value.length < 8){
            input.value = "";
            alert("Password must be atleast 8 characters long");
        }
    });
    if (person["username"] && person["password"]) {
    users[person["username"]] = person["password"];
    localStorage.setItem("users", JSON.stringify(users));
    }
}

if (pathname === '/Simple-login-signup/src/index.html'){
    hideShowBtn.addEventListener('click', ()=>{
        togglePassword()
    });
    document.querySelector("form").addEventListener('submit', (e)=>{
        handleLoginFormSubmission(e);
        // "e" is a special character representing the general event. One is free to use "event" in its place
    })
} else if (pathname === '/Simple-login-signup/src/signup/signup.html') {
    hideShowBtn.addEventListener('click', togglePassword);
    document.querySelector("form").addEventListener("submit", (e) => {handleRegisterFormSubmission(e)});
}
