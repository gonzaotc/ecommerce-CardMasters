//Instancio la clase para poder usar sus métodos.
const ui = new UI();

// ----------------- Operations class START ------------------- //
class Operations {
    // products: arreglo principal de productos.
    // puedo remover todos los articulos del dom y agregar únicamente los que cumplan ciertas condiciones.

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
                input.value = "";
            });
        }

        // ésto hace que el enter para el buscador funcione únicamente si se lo tiene seleccionado.
        window.addEventListener("keydown", e => {
            if (e.keyCode === 13 && document.activeElement.nextElementSibling !== null) {
                console.log(document.activeElement);
                document.activeElement.nextElementSibling.click();
            }
        });
    }
    // ------------------ searchbar END ------------------ //

    //------------------ filtrar por marca START ------------------ //

    static filterByBrand(products, productsCopy) {
        let filterAMD = document.querySelector("#AMD");
        let filterNVIDIA = document.querySelector("#NVIDIA");

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
                console.log(nvidias);
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
    // ------------------ filtrar por marca END ------------------ //

    // ------------------ ordenar por parametro START ------------------ //
    static sortBy(products, productsCopy) {
        let filterAMD = document.querySelector("#AMD");
        let filterNVIDIA = document.querySelector("#NVIDIA");

        const sortInput = document.querySelector("#sort-input");
        sortInput.addEventListener("change", () => {
            if (sortInput.value == "none") {
                Operations.clearProducts();
                ui.displayProducts(productsCopy);
                console.log(productsCopy);
            } else if (sortInput.value == "maxprice") {
                productsCopy.sort((a, b) => b.price - a.price);
                Operations.clearProducts();
                ui.displayProducts(productsCopy);
                console.log(productsCopy);
            } else if (sortInput.value == "minprice") {
                productsCopy.sort((a, b) => a.price - b.price);
                Operations.clearProducts();
                ui.displayProducts(productsCopy);
                console.log(productsCopy);
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
            ui.getButtons();

            // Si estan activados los botones de filtrado por marca
            // => filtro por marca luego de ordenar.
            // De esta forma funciona el ordenado y el filtrado al mismo tiempo. 
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

        });
    }
}
// ------------------ ordenar por parametro END ------------------ //


// ----------------- Operations class END ------------------- //
