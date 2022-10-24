//var listOfProducts;
const productContainer = document.createElement("div");
const mainCart = document.querySelector("main");
const cartNr = document.querySelector(".shoppingCount");
productContainer.className = "productContainer";

mainCart.appendChild(productContainer)


initSite()

function initSite() {
   getStorage();
   addProductsToWebpage();
}

function addProductsToWebpage() {
if (!localStorage.getItem("shoppingcart")) {
   return
}
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
const removeIcon = document.createElement("i")


productDiv.appendChild(imageCart)
productDiv.appendChild(title)
productDiv.appendChild(price)
productDiv.appendChild(removeBtn)
productContainer.appendChild(productDiv)
}
}

function getStorage() {
   const horse = JSON.parse(localStorage.getItem("shoppingcart"));
   if (localStorage.getItem("shoppingcart")) {
   const numberOfItems = horse.length;
   cartNr.innerText = numberOfItems;
   }
}




/*function showproducts () {


}*/
//console.log(getProducts)

