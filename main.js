var listOfProducts;
const main = document.querySelector("main");
const cartNr = document.querySelector(".shoppingCount");

/** Get products from the json file and store it in a gobal variable */
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
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    let html;
    //Börja ränka på 0
    let id =0;
    for (const product of listOfProducts) {
        // ${} så skriver man JS i HTML i JS.
        //vi gör detta till en sträng, vi kan även creata element så som vi gjort förut. Nu måste vi dock göra lite fix för att knappen ska kopplas till de olika produkterna (annars hade vi lagt en eventListener)
        html = `
        <div class="product_container">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <img src="/assets/${product.image}">
            <p>${product.price} kr</p>
            <button id=${id} onclick="addToCart (this)">Add to cart</button>
        </div>
        `;

        //Öka med 1 när vi räknar
        id++;
        //Här skickar vi in det i mainen
        main.insertAdjacentHTML("beforeEnd", html);
    }
    // Check your console to see that the products are stored in the listOfProducts varible.
    console.log(listOfProducts);

    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    
    // TODO: Remove the console.log and these comments when you've read them.
}

function addToCart(button) {
    const product = listOfProducts[button.id];
    //button.setAttribute("disabled", true)
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
    const numberOfItems = horse.length;
    cartNr.innerText = numberOfItems;
}

     


