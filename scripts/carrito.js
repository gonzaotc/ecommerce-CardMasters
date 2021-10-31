let carrito = [];

// Recupero el carrito del localStorage
carritoLocal = JSON.parse(localStorage.getItem("carrito"));
if (carritoLocal != null) {
  carrito = carritoLocal;
}
calcularTotalCarrito();

function agregarAlCarrito(id) {
  carrito.push(arrayTarjetas[id - 1]);
  alert(`${arrayTarjetas[id - 1].nombre} añadida al carrito con éxito.`);

  calcularTotalCarrito();

  //cada vez que agrego al carrito, lo actualizo en el local storage
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Esta funcion actualiza el total$ y la cantidad de productos en el carrito.
function calcularTotalCarrito() {
  let carritoTotal = document.querySelector("#carrito-total");
  let total = carrito.reduce((acc, el) => acc + el.precio, 0);
  carritoTotal.innerText = `${total} $`;

  let carritoProductos = document.querySelector("#carrito-productos");
  carritoProductos.innerText = `${carrito.length}`;

  //Retorno el total por si lo necesito para otra operacion.
  return total;
}

function limpiarCarrito() {
  // Vacio el arreglo y actualizo los valores en pantalla.
  carrito = [];
  //Al vaciar el carrito, lo remuevo tambien del local storage.
  localStorage.removeItem("carrito");
  calcularTotalCarrito();

  alert("Has vaciado el carrito!");
}

function realizarCompra() {
  if (carrito.length === 0) {
    alert("No hay productos en el carrito.");
    return;
  }

  let compra = "Desea confirmar la compra de:\n\n";
  for (let producto of carrito) {
    compra = compra + ` ${producto.nombre}: ${producto.precio}$\n`;
  }
  compra =
    compra +
    `\n Por un total de ${calcularTotalCarrito()}$ \n\n Ingrese "si" para confirmar.\n `;

  let confirmacion = "";
  confirmacion = prompt(compra);

  if (confirmacion.toLowerCase() == "si") {
    // vaciamos el carrito y lo limpiamos del local storage
    carrito = [];
    localStorage.removeItem("carrito");
    calcularTotalCarrito();
    alert("Gracias por su compra!");
  }
}

// boton de confirmacion de compra del carrito
const botonComprar = document.querySelector("#boton-comprar");
botonComprar.addEventListener("click", realizarCompra);

//boton de vaciar el carrito
const botonLimpiar = document.querySelector("#boton-limpiar");
botonLimpiar.addEventListener("click", limpiarCarrito);

//Salvado en local storage del estado del carrito

function juan() {
  a = 2;
  b = 3;
  a = 4;
}
