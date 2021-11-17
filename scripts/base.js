const cartBtn = document.querySelector(".cart-btn"); //abre el cart sidebar
const closeCartBtn = document.querySelector(".cart__closebtn"); //cierra el cart sidebar
const clearCartBtn = document.querySelector(".cart__footer__clearbtn"); //vacia el carrito

const cartItems = document.querySelector(".cart-items"); //cantidad de items en el carrito
const cartTotal = document.querySelector(".cart-total"); //total del carrito

const cartOverlay = document.querySelector(".cart-overlay"); //contenedor externo del cart sidebar
const cartDOM = document.querySelector(".cart"); //contenedor interior del cart sidebar
// Le pongo "DOM" en el nombre para no confundir con el arreglo cart

const productsDOM = document.querySelector(".products"); //contenedor donde inyecto los productos.
// le agrego "DOM" al nombre para no confundirlo con el arreglo productos [json]
const cartContent = document.querySelector(".cart-content"); //contenedor donde inyecto los productos al carrito.

const modalContainer = document.querySelector(".modal-container"); //contenedor externo del modal

let cart = []; //carrito

//CONSTANTES
const DOLARBLUE = 195;
const DOLAROFICIAL = 110;
const KWH = 0.1;
const HOURS = 24; //Cantidad de horas que se usará por día.
const DAYS = 30; //Cantidad de días que se usará por mes.
const IVA = 1.21; // Multiplicador equivalente a 21%.
const IMPUESTOPAIS = 1.3; //Multiplicador equivalente a 30%

// Operaciones básicas sobre los productos añadidas como propiedades.
for (let product of products) {
    product.energyCost =
        Math.round((product.consumption * HOURS * DAYS) / 1000) *
        DOLARBLUE *
        KWH;
    product.production = Math.round(product.hashrate * DAYS * DOLARBLUE);
    product.income = Math.round(product.production - product.energyCost);
    product.rentability = Math.round(product.price / product.income);
}

// ----------------- User Interface class START ----------------- //
class UI {
    //la clase UserInterface guarda mis métodos principales.

