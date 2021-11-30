// MAIN DEL PROGRAMA

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI(); // instancio para poder usar los métodos.
    const productsClass = new Products();

    ui.setupAPP(); // funciones iniciales, obtengo estados posteriores de la página y el localStorage.
    productsClass
        .getProducts()
        .then(products => {
            productsClass.calculate(products);
            ui.displayProducts(products);
            Storage.saveProducts(products);

            let productsCopy = [...products];
            Operations.searchByName(products, productsCopy);
            Operations.filterByBrandClick(products, productsCopy);
            Operations.sortBy(products, productsCopy);
            Operations.setKWH(products, productsCopy);
        })
        .then(() => {
            ui.getButtons();
            ui.cartLogic();
        });
});
