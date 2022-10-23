//var listOfProducts;
const productContainer = document.createElement("div");
const mainCart = document.querySelector("main");


mainCart.appendChild(productContainer)



initSite()

function initSite() {
    
   addProductsToWebpage()
}

function addProductsToWebpage() {
const getProducts = JSON.parse(localStorage.getItem("shoppingcart"));

for (const productCart of getProducts) {

const title = document.createElement("h2")
title.innerHTML = productCart.title
const description = document.createElement("p")
description.innerHTML = productCart.description
const imageCart = document.createElement("img")
imageCart.setAttribute("src", "/assets/" + productCart.image)
const price = document.createElement("p")
price.innerHTML = productCart.price
const removeBtn = document.createElement("button")
removeBtn.innerText = "Ta bort"


productContainer.appendChild(title)
productContainer.appendChild(description)
productContainer.appendChild(imageCart)

productContainer.appendChild(price)
productContainer.appendChild(removeBtn)




mainCart.insertAdjacentHTML("afterbegin", imageCart);
}
}

console.log(productContainer)





/*function showproducts () {


}*/
//console.log(getProducts)

