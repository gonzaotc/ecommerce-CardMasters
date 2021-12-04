//Instancio la clase UI para poder usar sus métodos.
const ui = new UI();

class Operations {
    static clearProducts() {
        // Vacio el productsDOM.
        console.log(`clearProducts() - removed ${productsDOM.children.length} products from productsDOM`);
        while (productsDOM.children.length > 0) {
            productsDOM.removeChild(productsDOM.firstChild);
        }
    }

    // ----------------- searchbar START ----------------- //
    static searchByName(products) {
        let searchButton = [...document.querySelectorAll(".searchbar__button")];

        for (let button of searchButton) {
            button.addEventListener("click", () => {
                let input = button.previousElementSibling; // Cada botón selecciona su input
                let key = input.value.toUpperCase();
                console.log(`Mostrando resultados de la busqueda: "${key}"`);
                let searched = [...products].filter(product => product.name.toUpperCase().includes(key));
                if (searched.length > 0) {
                    // si la busqueda es valida
                    Operations.clearProducts(); // vacio el productsDOM
                    ui.displayProducts(searched); // muestro las coincidencias
                    ui.getButtons(); // les agrego la logica de sus botones
                } else {
                    //Creo el elemento que avisa que no se encontro.
                    Operations.clearProducts(); // vacio el productsDOM
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
                document.querySelector(".products-container").scrollIntoView({ behavior: "smooth" }); // Desplazo suavemente hacia el productsDOM.
                input.value = ""; // Vacio el input
            });
        }

        // ésto hace que el enter para el buscador funcione únicamente si se lo tiene seleccionado.
        window.addEventListener("keydown", e => {
            if (e.keyCode === 13 && document.activeElement.nextElementSibling !== null) {
                document.activeElement.nextElementSibling.click();
            }
        });
    }
    // ------------------ searchbar END ------------------ //

    //------------------ filtrar por marca START ------------------ //
    // Para filtrar por clase me hago dos metodos.
    // La primera es para cambiarlo desde los botones.
    static filterByBrandClick() {
        let amds = document.querySelectorAll(".AMD");
        let nvidias = document.querySelectorAll(".NVIDIA");

        filterAMD.addEventListener("click", () => {
            amds = document.querySelectorAll(".AMD");
            nvidias = document.querySelectorAll(".NVIDIA");
            if (filterAMD.classList.contains("filter-button-active")) {
                filterAMD.classList.remove("filter-button-active");
                nvidias.forEach(element => {
                    element.classList.remove("hide");
                });
            } else {
                if (filterNVIDIA.classList.contains("filter-button-active")) {
                    filterNVIDIA.click();
                }
                filterAMD.classList.add("filter-button-active");
                nvidias.forEach(element => {
                    element.classList.add("hide");
                });
            }
        });

        filterNVIDIA.addEventListener("click", () => {
            amds = document.querySelectorAll(".AMD");
            nvidias = document.querySelectorAll(".NVIDIA");
            if (filterNVIDIA.classList.contains("filter-button-active")) {
                filterNVIDIA.classList.remove("filter-button-active");
                amds.forEach(element => {
                    element.classList.remove("hide");
                });
            } else {
                if (filterAMD.classList.contains("filter-button-active")) {
                    filterAMD.click();
                }
                filterNVIDIA.classList.add("filter-button-active");
                amds.forEach(element => {
                    element.classList.add("hide");
                });
            }
        });
    }

    //Esta segunda funcion es para que los ordenados y el cambio de KHW no desarmen
    // el filtrado y funcionen correctamente al mismo tiempo.
    static filterByBrand() {
        let amds = document.querySelectorAll(".AMD");
        let nvidias = document.querySelectorAll(".NVIDIA");

        if (filterAMD.classList.contains("filter-button-active")) {
            nvidias.forEach(element => {
                element.classList.add("hide");
            });
        }
        if (filterNVIDIA.classList.contains("filter-button-active")) {
            amds.forEach(element => {
                element.classList.add("hide");
            });
        }
    }
    // ------------------ filtrar por marca END ------------------ //

    // ------------------ ordenar por parametro START ------------------ //
    static sortBy(productsCopy) {
        sortInput.addEventListener("change", () => {
            if (sortInput.value == "none") {
                Operations.clearProducts();
                ui.displayProducts(productsCopy);
            } else if (sortInput.value == "maxprice") {
                productsCopy.sort((a, b) => b.price - a.price);
                Operations.clearProducts();
                ui.displayProducts(productsCopy);
            } else if (sortInput.value == "minprice") {
                productsCopy.sort((a, b) => a.price - b.price);
                Operations.clearProducts();
                ui.displayProducts(productsCopy);
            } else if (sortInput.value == "hashrate") {
                productsCopy.sort((a, b) => b.hashrate - a.hashrate);
                Operations.clearProducts();
                ui.displayProducts(productsCopy);
            } else if (sortInput.value == "rentability") {
                productsCopy.sort((a, b) => a.rentability - b.rentability);
                Operations.clearProducts();
                ui.displayProducts(productsCopy);
            } else if (sortInput.value == "gaming") {
                productsCopy.sort((a, b) => b.gaming - a.gaming);
                Operations.clearProducts();
                ui.displayProducts(productsCopy);
            }
            ui.getButtons(); // Obtengo el estado actual de los botones por usos anteriores.
            Operations.filterByBrand(); // Aplico los filtros que estén seleccionados previamente.
        });
    }
    // ------------------ ordenar por parametro END ------------------ //

    //  ------------------- setear valor KHW Start ----------------- //
    static setKWH(products, productsCopy) {
        let prod = new Products(); // Inicializo para poder usar sus métodos
        let kwh__input = document.querySelector("#KWH");
        kwh__input.addEventListener("change", e => {
            KWH = e.target.value;
            prod.calculate(products);
            Operations.clearProducts();
            ui.displayProducts(productsCopy);
            ui.getButtons(); // Obtengo el estado actual de los botones por usos anteriores.
            Operations.filterByBrand(); // Aplico los filtros de marca que esten seleccioandos previamente.
            console.log(`setKHW - KHW price is now ${KWH} usd.`);
            sortInput.dispatchEvent(new Event("change")); // Aplico el filtro de orden.
        });
    }
    //  ------------------- setear valor KHW END ----------------- //

    // ------------ CARROUSEL start ------------ //
    static carousel() {
        const track = document.querySelector(".carousel__track");
        const slides = [...track.children];
        const nextButton = document.querySelector(".carousel__button--right");
        const prevButton = document.querySelector(".carousel__button--left");
        const dotsNav = document.querySelector(".carousel__nav");
        const dots = [...dotsNav.children];

        const slideWidth = slides[0].getBoundingClientRect().width;

        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + "px";
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            if (targetSlide === null) return;
            track.style.transform = "translateX(-" + targetSlide.style.left + ")";
            currentSlide.classList.remove("current-slide");
            targetSlide.classList.add("current-slide");
        };
        const updateDots = (currentDot, targetDot) => {
            if (targetDot === null) return;
            currentDot.classList.remove("current-slide");
            targetDot.classList.add("current-slide");
        };

        nextButton.addEventListener("click", e => {
            const currentSlide = track.querySelector(".current-slide");
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = dotsNav.querySelector(".current-slide");
            const nextDot = currentDot.nextElementSibling;

            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        });

        prevButton.addEventListener("click", e => {
            const currentSlide = track.querySelector(".current-slide");
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = dotsNav.querySelector(".current-slide");
            const prevDot = currentDot.previousElementSibling;

            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
        });

        dotsNav.addEventListener("click", e => {
            const targetDot = e.target.closest("button");
            if (!targetDot) return;
            const currentSlide = track.querySelector(".current-slide");
            const currentDot = dotsNav.querySelector(".current-slide");
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(track, currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
        });
    }
    // ------------ CARROUSEL END ------------ //

    // static formValidator() {
    //     //completeBtn;
    //     //paymentModal__close;
    //     //paymentModal__container
    //     const firstName = document.querySelector("#firstName");
    //     const lastName = document.querySelector("#lastName");
    //     const streetAddress = document.querySelector("#streetAddress");
    //     const zipCode = document.querySelector("#zipCode");
    //     const phoneNumber = document.querySelector("#phoneNumber");
    //     const email = document.querySelector("#email");
    //     const emailOffers = document.querySelector("#emailOffers");
    //     const useAddress = document.querySelector("#useAddress");

    //     const form = document.querySelector("#form");
        
    //     form.addEventListener('submit', e => {
    //         let messages = [];

    //         e.preventDefault();
    //     })
    // }
}
