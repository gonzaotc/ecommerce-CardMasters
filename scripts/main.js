document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI(); // instancio para poder usar los métodos.
    const productsClass = new Products();

    ui.setupAPP(); // funciones iniciales, obtengo estados posteriores de la página y el localStorage.
    productsClass
        .getProducts() // Me traigo el catálogo de producos (JSON) asíncronicamente. 
        .then(products => {
            productsClass.calculate(products);
            Storage.saveProducts(products);
            ui.displayProducts(products);
            
            let productsCopy = [...products];
            Operations.setKWH(products, productsCopy);
            Operations.searchByName(products);
            Operations.filterByBrandClick();
            Operations.sortBy(productsCopy);
            Operations.formValidator();
            Operations.carousel();
        })
        .then(() => {
            ui.getButtons();
            ui.cartLogic();
            ui.paymentModal();
        });
});
