// BUTTONS
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
// TO CHANGE DISPLAY NUMBER/TEXT
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
// TO SHOW / HIDE
const cartOverlay = document.querySelector(".cart-overlay");
// Le pongo "DOM" en el nombre para no confundir con el carrito
// arreglo en el que guardo los productos.
const cartDOM = document.querySelector(".cart");
// TO APPEND MY DINAMIC ITEMS
const container = document.querySelector(".products");
const cartContent = document.querySelector(".cart-content");

// cart
let cart = [];
// buttons
let buttonsDOM = [];

//CONSTANTES
const DOLARBLUE = 195;
const DOLAROFICIAL = 110;
const KWH = 0.1;
const HOURS = 24; //Cantidad de horas que se usará por día.
const DAYS = 30; //Cantidad de días que se usará por mes.
const IVA = 1.21; // Multiplicador equivalente a 21%.
const IMPUESTOPAIS = 1.3; //Multiplicador equivalente a 30%

// Operaciones básicas sobre los productos.
for (let product of products) {
  this.consumption =
    ((this.consumption * HOURS * DAYS) / 1000) * DOLARBLUE * KWH;
  this.production = this.hashrate * DAYS * DOLARBLUE;
  this.income = this.production - this.consumption;
  this.rentability = Math.floor(this.price / this.income);
}

// La clase User Interface guarda todos mis metodos.
class UI {
    //Method to display the products
    displayProducts(products) {
        for (let product of products) {
            const card = document.createElement("article");
            // la clase card contiene los estilos de la card.
            card.classList.add("card");
            // añado la clase marca para filtrar luego.
            card.classList.add(product.brand);

            //card de los productos
            card.innerHTML = `
    <div class="card-img-container">
        <img class="card-image" src="${product.img}">
        <p class="card-name">${product.name}</p>
    </div>
    <div class="card-info-container">
        <div class="card-header">
            <div class="brand ${product.brand}">
                <img class ="brand-icon" src="icons/${product.brand}_icon.png">
                </p class ="brand-name" >${product.brand}</p>
            </div>
            <div class="card-buttons-container">
                <button class="gaming-icon material-icons-round" data-id=${product.id}>
                    sports_esports
                </button>
                <button class="mining-icon material-icons-round" data-id=${product.id}>
                    <img class="icon-image" src="icons/pickaxe_icon.png">
                </button>
            </div>
        </div>
        <div class="card-gaming-container">
        </div>
        <div class="card-mining-container">
            <p>hashrate: ${product.hashrate} usd/day</p>
            <p>consumption: ${product.consumption} watts</p>
            <p>income: ${product.income}$</p>
            <p>rentability: ${product.rentability}</p>
        </div>
        <p>price: ${product.price}$</p>
        <div class="card-buy-container">
            <button class="buy-btn material-icons-round" data-id=${product.id}>
                shopping_cart
                <p class="card-buy-text">add to cart<p>
            </button>
            
        </div>
    </div>
    `;
            container.appendChild(card);
        }
    }
    //Method to make buy buttons work with the shopping cart.
    getBuyButtons() {
        const buttons = [...document.querySelectorAll(".buy-btn")];
        buttonsDOM = buttons;
        buttons.forEach((button) => {
            let id = button.dataset.id;
            let inCart = cart.find((item) => item.id === id);
            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }
            button.addEventListener("click", (event) => {
                event.target.innerText = "In Cart";
                event.target.disabled = true;

                //get product from products
                let cartItem = { ...Storage.getProduct(id), amount: 1 };

                //add product to the cart
                cart = [...cart, cartItem];
                console.log(cart);

                //save cart in local storage
                Storage.saveCart(cart);

                // set cart values
                this.setCartValues(cart);

                // display cart item
                this.addCartItem(cartItem);

                // show the cart (change css propertys)
                this.showCart();
            });
        });
    }
    //Update the cart values 
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map((item) => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });

        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <img src="${item.image}" alt="product image">
        <div>
            <h4>${item.title}</h4>
            <h5>${item.price}$</h5>
            <span class="remove-item" data-id=${item.id}>remove</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount" data-id=${item.id}>${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>
      `;
        cartContent.appendChild(div);
    }

    // Method to open the cart
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    }
    // Method to close the cart
    hideCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    }
    // Method to inializate things.
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener("click", this.showCart);
        closeCartBtn.addEventListener("click", this.hideCart);
    }
    // para cada item del cart del local storage, lo añado
    populateCart(cart) {
        cart.forEach((item) => this.addCartItem(item));
    }
}

//local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
      return localStorage.getItem("cart") 
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

const ui = new UI();
ui.setupAPP();

ui.displayProducts(products);
Storage.saveProducts(products);

ui.getBuyButtons();
ui.cartLogic();


//FILTER

// let filterAmd = document.querySelector("#AMD");
// let filterNvidia = document.querySelector("#NVIDIA");

// filterAmd.addEventListener("click", filter);
// filterNvidia.addEventListener("click", filter);

// function filter(event) {
//   // marca retiene la marca del boton clickeado
//   let marca = event.target.id;
//   let products = document.querySelectorAll(".product");

//   for (let product of products) {
//     if (!product.classList.contains(marca)) {
//       product.classList.toggle("show");
//     }
//   }
