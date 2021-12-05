class UI {
    // ----------------- displayProducts() START ----------------- //
    displayProducts(products) {
        //Metodo para mostrar los productos. Genera las cards de forma dínamica y escalable.
        console.log(`displayProducts() - added ${products.length} products to productsDOM.`);
        for (let product of products) {
            const card = document.createElement("article");
            card.classList.add("card");
            card.classList.add(`${product.brand}`); // Uso la clase marca para los filtros.

            card.innerHTML = ` 
            <div class="card__image-container marb-10">
                <p class="card__name">${product.name}</p>
                <img class="card__image" data-id="${product.id}" src="${product.img}">
            </div>

            <div class="card__header marb-10">
                <div class="card__header__brand header__${product.brand}">
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
                    <p class="card__info__text">production: <b class="card__info__variable"> &nbsp ${product.production} $ / month</b></p>
                    <p class="card__info__text">energy cost: <b class="card__info__variable"> &nbsp ${product.energyCost} $ / month</b></p>
                    <p class="card__info__text">income: <b class="card__info__variable"> &nbsp ${product.income} $ / month</b></p>
                    <p class="card__info__text">rentability: <b class="card__info__variable"> &nbsp ${product.rentability} months</b></p>
                </div>
            </div>

            <div class="card__price-container marb-10">
                <p class="card__price">price: ${product.price}$</p>
            </div>

            <div class="card__moreinfo__container marb-20">
                <button class="card__moreinfo__button coolButton--orange" data-id=${product.id}>
                    BUY (More Info)
                </button>
            </div>
            `;

            productsDOM.appendChild(card);
        }

        //MODAL CON JQUERY
        $(".card__image , .card__moreinfo__button").on("click", e => {
            let id = e.target.dataset.id; // El modal se carga con la info del prod seleccionado.
            let product = products.find(item => item.id == id);
            $(".modal").html(`
            <div class="card-modal">

                <div class="card__image-container marb-20">
                    <p class="card__name">${product.name}</p>
                    <img class="card__image" data-id="${product.id}" src="${product.img}">
                </div>

                <div class="card__header marb-10">

                    <div class="card__header__brand header__${product.brand}">
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
                        <p class="card__info__text">production: <b class="card__info__variable"> &nbsp ${product.production} $ / month</b></p>
                        <p class="card__info__text">energy cost: <b class="card__info__variable"> &nbsp ${product.energyCost} $ / month</b></p>
                        <p class="card__info__text">income: <b class="card__info__variable"> &nbsp ${product.income} $ / month</b></p>
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
                $(".modal-container").removeClass("showModal");
            });
            this.getButtons(); //obtengo el estado actual de los botones del producto.
            $(".modal-container").toggleClass("showModal"); // una vez cargado (luego del click), lo abro.
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
                if (event.target.parentElement.classList.contains("mining-btn")) {
                    let miningContainer =
                        event.target.parentElement.parentElement.parentElement.nextElementSibling
                            .lastElementChild;
                    let gamingContainer =
                        event.target.parentElement.parentElement.parentElement.nextElementSibling
                            .firstElementChild;
                    gamingContainer.classList.add("hide");
                    miningContainer.classList.remove("hide");
                }
            });
        }
        const gamingBtn = [...document.querySelectorAll(".gaming-btn")];
        for (let button of gamingBtn) {
            button.addEventListener("click", event => {
                let miningContainer =
                    event.target.parentElement.parentElement.nextElementSibling.lastElementChild;
                let gamingContainer =
                    event.target.parentElement.parentElement.nextElementSibling.firstElementChild;
                gamingContainer.classList.remove("hide");
                miningContainer.classList.add("hide");
            });
        }

        //Agrego mis botones de compra a las tarjetas actuales, que dependen del estado por usos anteriores (local Storage).
        const buttons = [...document.querySelectorAll(".card__buy__btn")];
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
                } else {
                    modalContainer.classList.remove("showModal");

                    button.firstElementChild.innerText = "in cart"; // le cambio el texto
                    button.firstElementChild.classList.add("permanent-color"); // le seteo el color
                    button.classList.add("permanent-color");

                    let cartItem = { ...Storage.getProduct(id), amount: 1 }; //Obtengo el producto desde el local storage y le agrego la prop amount.
                    console.log(`cartItem added to the cart:\n`, cartItem);

                    cart = [...cart, cartItem]; // Agrego el elemento al carrito.
                    console.log(`cart array now is:`, cart);

                    Storage.saveCart(cart); //guardo el estado del carrito en el localStorage
                    this.setCartValues(cart); //actualizo los valores del carrito (cant. items y total$)
                    this.addCartItem(cartItem); //inyecto el item en el cart sidebar
                    this.showCart(); //muestro el carrito
                }
            });
        });
        console.log(`getButtons() - buttons state added.`);
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
        console.log(`setCartValues() - total: ${tempTotal}$, items: ${itemsTotal} `);
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
               <span class="coolButton2--red cart-item__remove" data-id=${item.id}>remove</span>
           </div>
           <div>
               <span class="material-icons-round cart-amount-icon up" data-id=${item.id}>
                    expand_less
               </span>
               <p class="cart-item__amount" data-id=${item.id}>${item.amount}</p>
                <span class="material-icons-round cart-amount-icon down" data-id=${item.id}>
                    expand_more
                </span>
           </div>
         `;
        cartContent.appendChild(div);

        if (cart.length > 0) {
            this.showCompleteBtn();
         }
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

    // Metodo para iniciar la página (resumo métodos en uno).
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
                // Si esta abierto el modal de pago final, lo cierra.
                if (!paymentModal__container.classList.contains("hide")) {
                    paymentModal__container.classList.add("hide");
                }
                // Si esta abierta la tienda, la cierra
                else if (cartDOM.classList.contains("cart__show")) {
                    this.hideCart();
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
        console.log(`populateCart() - ${cart.length} items added to the sidebar cart`);
    }

    // ----------- cartLogic() START --------------- //
    cartLogic() {
        // obtenido el estado del carrito, a los items del cart sidebar les añado los eventos de sus botones.
        clearCartBtn.addEventListener("click", () => {
            this.clearCart();
        });
        // En este contexto this hace referencia al botón, no a la clase del metodo.

        completeBtn.addEventListener("click", () => {
            if (cart.length > 0) {
                // let total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
                // cartorder__content.innerHTML = `
                // <span class="cartorder__total"> total to pay: ${total} $ </span>
                // `

                paymentModal__container.classList.remove("hide");
            }
        });

        // Utilizo event bubbling para determinar la accion a realizar. (depende de donde se haga click (target))
        cartDOM.addEventListener("click", event => {
            let id = event.target.dataset.id;

            if (event.target.classList.contains("cart-item__remove")) {
                this.removeItem(id); // lo remuevo del carrito y actualizo valores
                cartContent.removeChild(event.target.parentElement.parentElement); // lo remuevo del dom del cart sidebar
            } else if (event.target.classList.contains("up")) {
                let product = cart.find(product => product.id == id);
                product.amount++;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                event.target.nextElementSibling.innerText = product.amount;
            } else if (event.target.classList.contains("down")) {
                let product = cart.find(product => product.id == id);
                product.amount--;
                event.target.previousElementSibling.innerText = product.amount;
                if (product.amount > 0) {
                    // Si la cantidad sigue siendo mayor a cero..
                    Storage.saveCart(cart); //guardo
                    this.setCartValues(cart); //actualizo valores
                } else {
                    //Si la cantidad es cero (o menor) -> lo saco.
                    this.removeItem(id);
                    cartContent.removeChild(event.target.parentElement.parentElement);
                }
            }
        });
        console.log(`cartLogic() - added logic for the cart sidebar.`);
    }
    // ----------- cartLogic() END --------------- //

    //Metodo para vaciar el cart sidebar.
    clearCart() {
        let cartItems = cart.map(item => item.id); //Arreglo con los items actuales del cart sidebar
        // Aplico removeItem a cada uno de los items del carrito para vaciarlo,
        // actualizar los valores en pantalla y guardar el estado del carrito en localStorage.
        cartItems.forEach(id => this.removeItem(id));

        // Vacio tambien el DOM del cart sidebar.
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart(); // cierro el carrito al terminar.
    }

    //Metodo para eliminar del carrito, pero NO del DOM del cart sidebar. -> lo hago aparte.
    removeItem(id) {
        // Filtro el cart con los que no sean el elemento a eliminar.
        let removed = cart.find(item => item.id == id);
        console.log(`${removed.name} removido del carrito.`);
        cart = cart.filter(item => item.id != id);
        console.log(`cart is now:`, cart);
        this.setCartValues(cart); // actualizo valores
        Storage.saveCart(cart); //guardo el estado del carrito en localStorage

        if (cart.length === 0) {
            this.hideCompleteBtn();
        }
    }
    // paymentModal
    paymentModal() {
        paymentModal__close.addEventListener("click", () => {
            paymentModal__container.classList.add("hide");
        });
    }
    showCompleteBtn() {
        completeBtn.classList.remove("hide");
    }
    hideCompleteBtn() {
        completeBtn.classList.add("hide");
    }
    // paymentModal
}
