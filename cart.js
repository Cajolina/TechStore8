const cartTitle = document.createElement("h2")
cartTitle.innerHTML = "Kundvagn";
cartTitle.classList.add("mainHeadline")
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
totalPrice.classList.add("totalSumContainer")
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
   showTotalSum();
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

   addProductsToWebpage();
   getNumberOfItems();
   showPurchaseBtn();
   showTotalSum();
}

function showTotalSum() {
   if (localStorage.getItem("shoppingcart")) {
      const shoppingArray = JSON.parse(localStorage.getItem("shoppingcart"));
      const totalSum = shoppingArray.reduce(
         (total, item) => {
            return total + item.price
         }, 0);

      totalPrice.innerText = "Totalt pris: " + totalSum + " kr";
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
   const boughtProducts = {
      products: shoppingCart,
      total: showTotalSum(),
      user: loggedInUser
   }

   if(!localStorage.getItem("orders")) {
      localStorage.setItem("orders", JSON.stringify([boughtProducts]));
   } else {
      const orders = JSON.parse(localStorage.getItem("orders"));
      orders.push(boughtProducts);
      localStorage.setItem("orders", JSON.stringify(orders));
   }

   localStorage.removeItem("shoppingcart");
}
