document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI(); // instancio para poder usar los métodos.
    const productsClass = new Products();

    ui.setupAPP(); // funciones iniciales, obtengo estados posteriores de la página y el localStorage.
    productsClass
        .getProducts() // Me traigo el catálogo de producos (JSON) asíncronicamente. 
        .then(products => {
            Operations.carousel();
            productsClass.calculate(products);
            ui.displayProducts(products);
            Storage.saveProducts(products);

            let productsCopy = [...products];
            Operations.searchByName(products);
            Operations.filterByBrandClick();
            Operations.sortBy(productsCopy);
            Operations.setKWH(products, productsCopy);
        })
        .then(() => {
            ui.getButtons();
            ui.cartLogic();
            ui.paymentModal();
        });
});