    // ----------------- displayProducts() START ----------------- //
    displayProducts(products) {
        //Metodo para mostrar los productos.
        console.log(
            `displayProducts() - added ${products.length} products to productsDOM.`
        );
        for (let product of products) {
            const card = document.createElement("article");
            card.classList.add("card"); //Estilo de las cards

            card.innerHTML = ` 
            <div class="card__image-container marb-10">
                <p class="card__name">${product.name}</p>
                <img class="card__image" data-id="${product.id}" src="${product.img}">
            </div>

            <div class="card__header marb-10">
                <div class="card__header__brand ${product.brand}">
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

            <div class="card__info__container marb-20">
                <div id="card-gaming-container" class="card-gaming-container hide">
                    <p class="card__info__text">gaming score: <b class="card__info__variable"> &nbsp ${product.gaming}/100</b></p>
                    <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming2</b></p>
                    <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming3</b></p>
                    <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming4</b></p>
                    <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming5</b></p>
                    <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming6</b></p>
                </div>
                <div id="card-mining-container" class="card-mining-container">
                    <p class="card__info__text">hashrate: <b class="card__info__variable"> &nbsp ${product.hashrate} usd / day</b></p>
                    <p class="card__info__text">consumption: <b class="card__info__variable"> &nbsp ${product.consumption} watts</b></p>
                    <p class="card__info__text">production: <b class="card__info__variable"> &nbsp ${product.production} $ / mth</b></p>
                    <p class="card__info__text">energy cost: <b class="card__info__variable"> &nbsp ${product.energyCost} $ / mth</b></p>
                    <p class="card__info__text">income: <b class="card__info__variable"> &nbsp ${product.income} $ / mth</b></p>
                    <p class="card__info__text">rentability: <b class="card__info__variable"> &nbsp ${product.rentability} months</b></p>
                </div>
            </div>

            <div class="card__price-container marb-10">
                <p class="card__price">price: ${product.price}$</p>
            </div>

            <div class="card__moreinfo__container marb-20">
                <button class="card__moreinfo__button" data-id=${product.id}>
                    BUY (More Info)
                </button>
            </div>
            `;

            productsDOM.appendChild(card);
        }

        //MODAL CON JQUERY
        //al clickear la imagen del producto, cambio el contenido del modal y lo muestro.
        $(".card__image , .card__moreinfo__button").on("click", e => {
            let id = e.target.dataset.id;
            let product = products.find(item => item.id == id);
            $(".modal").html(`
            <div class="card-modal">

                <div class="card__image-container marb-20">
                    <p class="card__name">${product.name}</p>
                    <img class="card__image" data-id="${product.id}" src="${product.img}">
                </div>

                <div class="card__header marb-10">

                    <div class="card__header__brand ${product.brand}">
                        <img class="brand-icon" src="icons/${product.brand}_icon.png">
                        ${product.brand}
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

                <div class="card__info__container marb-20">

                    <div id="card-gaming-container" class="card-gaming-container hide">
                        <p class="card__info__text">gaming score: <b class="card__info__variable"> &nbsp ${product.gaming}/100</b></p>
                        <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming2</b></p>
                        <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming3</b></p>
                        <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming4</b></p>
                        <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming5</b></p>
                        <p class="card__info__text">Extra info about <b class="card__info__variable"> &nbsp gaming6</b></p>
                    </div>

                    <div id="card-mining-container" class="card-mining-container">
                        <p class="card__info__text">hashrate: <b class="card__info__variable"> &nbsp ${product.hashrate} usd / day</b></p>
                        <p class="card__info__text">consumption: <b class="card__info__variable"> &nbsp ${product.consumption} watts</b></p>
                        <p class="card__info__text">production: <b class="card__info__variable"> &nbsp ${product.production} $ / mth</b></p>
                        <p class="card__info__text">energy cost: <b class="card__info__variable"> &nbsp ${product.energyCost} $ / mth</b></p>
                        <p class="card__info__text">income: <b class="card__info__variable"> &nbsp ${product.income} $ / mth</b></p>
                        <p class="card__info__text">rentability: <b class="card__info__variable"> &nbsp ${product.rentability} months</b></p>
                    </div>

                </div>

                <div class="card__price-container marb-20">
                    <p class="card__price">price: ${product.price}$</p>
                </div>

                <div class="card-buy-container marb-40">
                    <button class="card__buy__btn material-icons-round" data-id=${product.id}>
                        shopping_cart
                    <p class="card__buy__text" data-id=${product.id}>add to cart<p>
                    </button>
                </div>

                <div class="video-container marb-40">
                    <p class="video-title"></p>
                    <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/iWkdcbru3Ik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <div class="card-spec-container marb-40">

                    <p class="spec-main-title">Technical specs</p>
          
                        <p class="spec-section">General</p>
                          <p class="spec-title">Type of conection</p>
                          <p class="spec-info">PCI Express 3.0</p>
                          <p class="spec-title">GPU Chipset</p>
                          <p class="spec-info">NVIDIA GeForceGT 1030</p>

                        <p class="spec-section">Conectivity</p>
                          <p class="spec-title">HDMI outputs</p>
                          <p class="spec-info">1</p>
                          <p class="spec-title">VGA outputs</p>
                          <p class="spec-info">1</p>
                          <p class="spec-title">DisplayPort</p>
                          <p class="spec-info">No</p>

                        <p class="spec-section">Energy</p>
                          <p class="spec-title">Consumption</p>
                          <p class="spec-info">30W</p>
                          <p class="spec-title">Recommended power source</p>
                          <p class="spec-info">300 W</p>
                          <p class="spec-title">Energy conection</p>
                          <p class="spec-info">N/A</p>

                        <p class="spec-section">Coolers</p>
                          <p class="spec-title">Ammount of fan coolers</p>
                          <p class="spec-info">1</p>

                        <p class="spec-section">Details</p>
                          <p class="spec-title">Base core speed</p>
                          <p class="spec-info">1228 Mhz</p>
                          <p class="spec-title">Turbo core speed</p>
                          <p class="spec-info">1468 Mhz</p>
                          <p class="spec-title">Type of memory</p>
                          <p class="spec-info">DDR4</p>
                          <p class="spec-title">Memory capacity</p>
                          <p class="spec-info">2 GB</p>
                          <p class="spec-title">Memory speed</p>
                          <p class="spec-info">14 Gbps</p>
                          <p class="spec-title">Memory Interface</p>
                          <p class="spec-info">64 Bits</p>
                          <p class="spec-title">Type of processes</p>
                          <p class="spec-info">CUDA</p>
                          <p class="spec-title">Ammount of processes</p>
                          <p class="spec-info">384</p>
                </div>

            </div>
    `);
            $(".close-modal").on("click", () => {
                //le agrego el evento de cierre.
                $(".modal-container").removeClass("showModal");
            });
            // una vez cargado (luego del click), lo abro.
            $(".modal-container").toggleClass("showModal");
            this.getButtons(); //obtengo el estado actual de los botones.
        });
    }
    // ------------ displayProducts() END ------------------- //

