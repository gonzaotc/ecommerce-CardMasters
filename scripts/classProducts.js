class Products {
    // obtencion de productos de forma asincrona.
    async getProducts() {
        try {
            console.log(`getProducts() - fetch started..`);
            let result = await fetch("https://myjson.dit.upm.es/api/bins/442l");
            let data = await result.json();
            let products = data.products;
            console.log(`getProducts() - fetch completed! ${products.length} products fetched`);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    //Calculos básicos sobre los productos.
    calculate(products) {
        for (let product of products) {
            product.energyCost = Math.round((product.consumption * HOURS * DAYS) / 1000 * DOLARBLUE * KWH);
            product.production = Math.round(product.hashrate * DAYS * DOLARBLUE);
            product.income = Math.round(product.production - product.energyCost);
            product.rentability = Math.round(product.price / product.income);
        }
        return products;
    }
}
