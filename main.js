var listOfProducts;
const main = document.querySelector("main");
const cartNr = document.querySelector(".shoppingCount");

function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}

initSite();

function initSite() {
    loadProducts();
    getStorage();
}

function hideAddToCartButton(button) {
    button.style.visibility = "hidden";
}

function addProductsToWebpage() {
    let html;
    let id =0;
    const getItem = JSON.parse(localStorage.getItem("shoppingcart"));
    for (const product of listOfProducts) {
        let foundProduct = false;
        if (localStorage.getItem("shoppingcart")) {
            foundProduct = getItem.some(p => p.title === product.title); 
        }

        let imageId = product.image.slice(0, -4);
        html = `
        <div class="product_container">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <img src="/assets/${product.image}" id=${imageId}>
            <div class="price"> <p>${product.price} kr</p> </div>
            ${!foundProduct ? `<button id=${id} onclick="addToCart (this)"><i class="fa-solid fa-cart-arrow-down"></i> Lägg till i kundvagnen</button>` : ""}
        </div>
        `;
        id++;
        main.insertAdjacentHTML("beforeEnd", html);
    }
}

function addToCart(button) {
    const product = listOfProducts[button.id];
    button.style.visibility = "hidden";
    if(!localStorage.getItem("shoppingcart")){
        localStorage.setItem("shoppingcart", JSON.stringify([product]));
    }
    else {
        const shoppingcart = JSON.parse(localStorage.getItem("shoppingcart"));
        shoppingcart.push(product);
        localStorage.setItem("shoppingcart", JSON.stringify (shoppingcart));
    }
    getStorage();
}

function getStorage() {
    const horse = JSON.parse(localStorage.getItem("shoppingcart"));
    if (localStorage.getItem("shoppingcart")) {
        const numberOfItems = horse.length;
        cartNr.innerText = numberOfItems;
    }
}
