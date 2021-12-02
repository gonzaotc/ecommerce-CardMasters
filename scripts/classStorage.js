// esta clase contiene mis metodos para manejar el localStorage.
class Storage {
    static saveProducts(products) {
        //guarda los productos en el local storage.
        localStorage.setItem("products", JSON.stringify(products));
        console.log(`saveProducts() - ${products.length} products saved in localStorage.`);
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
        console.log("getCart() - getting the cart from the local storage..");
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    }
}
