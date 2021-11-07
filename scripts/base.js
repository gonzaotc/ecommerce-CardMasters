// cartBtn abre el carrito sidebar
const cartBtn = document.querySelector(".cart-btn");
// closeCartBtn cierra el carrito sidebar
const closeCartBtn = document.querySelector(".close-cart");
// clearCartBtn vacia el carrito.
const clearCartBtn = document.querySelector(".clear-cart");

// para cambiar la cantidad de items y el valor total
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

// para darles las clases de mostrar/esconder el carrito sidebar.
const cartOverlay = document.querySelector(".cart-overlay");
const cartDOM = document.querySelector(".cart");
// Le pongo "DOM" en el nombre para no confundir con el arreglo
// "cart" en el que guardo los productos del carrito.

// contenedores donde hago append de mis productos y los del carrito.
const productsDOM = document.querySelector(".products");
// le agrego "DOM" al nombre para no confundirlo con el arreglo
// "productos" en el que tengo mis productos.
const cartContent = document.querySelector(".cart-content");

// carrito
let cart = [];
// buttons
let buttonsArray = [];

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
  product.energyCost =
    Math.round((product.consumption * HOURS * DAYS) / 1000) * DOLARBLUE * KWH;
  product.production = Math.round(product.hashrate * DAYS * DOLARBLUE);
  product.income = Math.round(product.production - product.energyCost);
  product.rentability = Math.round(product.price / product.income);
}

// La clase User Interface guarda mis metodos principales.
class UI {
  //Metodo para mostrar los productos
  displayProducts(products) {
    console.log(
      `displayProducts() - added ${products.length} products to productsDOM.`
    );
    for (let product of products) {
      const card = document.createElement("article");
      card.classList.add("card");
      // la clase card contiene los estilos de la card.
      card.classList.add(product.brand);
      // añado la clase marca para filtrar luego.

      //card de los productos
      card.innerHTML = `
    <div class="card-img-container">
            <p class="card-name">${product.name}</p>
        <img class="card-image" src="${product.img}">
    </div>
    <div class="card-info-container">
        <div class="card-header">
            <div class="brand ${product.brand}">
                <img class="brand-icon" src="icons/${product.brand}_icon.png">${product.brand}
            </div>
            <div class="card-buttons-container">
                <button class="material-icons-round gaming-btn" data-id=${product.id}>
                    sports_esports
                </button>
                <button class="material-icons-round mining-btn" data-id=${product.id}>
                    <img class="icon-image" src="icons/pickaxe_icon.png">
                </button>
            </div>
        </div>
        <div id="card-gaming-container" class="card-gaming-container hide">
            <p class="card-info-text">gaming score: <b class="card-info-variable"> &nbsp ${product.gaming}/100</b></p>
            <p class="card-info-text">Extra info about <b class="card-info-variable"> &nbsp gaming2</b></p>
            <p class="card-info-text">Extra info about <b class="card-info-variable"> &nbsp gaming3</b></p>
            <p class="card-info-text">Extra info about <b class="card-info-variable"> &nbsp gaming4</b></p>
            <p class="card-info-text">Extra info about <b class="card-info-variable"> &nbsp gaming5</b></p>
            <p class="card-info-text">Extra info about <b class="card-info-variable"> &nbsp gaming6</b></p>
        </div>
        <div id="card-mining-container" class="card-mining-container">
            <p class="card-info-text">hashrate: <b class="card-info-variable"> &nbsp ${product.hashrate} usd / day</b></p>
            <p class="card-info-text">consumption: <b class="card-info-variable"> &nbsp ${product.consumption} watts</b></p>
            <p class="card-info-text">production: <b class="card-info-variable"> &nbsp ${product.production} $ / mth</b></p>
            <p class="card-info-text">energy cost: <b class="card-info-variable"> &nbsp ${product.energyCost} $ / mth</b></p>
            <p class="card-info-text">income: <b class="card-info-variable"> &nbsp ${product.income} $ / mth</b></p>
            <p class="card-info-text">rentability: <b class="card-info-variable"> &nbsp ${product.rentability} months</b></p>

        </div>
        <p class="card-price">price: ${product.price}$</p>
        <div class="card-buy-container">
            <button class="buy-btn material-icons-round" data-id=${product.id}>
                shopping_cart
                <p class="buy-text" data-id=${product.id}>add to cart<p>
            </button>
            
        </div>
    </div>
    `;
      productsDOM.appendChild(card);
    }
  }

