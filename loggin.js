// Här är struktur på alla uppgifter jag vill hämta från HTML

const form = document.querySelector(".form");
const username = document.querySelector(".loginContainer");
const user = document.querySelector(".user");
const password = document.querySelector(".password");
const word = document.querySelector(".word");
const loginBtn = document.querySelector(".button");
const logoutbutton = document.querySelector(".logout");
const main = document.querySelector("main");
const headlinemain = document.querySelector("main h2");
const paragraphmain = document.querySelector("main p");
const moreusers = document.querySelector(".createContainer");
const newusername = document.querySelector(".newusername");
const newuserpassword = document.querySelector(".newuserpassword");
const createBtn = document.querySelector(".createBtn");
const shopBtn = document.querySelector(".shoplink p")

let orderhistory;
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
        printOrderHistory()
    }
}

start()

loginBtn.addEventListener("click", control);
logoutbutton.addEventListener("click", logout);
createBtn.addEventListener("click", addnew);

// Här skapas min kontroll av lösen/användarnamn. Det görs genom en funktion, samt if/else.

function control(e) {
    e.preventDefault()
    users = JSON.parse(localStorage.getItem("storage"))
    for (let x of users) {
    if(user.value === x.userName && word.value === x.passWord) {
    
        localStorage.setItem("userloggedin", x.userName);
        printOrderHistory();
    
    return
    } 
}

wronguser();
}

// Här är en funktion med vad som ska hända om användarnamnet är godkänt.

//if(!orderhistory){
//console.log("hejsan");
//}



function printOrderHistory() {
    const orderHistoryContainer = document.createElement("div");
    orderHistoryContainer.classList.add("orderContainer");
    const userloggedin = localStorage.getItem("userloggedin")
    headlinemain.innerText = "Välkommen " + userloggedin;
    form.style.display = "none";
    moreusers.style.display = "none";
    paragraphmain.style.display = "none";
    logoutbutton.style.display = "block";
    shopBtn.style.display = "block";


    // Gör också en if - om INTE order finns. 
    if (localStorage.getItem("orders")) {
    const orderList = JSON.parse(localStorage.getItem("orders"));
    orderhistory = orderList.filter((order) => order.user === userloggedin)
     

    if (orderhistory.length <= 0) {
        orderHistoryContainer.innerHTML = "";
    } else {
    headlinemain.innerText = userloggedin + " Orderhistorik";
    for (const orders of orderhistory) {
    for (const product of orders.products) {
    const titleOfProduct = document.createElement("h3");
    titleOfProduct.innerText = "Produkt: " + product.title;
    main.appendChild(orderHistoryContainer);
    orderHistoryContainer.appendChild(titleOfProduct);
    }

    const price = document.createElement("p");
    price.innerText = "Pris: " + orders.total;
    main.appendChild(orderHistoryContainer);
    orderHistoryContainer.appendChild(price);
    }
}
}
    } 

     //console.log(orderhistory.user)
   //} 
//}  


function addnew(e) {
    e.preventDefault()
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
    printOrderHistory();
}

// Här är en funktion med vad som ska hända om användarnamnet är fel.

function wronguser() {
    paragraphmain.style.display = "block";
    headlinemain.innerText = "Försök igen.";
    paragraphmain.innerText = "Du har skrivit fel lösenord eller användarnamn.";
}

// Här är logga ut sidan

function logout(e) {
    e.preventDefault();
    headlinemain.innerText = "Hej då.";
    paragraphmain.innerText = "Du har loggat ut.";
    moreusers.style.display = "block";
    form.style.display = "block";
    logoutbutton.style.display = "none";
    shopBtn.style.display = "none";
    user.value = "";
    word.value = "";
    newusername.value = "";
    newuserpassword.value = "";
    localStorage.removeItem("userloggedin");
    const orderHistoryContainer = document.querySelector(".orderContainer");
    if (orderHistoryContainer) {
        orderHistoryContainer.remove();
    }
}

// Här kommer kod för localstorage
