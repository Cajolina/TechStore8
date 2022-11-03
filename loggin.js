const cartNr = document.querySelector(".shoppingCount");
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

let users = [
    {
        userName: "Fredrik",
        passWord: "123",
    },
]

if (!localStorage.getItem("storage")) {
    localStorage.setItem("storage", JSON.stringify(users))
}

function initSite() {
    if(localStorage.getItem("userloggedin"))
    {
        printOrderHistory();
    }
    getNumberOfItems();
}

initSite()

function getNumberOfItems() {
    const shoppingCartArray = JSON.parse(localStorage.getItem("shoppingcart"));
    if (localStorage.getItem("shoppingcart")) {
       const numberOfItems = shoppingCartArray.length;
       cartNr.innerText = numberOfItems;
    }
 }

loginBtn.addEventListener("click", controlUser);
logoutbutton.addEventListener("click", logout);
createBtn.addEventListener("click", addNewUser);

function controlUser(e) {
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

    if (localStorage.getItem("orders")) {
        const orderList = JSON.parse(localStorage.getItem("orders"));
        orderhistory = orderList.filter((order) => order.user === userloggedin)
     
    if (orderhistory.length <= 0) {
        orderHistoryContainer.innerHTML = "";
    } else {
        headlinemain.innerText = userloggedin + " Orderhistorik";
    for (const orders of orderhistory) {
        for (const product of orders.products) {
            const titleOfProduct = document.createElement("p");
            titleOfProduct.innerText = "Produkt: " + product.title;
            main.appendChild(orderHistoryContainer);
            orderHistoryContainer.appendChild(titleOfProduct);
        }
        const price = document.createElement("h3");
        price.innerText = "Pris: " + orders.total;
        main.appendChild(orderHistoryContainer);
        orderHistoryContainer.appendChild(price);
    }
    }
    }
} 

function addNewUser(e) {
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

function wronguser() {
    paragraphmain.style.display = "block";
    headlinemain.innerText = "Försök igen.";
    paragraphmain.innerText = "Du har skrivit fel lösenord eller användarnamn.";
}

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