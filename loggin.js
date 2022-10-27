// Här är struktur på alla uppgifter jag vill hämta från HTML

const form = document.querySelector(".form");
const username = document.querySelector(".loginContainer");
const user = document.querySelector(".user");
const password = document.querySelector(".password");
const word = document.querySelector(".word");
const loginBtn = document.querySelector(".button");
const logoutbutton = document.querySelector(".logout");
const headlinemain = document.querySelector("main h2");
const paragraphmain = document.querySelector("main p");
const moreusers = document.querySelector(".createContainer");
const newusername = document.querySelector(".newusername");
const newuserpassword = document.querySelector(".newuserpassword");
const createBtn = document.querySelector(".createBtn");


// Här kommer min information som skall hämtas och är sparad i lådor. Variabler.

let users = [
    {
        userName: "Fredrik",
        passWord: "123",
    },
]

if (!localStorage.getItem("storage")) {
    localStorage.setItem("storage", JSON.stringify(users))
}

// Här är mina kommandon för att säga åt webbläsare att något ska hända.

function start() 
{
    if(localStorage.getItem("userloggedin"))
    {
        rightuser()
    }
}

start()

loginBtn.addEventListener("click", control);
logoutbutton.addEventListener("click", logout);
createBtn.addEventListener("click", addnew);

// Här skapas min kontroll av lösen/användarnamn. Det görs genom en funktion, samt if/else.

function control() {
    users = JSON.parse(localStorage.getItem("storage"))
    for (let x of users) {
    if(user.value === x.userName && word.value === x.passWord) {
        
        localStorage.setItem("userloggedin", x.userName);

        rightuser();

    return
    } 
}

wronguser();
}

// Här är en funktion med vad som ska hända om användarnamnet är godkänt.

function rightuser() {
    const userloggedin = localStorage.getItem("userloggedin")
    form.style.display = "none";
    moreusers.style.display = "none";
    headlinemain.innerText = "Välkommen " + userloggedin;
    paragraphmain.innerText = "Du har lyckats att logga in";
    logoutbutton.style.display = "block";
}

// Här är kod för nya användare

function addnew() {
    const storage = JSON.parse(localStorage.getItem("storage"))
    let addnewuser = {
        userName: newusername.value
        ,
        passWord: newuserpassword.value
    }

    storage.push(addnewuser)

    moreusers.style.display = "none";
    form.style.display = "none";
    headlinemain.innerText = "Välkommen " + addnewuser.userName;
    paragraphmain.innerText = "Du har lyckats att logga in";
    logoutbutton.style.display = "block";
    localStorage.setItem("storage", JSON.stringify(storage));
    localStorage.setItem("userloggedin", addnewuser.userName);
    rightuser()
}

// Här är en funktion med vad som ska hända om användarnamnet är fel.

function wronguser() {
    headlinemain.innerText = "Försök igen.";
    paragraphmain.innerText = "Du har skrivit fel lösenord eller användarnamn.";
}

// Här är logga ut sidan

function logout() {
    headlinemain.innerText = "Hej då.";
    paragraphmain.innerText = "Du har loggat ut.";
    moreusers.style.display = "block";
    form.style.display = "block";
    logoutbutton.style.display = "none";
    user.value = "";
    word.value = "";
    newusername.value = "";
    newuserpassword.value = "";
    localStorage.removeItem("userloggedin");
}

// Här kommer kod för localstorage
