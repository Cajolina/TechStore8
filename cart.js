const cartTitle = document.createElement("h2")
cartTitle.innerHTML = "Kundvagn";
//const icon = document.createElement("i")
//icon.classList.add("fa-solid fa-cart-shopping")

const productContainer = document.createElement("div");
const mainCart = document.querySelector("main");
const cartNr = document.querySelector(".shoppingCount");
productContainer.className = "productContainer";
const totalPrice = document.createElement("h3");
const buy = document.createElement("button");
buy.classList.add("buybutton")
buy.innerHTML = `<div class="checkout"><a href="./receipt.html"><p>Slutför ditt köp</p></a></div>`;
productContainer.appendChild(cartTitle)
mainCart.appendChild(productContainer);
mainCart.appendChild(totalPrice);
mainCart.appendChild(buy);
//cartTitle.appendChild(icon)


initSite()

function initSite() {
   getStorage();
   addProductsToWebpage();
   printPrice();
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
price.innerText = productCart.price
const removeBtn = document.createElement("button")
removeBtn.innerText = "Ta bort"
removeBtn.classList.add("remove-btn");


//const removeIcon = document.createElement("i")
//removeIcon.innerText = 


productDiv.appendChild(imageCart)
productDiv.appendChild(title)
productDiv.appendChild(price)
productDiv.appendChild(removeBtn)
productContainer.appendChild(productDiv)
//removeBtn.appendChild(removeIcon)

removeBtn.addEventListener("click", () => {
   removeButton(productCart);
});
}
}

function getStorage() {
   const horse = JSON.parse(localStorage.getItem("shoppingcart"));
   if (localStorage.getItem("shoppingcart")) {
   const numberOfItems = horse.length;
   cartNr.innerText = numberOfItems;
   }
}

function removeButton (hej) {
   const ponny = JSON.parse(localStorage.getItem("shoppingcart"));
   const index = ponny.findIndex(product=> product.title === hej.title)
   ponny.splice(index, 1);
   localStorage.setItem("shoppingcart", JSON.stringify(ponny));
  
   
   
   addProductsToWebpage();
   getStorage();
   showPurchaseBtn();
   printPrice();
}

function printPrice() {
   const shoppingArray = JSON.parse(localStorage.getItem("shoppingcart"));
   const totalSum = shoppingArray.reduce(
      (total, item) => {
         return total + item.price
      }, 0);

      totalPrice.innerText = "Totalt pris: " + totalSum + " kr";
      // localStorage.setItem("totalsum", (totalSum));
      return totalSum
}

function showPurchaseBtn(){
   const shoppingCart = JSON.parse(localStorage.getItem("shoppingcart"));
   const nrOfItems = shoppingCart.length;
   if (nrOfItems > 0) { 
      buy.style.display = "block";
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

