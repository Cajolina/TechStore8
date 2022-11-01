const cartTitle = document.createElement("h2")
cartTitle.innerHTML = "Kundvagn";
cartTitle.classList.add("titleincart")
const icon = document.createElement("i")
icon.setAttribute("class", "fa-solid fa-cart-shopping")
cartTitle.appendChild(icon)
cartTitle.insertAdjacentElement("afterBegin", icon);

const checkIcon = document.createElement("i")
checkIcon.setAttribute("class", "fa-solid fa-check");



const productContainer = document.createElement("div");
const mainCart = document.querySelector("main");
const cartNr = document.querySelector(".shoppingCount");
productContainer.className = "productContainer";
const totalPrice = document.createElement("h3");
const buy = document.createElement("button");
buy.classList.add("buybutton")
buy.innerHTML = `<a href="./purchaseMessage.html"><p>Slutför ditt köp</p></a>`;


mainCart.appendChild(productContainer);
mainCart.insertAdjacentElement("afterBegin", cartTitle)
mainCart.appendChild(totalPrice);
mainCart.appendChild(buy);

buy.insertAdjacentElement("afterBegin", checkIcon);


initSite()

function initSite() {
   getNumberOfItems();
   addProductsToWebpage();
   printPrice();
   showPurchaseBtn();
   
}

function addProductsToWebpage() {
if (!localStorage.getItem("shoppingcart")) {
   return
}
productContainer.innerHTML = "";
   const getProducts = JSON.parse(localStorage.getItem("shoppingcart")); 

for (const productCart of getProducts) {
const productDiv = document.createElement("div")

const imageCart = document.createElement("img")
imageCart.setAttribute("src", "/assets/" + productCart.image)
const title = document.createElement("h2")
title.innerText = productCart.title
const price = document.createElement("p")
price.innerText = productCart.price + " kr";

const removeBtn = document.createElement("button")
removeBtn.innerText = "Ta bort"
removeBtn.classList.add("remove-btn");


const removeIcon = document.createElement("i")
removeIcon.setAttribute("class", "fa-regular fa-trash-can");

removeBtn.insertAdjacentElement("afterBegin", removeIcon);

productDiv.appendChild(imageCart);
productDiv.appendChild(title);
productDiv.appendChild(price);
productDiv.appendChild(removeBtn);
productContainer.appendChild(productDiv);


removeBtn.addEventListener("click", () => {
   removeProduct(productCart);
});
}
}

function getNumberOfItems() {
   const shoppingCartArray = JSON.parse(localStorage.getItem("shoppingcart"));
   if (localStorage.getItem("shoppingcart")) {
   const numberOfItems = shoppingCartArray.length;
   cartNr.innerText = numberOfItems;
   }
}

function removeProduct (item) {
   const shoppingcartArray = JSON.parse(localStorage.getItem("shoppingcart"));
   const index = shoppingcartArray.findIndex(product=> product.title === item.title)
   shoppingcartArray.splice(index, 1);
   localStorage.setItem("shoppingcart", JSON.stringify(shoppingcartArray));
   console.log(item)
  
   
   
   addProductsToWebpage();
   getNumberOfItems();
   showPurchaseBtn();
   printPrice();
}

function printPrice() {
   if (localStorage.getItem("shoppingcart")) {
   const shoppingArray = JSON.parse(localStorage.getItem("shoppingcart"));
   const totalSum = shoppingArray.reduce(
      (total, item) => {
         return total + item.price
      }, 0);

      totalPrice.innerText = "Totalt pris: " + totalSum + " kr";
      // localStorage.setItem("totalsum", (totalSum));
      return totalSum
}
}


function showPurchaseBtn(){
   if (localStorage.getItem("shoppingcart")) {
   const shoppingCart = JSON.parse(localStorage.getItem("shoppingcart"));
   const nrOfItems = shoppingCart.length;  
if (nrOfItems > 0) { 
   
      buy.style.display = "flex";
   }  
   else {
      buy.style.display = "none";
   }
  
} else {
      buy.style.display = "none";
   }
}


buy.addEventListener("click", buyBtn);

function buyBtn() {
   const shoppingCart = JSON.parse(localStorage.getItem("shoppingcart"));
   const loggedInUser = localStorage.getItem("userloggedin");
   // const totalSum = localStorage.getItem("totalsum");
   const boughtProducts = {
      products: shoppingCart,
      total: printPrice(),
      user: loggedInUser
   }
   if(!localStorage.getItem("orders")) {
      localStorage.setItem("orders", JSON.stringify([boughtProducts]));
   }  else {
      const orders = JSON.parse(localStorage.getItem("orders"));
      orders.push(boughtProducts);
      localStorage.setItem("orders", JSON.stringify(orders));
   }

   localStorage.removeItem("shoppingcart");
}





























/*const yihashoppingcart = JSON.parse(localStorage.getItem("shoppingcart"));

   if(localStorage.getItem("ordersLS")) {
      const orders = JSON.parse(localStorage.getItem("ordersLS"));
      orders.push(yihashoppingcart)
      localStorage.setItem("ordersLS", JSON.stringify(orders))


   } else {
      localStorage.setItem("ordersLS", JSON.stringify(yihashoppingcart));
     
   }
      const userloggedin = localStorage.getItem("userloggedin");
      localStorage.setItem(userloggedin, JSON.stringify(yihashoppingcart));
      const tva = JSON.parse(localStorage.getItem(userloggedin));
      tva.push(yihashoppingcart)
      localStorage.setItem(userloggedin, JSON.stringify(tva))
   
   /*if(localStorage.getItem("userloggedin")) {
      const userNloggedin = JSON.parse(localStorage.getItem("userloggedin"));
      localStorage.setItem(userNloggedin,"");
      const tva = JSON.parse(localStorage.getItem(userNloggedin));
      tva.push(yihashoppingcart)
      localStorage.setItem(userNloggedin, JSON.stringify(tva))
   }
   

   localStorage.removeItem("shoppingcart");*/   
   /*
for (let x of users) {
      if(user.value === x.userName && word.value === x.passWord) {
          
          localStorage.setItem("userloggedin", x.userName); + orders + orders-price
  
          rightuser(); -kvittosida för inloggad

      else { if ingen användare kör functionen - kvittosida för ej inloggad}



   rightuser() {
      Fredrik - vem va det som loggade in. - spara den ordern i den användaren. 
      const låda = x.username + localstorage order. 
   }*/

   /*const storage = JSON.parse(localStorage.getItem("orders"));

  storage.push([])*/


//createElement("p")
//innerText: orders + totalprice + user

/*buy.addEventListener("click", pressbutton);
localStorage.setItem("orders", "");

function checkoutbutton(){
   const horseteeth = JSON.parse(localStorage.getItem("shoppingcart"));
   let order = {
      title: title.value
      ,
      price: price.value
   }

      horseteeth.push(order)
      localStorage.setItem("shoppingcart", JSONstringify(horseteeth));
      localStorage.setItem("orders", order.title);

     // Kör en funktion till kvittosidan

}


   /*function checkOutBtn (){
      buy.innerText = "Gå igenom med köp";
      buy.addEventListener("click", purchase);
   }
 

function purchase () {
   const hoppla = JSON.parse(localStorage.getItem("shoppingcart"));
  
   mainCart.appendChild(buy);
   localStorage.removeItem("shoppingcart");
   //localStorage.setItem("Nykey")
}*/