  //Metodo para hacer mis botones funcionar con el carrito y el localStorage
  // Dado que tienen un estado que depende de usos anteriores, los cargo luego de cargar el localStorage.
  getBuyButtons() {
    // Agrego mis botones de minado/gaming

    const miningBtn = [...document.querySelectorAll(".mining-btn")];
    for (let button of miningBtn) {
      let id = button.dataset.id;
      button.addEventListener("click", (event) => {
        let miningContainer =
          event.target.parentElement.parentElement.parentElement
            .nextElementSibling.nextElementSibling;
        let gamingContainer =
          event.target.parentElement.parentElement.parentElement
            .nextElementSibling;
        gamingContainer.classList.toggle("hide");
        miningContainer.classList.toggle("hide");
      });
    }
    const gamingBtn = [...document.querySelectorAll(".gaming-btn")];
    for (let button of gamingBtn) {
      let id = button.dataset.id;
      button.addEventListener("click", (event) => {
        let miningContainer =
          event.target.parentElement.parentElement.nextElementSibling
            .nextElementSibling;
        let gamingContainer =
          event.target.parentElement.parentElement.nextElementSibling;
        gamingContainer.classList.toggle("hide");
        miningContainer.classList.toggle("hide");
      });
    }

    // Agrego mis botones de comprado.
    const buttons = [...document.querySelectorAll(".buy-btn")];
    // genero un arreglo con todos los botones de compra
    // Uso el spead operator para convertir el html collection en array y trabajar más comodo.

    // Me hago una copia para usar en el metodo getSingleButton
    buttonsArray = buttons;

    //  Busco el id de cada botón, solo les doy evento si el product NO esta en el carrito (por usos anteriores).
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id == id);
      if (inCart) {
        // Si ya esta en el carrito, cambio el texto del boton, que es su hijo <p> .buy-text
        button.firstElementChild.innerText = "in cart";
        button.disabled = true;
      }
      //Al clickear el boton de compra, se cambia el texto y se desabilita el botón.
      button.addEventListener("click", (event) => {
        button.firstElementChild.innerText = "in cart";
        button.disabled = true;
        //Obtengo el producto seleccionado desde el arreglo products guardado en el local storage.
        //El id del producto es el mismo que el data-set del boton presionado.
        // Le agrego la propiedad cantidad (amount). La inicio en 1.
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        console.log(`cartItem added to the cart:`);
        console.log(cartItem);

        //añado el producto seleccionado al carrito.
        // Uso spread, copiando el anterior arreglo y agregando el
        // elemento nuevo, pero se podria usar .push().
        cart = [...cart, cartItem];
        console.log(`cart array now is:`);
        console.log(cart);

        //Guardo el estado del carrito en el localStorage.
        Storage.saveCart(cart);

        // Actualizar los valores del carrito (cant. items y total$)
        this.setCartValues(cart);

        // agregar item seleccionado al cart sidebar
        this.addCartItem(cartItem);

        // show the cart (change css propertys)
        this.showCart();
      });
    });
  }
  //Actualizar valores del carrito
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      // Por cada item del carrito, multiplica su precio por su cantidad.
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });

    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  // Metodo para agregar item al cart sidebar al ser seleccionado
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
           <img src="${item.img}" alt="product image">
           <div>
               <p class="item-name">${item.name}</p>
               <p class="item-price">${item.price}$</p>
               <span class="remove-item" data-id=${item.id}>remove</span>
           </div>
           <div>
               <span class="material-icons-round cart-icon up" data-id=${item.id}>
                    expand_less
               </span>
               <p class="item-amount" data-id=${item.id}>${item.amount}</p>
                <span class="material-icons-round cart-icon down" data-id=${item.id}>
                    expand_more
                </span>
           </div>
         `;
    cartContent.appendChild(div);
  }

  // Metodo para abrir el carrito.
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }

  // Metodo para cerrar el carrito.
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

  // Metodo para iniciar la pagina.
  setupAPP() {
    // Al inicial la pagina, intenta conseguir el estado anterior del cart del localStorage
    cart = Storage.getCart();
    // A partir del estado del carrito, actualizo los valores (total$ y totalItems)
    this.setCartValues(cart);
    this.populateCart(cart);

    // Añado los eventos para abrir y cerrar el carrito.
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
    // also close cart when press EXIT. TO-DO
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        ui.hideCart();
      }
    });
  }

  // para cada item del carrito en su estado actual, lo muestro en el sidebar cart.
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  //Una vez obtenido el estado de mis botones y los productos en el cart sidebar, añado
  // la logica para vaciar el carrito, cambiar cantidad y para poder removerlos.
  cartLogic() {
    clearCartBtn.addEventListener("click", this.clearCart);
    // En este contexto this hace referencia al botón, no a la clase del metodo.

    // Utilizo event bubbling para determinar la accion a realizar. (depende de donde se haga click (target))
    cartDOM.addEventListener("click", (event) => {
      let id = event.target.dataset.id;
      if (event.target.classList.contains("remove-item")) {
        // lo remuevo del carrito y actualizo valores
        ui.removeItem(id);
        // lo remuevo del dom del cart sidebar
        cartContent.removeChild(event.target.parentElement.parentElement);
      } else if (event.target.classList.contains("up")) {
        let product = cart.find((product) => product.id == id);
        product.amount++;
        Storage.saveCart(cart);
        ui.setCartValues(cart);
        event.target.nextElementSibling.innerText = product.amount;
      } else if (event.target.classList.contains("down")) {
        let product = cart.find((product) => product.id == id);
        product.amount--;
        event.target.previousElementSibling.innerText = product.amount;
        if (product.amount > 0) {
          // Si la cantidad sigue siendo mayor a cero..
          Storage.saveCart(cart);
          ui.setCartValues(cart);
        } else {
          //Si la cantidad es cero (o menor)
          ui.removeItem(id);
          cartContent.removeChild(event.target.parentElement.parentElement);
        }
      }
    });
  }

  clearCart() {
    // Me genero un arreglo que contiene los ids de mis elementos en el cart.
    let cartItems = cart.map((item) => item.id);
    // Aplico removeItem a cada uno de los items del carrito para vaciarlo
    // y actualizar los valores en pantalla y en localStorage.
    cartItems.forEach((id) => ui.removeItem(id));

    // Lo elimino tambien de la vista del cart sidebar
    // borro hijos hasta que el cartContent este vacio.
    while (cartContent.children.length > 0) {
      console.log(`removed from the cart content: \n`);
      console.log(cartContent.firstChild);
      cartContent.removeChild(cartContent.firstChild);
    }
    //Cierro el carrito
    ui.hideCart();
  }
  removeItem(id) {
    // Filtro el cart con los que no sean el elemento a eliminar.
    cart = cart.filter((item) => item.id != id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    // Devuelvo el estado inicial al boton de compra del producto.
    let button = this.getSingleButton(id);
    //una vez encontrado el boton, reactivo su funcionalidad
    button.disabled = false;
    button.firstElementChild.innerText = "add to cart";

    //Remuevo del dom
  }
  // Busco el boton que tenga el id seleccionado.
  getSingleButton(id) {
    return buttonsArray.find((button) => button.dataset.id == id);
  }
}

//esta clase contiene mis metodos para manejar el localStorage.
class Storage {
  // los metodos static no necesitan instanciar a la clase para poder utilizarlos.

  // éste metodo me guarda los productos en el local storage.
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    // Toma el arreglo productos del localStorage y busca el producto por id
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id == id);
  }
  // Guardo el estado del carrito en el localStorage
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  // Intento obtener el estado del carrito del localStorage
  // Si la peticion de JSON devuelve undefined, entonces devuelvo el cart vacio.
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

class Operations {
  // products es el arreglo original de productos.
  // puedo remover todos los articulos del dom y agregar
  // únicamente los que cumplan ciertas condiciones.
  static ClearProducts() {
    console.log(
      `ClearProducts() - removed ${productsDOM.children.length} products from productsDOM`
    );
    while (productsDOM.children.length > 0) {
      productsDOM.removeChild(productsDOM.firstChild);
    }
  }

  static searchByName() {
    let searchInput = document.querySelector("#search-input");
    let searchButton = document.querySelector("#search-button");
    searchButton.addEventListener("click", () => {
      let key = searchInput.value.toUpperCase();
      console.log(`key: ${key}`);

      let searched = [...products].filter((product) =>
        product.name.toUpperCase().includes(key)
      );
      if (searched.length > 0) {
        Operations.ClearProducts();
        ui.displayProducts(searched);
        searchInput.value = "";
        ui.getBuyButtons();
      } else {
        //Creo el elemento que avisa que no se encontro.
        Operations.ClearProducts();
        let notFound = document.createElement("div");
        notFound.classList.add("not-found-container");
        notFound.innerHTML = `
        <span class="material-icons-round not-found-icon">
        sentiment_dissatisfied
        </span>
        <p class="not-found-text">no element was found with that name</p>
        <p class="javi">tkm javi faltan 2 min para que termine la entrega ajsajs</p>
        `;
        productsDOM.appendChild(notFound);
      }
      document
        .querySelector(".products-container")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  static filterByBrand() {
    let filterAMD = document.querySelector("#AMD");
    let filterNVIDIA = document.querySelector("#NVIDIA");

    filterAMD.addEventListener("click", () => {
      if (filterAMD.classList.contains("filter-button-active")) {
        Operations.ClearProducts();
        ui.displayProducts(products);
        filterAMD.classList.remove("filter-button-active");
      } else {
        let filtered = products.filter((product) => product.brand == "AMD");
        Operations.ClearProducts();
        ui.displayProducts(filtered);
        filterAMD.classList.add("filter-button-active");
        filterNVIDIA.classList.remove("filter-button-active");
      }
      ui.getBuyButtons();
    });

    filterNVIDIA.addEventListener("click", () => {
      if (filterNVIDIA.classList.contains("filter-button-active")) {
        Operations.ClearProducts();
        ui.displayProducts(products);
        filterNVIDIA.classList.remove("filter-button-active");
      } else {
        let filtered = products.filter((product) => product.brand == "NVIDIA");
        Operations.ClearProducts();
        ui.displayProducts(filtered);
        filterNVIDIA.classList.add("filter-button-active");
        filterAMD.classList.remove("filter-button-active");
      }
      ui.getBuyButtons();
    });
  }

  static sortBy() {
    const sortInput = document.querySelector("#sort-input");
    sortInput.addEventListener("change", () => {
      if (sortInput.value == "none") {
        Operations.ClearProducts();
        ui.displayProducts(products);
      } else if (sortInput.value == "maxprice") {
        let sorted = [...products].sort((a, b) => b.price - a.price);
        Operations.ClearProducts();
        ui.displayProducts(sorted);
      } else if (sortInput.value == "minprice") {
        let sorted = [...products].sort((a, b) => a.price - b.price);
        Operations.ClearProducts();
        ui.displayProducts(sorted);
      } else if (sortInput.value == "hashrate") {
        let sorted = [...products].sort((a, b) => b.hashrate - a.hashrate);
        Operations.ClearProducts();
        ui.displayProducts(sorted);
      } else if (sortInput.value == "rentability") {
        let sorted = [...products].sort(
          (a, b) => a.rentability - b.rentability
        );
        Operations.ClearProducts();
        ui.displayProducts(sorted);
      } else if (sortInput.value == "gaming") {
        let sorted = [...products].sort((a, b) => b.gaming - a.gaming);
        Operations.ClearProducts();
        ui.displayProducts(sorted);
      }
      ui.getBuyButtons();
    });
  }
}

// main del programa

const ui = new UI();
// funciones iniciales, obtengo estados posteriores de la página y el localStorage.
ui.setupAPP();
// cargo los productos
ui.displayProducts(products);
// los guardo en el local storage para trabajarlos.
Storage.saveProducts(products);
// actualizo el estado de mis botones de añadir al carrito.
ui.getBuyButtons();
// una vez obtenido el estado de mis botones, les agrego la lógica de remover.
ui.cartLogic();

Operations.searchByName();

Operations.filterByBrand();

Operations.sortBy();