    // ----------- getButtons() START --------------- //
    getButtons() {
        // Agrego mis botones de minado/gaming a las tarjetas actuales.
        const miningBtn = [...document.querySelectorAll(".mining-btn")];
        for (let button of miningBtn) {
            button.addEventListener("click", event => {
                // Para relacionar cada botón con su content-info sin usar id me desplazo por el DOM.
                // Agrego el if para manejar el error generado al clickear el mining-btn pero no el icon-image (es más chico)
                if (
                    event.target.parentElement.classList.contains("mining-btn")
                ) {
                    let miningContainer =
                        event.target.parentElement.parentElement.parentElement
                            .nextElementSibling.lastElementChild;
                    let gamingContainer =
                        event.target.parentElement.parentElement.parentElement
                            .nextElementSibling.firstElementChild;
                    gamingContainer.classList.add("hide");
                    miningContainer.classList.remove("hide");
                }
            });
        }
        const gamingBtn = [...document.querySelectorAll(".gaming-btn")];
        for (let button of gamingBtn) {
            button.addEventListener("click", event => {
                let miningContainer =
                    event.target.parentElement.parentElement.nextElementSibling
                        .lastElementChild;
                let gamingContainer =
                    event.target.parentElement.parentElement.nextElementSibling
                        .firstElementChild;
                gamingContainer.classList.remove("hide");
                miningContainer.classList.add("hide");
            });
        }

        //Agrego mis botones de compra a las tarjetas actuales.
        const buttons = [...document.querySelectorAll(".card__buy__btn")]; //convierto el html collection en arreglo por comodidad.

        //Busco cada botón por id, recibe eventos en función de si ya está el producto en el carrito por usos anteriores.
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id == id);
            if (inCart) {
                button.firstElementChild.innerText = "in cart"; //Si ya esta en el carrito, le cambio el texto a su hijo. (<p>)
                button.firstElementChild.classList.add("permanent-color"); // le seteo el color
                button.classList.add("permanent-color");
            }
            button.addEventListener("click", event => {
                //Al clickear el botón de compra:
                let inCart = cart.find(item => item.id == id); //Reviso si está en el carrito al clickear.
                if (inCart) {
                    modalContainer.classList.remove("showModal");
                    this.showCart(); //solo abro el carrito.
                    console.log("product clicked already in cart");
                } else {
                    modalContainer.classList.remove("showModal");

                    button.firstElementChild.innerText = "in cart"; // le cambio el texto
                    button.firstElementChild.classList.add("permanent-color"); // le seteo el color al texto
                    button.classList.add("permanent-color"); // le seteo el color al boton

                    let cartItem = { ...Storage.getProduct(id), amount: 1 }; //Obtengo el producto desde el local storage y le agrego la prop amount.
                    console.log(`cartItem added to the cart:`);
                    console.log(cartItem);

                    cart = [...cart, cartItem]; // Agrego el elemento al carrito.
                    console.log(`cart array now is:`);
                    console.log(cart);

                    Storage.saveCart(cart); //guardo el estado del carrito en el localStorage
                    this.setCartValues(cart); //actualizo los valores del carrito (cant. items y total$)
                    this.addCartItem(cartItem); //inyecto el item en el cart sidebar
                    this.showCart(); //muestro el carrito
                }
            });
        });
    }
    // ----------- getButtons() END --------------- //

    // Metodo para actualizar valores del carrito
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }

    // Metodo para agregar item al cart sidebar
    addCartItem(item) {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
           <img src="${item.img}" alt="product image">
           <div class="cart-item__stats">
               <p class="cart-item__name">${item.name}</p>
               <p class="cart-item__price">${item.price}$</p>
               <span class="cart-item__remove" data-id=${item.id}>remove</span>
           </div>
           <div>
               <span class="material-icons-round cart-icon up" data-id=${item.id}>
                    expand_less
               </span>
               <p class="cart-item__amount" data-id=${item.id}>${item.amount}</p>
                <span class="material-icons-round cart-icon down" data-id=${item.id}>
                    expand_more
                </span>
           </div>
         `;
        cartContent.appendChild(div);
    }

    // Metodo para abrir el carrito.
    showCart() {
        cartOverlay.classList.add("cart-overlay__show");
        cartDOM.classList.add("cart__show");
    }

    // Metodo para cerrar el carrito.
    hideCart() {
        cartOverlay.classList.remove("cart-overlay__show");
        cartDOM.classList.remove("cart__show");
    }

    // Metodo para iniciar la página.
    setupAPP() {
        cart = Storage.getCart(); // Busca el estado anterior del carrito.
        this.populateCart(cart); // inyecta los productos del carrito al cart sidebar.
        this.setCartValues(cart); // actualiza valores en función del estado del carrito.

        // Añado los eventos para abrir y cerrar el carrito.
        cartBtn.addEventListener("click", this.showCart);
        closeCartBtn.addEventListener("click", this.hideCart);

        // Agrego para que se cierre con escape.
        window.addEventListener("keydown", e => {
            if (e.key == "Escape") {
                // Si esta abierta la tienda, la cierra
                if (cartDOM.classList.contains("cart__show")) {
                    ui.hideCart();
                } else {
                    // Si no esta abierta, cierra el modal.
                    modalContainer.classList.remove("showModal");
                }
            }
        });
    }

    // Carga de productos del estado anterior del carrito al cart sidebar.
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }

    // ----------- cartLogic() START --------------- //
    cartLogic() {
        // obtenido el estado del carrito, a los items del cart sidebar les añado los eventos de sus botones.
        clearCartBtn.addEventListener("click", this.clearCart);
        // En este contexto this hace referencia al botón, no a la clase del metodo.

        // Utilizo event bubbling para determinar la accion a realizar. (depende de donde se haga click (target))
        cartDOM.addEventListener("click", event => {
            let id = event.target.dataset.id;
            // console.log(id);
            // console.log(event.target);
            if (event.target.classList.contains("cart-item__remove")) {
                ui.removeItem(id); // lo remuevo del carrito y actualizo valores
                cartContent.removeChild(
                    event.target.parentElement.parentElement
                ); // lo remuevo del dom del cart sidebar
            } else if (event.target.classList.contains("up")) {
                let product = cart.find(product => product.id == id);
                product.amount++;
                Storage.saveCart(cart);
                ui.setCartValues(cart);
                event.target.nextElementSibling.innerText = product.amount;
            } else if (event.target.classList.contains("down")) {
                let product = cart.find(product => product.id == id);
                product.amount--;
                event.target.previousElementSibling.innerText = product.amount;
                if (product.amount > 0) {
                    // Si la cantidad sigue siendo mayor a cero..
                    Storage.saveCart(cart); //guardo
                    ui.setCartValues(cart); //actualizo valores
                } else {
                    //Si la cantidad es cero (o menor) -> lo saco.
                    ui.removeItem(id);
                    cartContent.removeChild(
                        event.target.parentElement.parentElement
                    );
                }
            }
        });
    }
    // ----------- cartLogic() START --------------- //

    //Metodo para vaciar el cart sidebar.
    clearCart() {
        let cartItems = cart.map(item => item.id); //Arreglo con los items actuales del cart sidebar
        // Aplico removeItem a cada uno de los items del carrito para vaciarlo,
        // actualizar los valores en pantalla y guardar el estado del carrito en localStorage.
        cartItems.forEach(id => ui.removeItem(id));

        // Vacio tambien el DOM del cart sidebar.
        while (cartContent.children.length > 0) {
            console.log(`removed from the cart content: \n`);
            console.log(cartContent.firstChild);
            cartContent.removeChild(cartContent.firstChild);
        }
        ui.hideCart(); // cierro el carrito al terminar.
    }

    //Metodo para eliminar del carrito, pero NO del DOM del cart sidebar. -> lo hago aparte.
    removeItem(id) {
        // Filtro el cart con los que no sean el elemento a eliminar.
        let removed = cart.find(item => item.id == id);
        console.log(`${removed.name} removido del carrito.`);
        cart = cart.filter(item => item.id != id);
        console.log(`cart is now:`);
        console.log(cart);
        this.setCartValues(cart); // actualizo valores
        Storage.saveCart(cart); //guardo el estado del carrito en localStorage
    }
}
// --------------- UserInterface class END ----------------- //

// ----------------- Storage class START ------------------- //
// esta clase contiene mis metodos para manejar el localStorage.
// los metodos static no necesitan instanciar a la clase para poder utilizarlos.
class Storage {
    static saveProducts(products) {
        //guarda los productos en el local storage.
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(id) {
        // Toma el arreglo productos del localStorage y busca el producto por id
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id == id);
    }

    static saveCart(cart) {
        // Guardo el estado del carrito en el localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    static getCart() {
        // Intento obtener el estado del carrito del localStorage
        // Si la peticion de JSON devuelve undefined, entonces devuelvo el cart vacio.
        return localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
    }
}
// ----------------- Storage class END ------------------- //

// ----------------- Operations class START ------------------- //
class Operations {
    // products: arreglo principal de productos.
    // puedo remover todos los articulos del dom y agregar únicamente los que cumplan ciertas condiciones.

    static ClearProducts() {
        // Vacio el productsDOM.
        console.log(
            `ClearProducts() - removed ${productsDOM.children.length} products from productsDOM`
        );
        while (productsDOM.children.length > 0) {
            productsDOM.removeChild(productsDOM.firstChild);
        }
    }

    // ----------------- searchbar START ----------------- //
    static searchByName() {
        let searchButton = [...document.querySelectorAll(".searchbar__button")];

        for (let button of searchButton) {
            button.addEventListener("click", () => {
                let input = button.previousElementSibling; // Cada botón selecciona su input
                let key = input.value.toUpperCase();
                console.log(`Mostrando resultados de la busqueda: "${key}"`);
                let searched = [...products].filter(product =>
                    product.name.toUpperCase().includes(key)
                );
                if (searched.length > 0) {
                    // si la busqueda es valida
                    Operations.ClearProducts(); // vacio el productsDOM
                    ui.displayProducts(searched); // muestro las coincidencias
                    ui.getButtons(); // les agrego la logica de sus botones
                } else {
                    //Creo el elemento que avisa que no se encontro.
                    Operations.ClearProducts(); // vacio el productsDOM
                    console.log("not found with that key.");
                    let notFound = document.createElement("div");
                    notFound.classList.add("not-found__container");
                    notFound.innerHTML = `
                    <span class="material-icons-round not-found__icon">
                            sentiment_dissatisfied
                    </span>
                    <p class="not-found__text">no element was found with that name</p>
                    `;
                    productsDOM.appendChild(notFound);
                }
                document
                    .querySelector(".products-container")
                    .scrollIntoView({ behavior: "smooth" }); // Desplazo suavemente hacia el productsDOM.
                input.value = "";
            });
        }

        // ésto hace que el enter para el buscador funcione únicamente si se lo tiene seleccionado.
        window.addEventListener("keydown", e => {
            if (
                e.keyCode === 13 &&
                document.activeElement.nextElementSibling !== null
            ) {
                console.log(document.activeElement);
                document.activeElement.nextElementSibling.click();
            }
        });
    }
    // ------------------ searchbar END ------------------ //

    // ------------------ filtrar por marca START ------------------ //
    static filterByBrand() {
        let filterAMD = document.querySelector("#AMD");
        let filterNVIDIA = document.querySelector("#NVIDIA");

        filterAMD.addEventListener("click", () => {
            if (filterAMD.classList.contains("filter-button-active")) {
                Operations.ClearProducts();
                ui.displayProducts(products);
                filterAMD.classList.remove("filter-button-active");
            } else {
                let filtered = products.filter(
                    product => product.brand == "AMD"
                );
                Operations.ClearProducts();
                ui.displayProducts(filtered);
                filterAMD.classList.add("filter-button-active");
                filterNVIDIA.classList.remove("filter-button-active");
            }
            ui.getButtons();
        });

        filterNVIDIA.addEventListener("click", () => {
            if (filterNVIDIA.classList.contains("filter-button-active")) {
                Operations.ClearProducts();
                ui.displayProducts(products);
                filterNVIDIA.classList.remove("filter-button-active");
            } else {
                let filtered = products.filter(
                    product => product.brand == "NVIDIA"
                );
                Operations.ClearProducts();
                ui.displayProducts(filtered);
                filterNVIDIA.classList.add("filter-button-active");
                filterAMD.classList.remove("filter-button-active");
            }
            ui.getButtons();
        });
    }
    // ------------------ filtrar por marca END ------------------ //

    // ------------------ ordenar por parametro START ------------------ //
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
                let sorted = [...products].sort(
                    (a, b) => b.hashrate - a.hashrate
                );
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
            ui.getButtons();
        });
    }
}
// ------------------ ordenar por parametro END ------------------ //
// ----------------- Operations class END ------------------- //

// MAIN DEL PROGRAMA

const ui = new UI(); // instancio la clase UserInterface para utilizar sus métodos

ui.setupAPP(); // funciones iniciales, obtengo estados posteriores de la página y el localStorage.

ui.displayProducts(products); // cargo los productos

Storage.saveProducts(products); // los guardo en el local storage para trabajarlos.

ui.getButtons(); // actualizo el estado de mis botones de añadir al carrito.

ui.cartLogic(); // una vez obtenido el estado de mis botones, les agrego la lógica de remover.

//Añado la lógica de ordenado ,busqueda y filtrado.
Operations.searchByName();
Operations.filterByBrand();
Operations.sortBy();
