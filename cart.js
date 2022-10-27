//var listOfProducts;
const productContainer = document.createElement("div");
const mainCart = document.querySelector("main");
const cartNr = document.querySelector(".shoppingCount");
productContainer.className = "productContainer";
const totalPrice = document.createElement("h3");
const buy = document.createElement("button");
buy.innerHTML = `<div class="checkout"><a href="./receipt.html"><p>Slutför ditt köp</p></a></div>`;
  
mainCart.appendChild(productContainer);
mainCart.appendChild(totalPrice);
mainCart.appendChild(buy);


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
   purchaseButton();
   printPrice();
}

function printPrice() {
   const shoppingArray = JSON.parse(localStorage.getItem("shoppingcart"));
   const totalSum = shoppingArray.reduce(
      (total, item) => {
         return total + item.price
      }, 0);

      totalPrice.innerText = "Totalt pris: " + totalSum + " kr";
}

function purchaseButton(){
   const hoppla = JSON.parse(localStorage.getItem("shoppingcart"));
   const nrOfItems = hoppla.length;
   if (nrOfItems > 0) { 
      buy.style.display = "block";
   } else {
      buy.style.display = "none";
   }
}

buy.addEventListener("click", buyBtn);

function buyBtn() {
   const yiha = JSON.parse(localStorage.getItem("shoppingcart"));
   localStorage.removeItem("shoppincart");

}

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

