// CALCULADORA DE RENTABILIDAD DE TARJETAS GRAFICAS PARA MINADO DE CRYPTOMONEDAS EN ARGENTINA

// PROYECT TODO: 
// Aún no tengo claros todos los impuestos que deben sumarse para la compra del producto en el exterior y su posterior ingreso al país, prontamente serán tenidos en cuenta correctamente. 
// La pagina informará el precio comprando el producto en el exterior y también comprandolo en el país. 
// Más adelante, (se intentara) incorporar scraping para obtener los precios actuales en tiempo real. (del hardware, de las cryptomonedas y del dolar en pesos Argentinos.)


//CONSTANTES
const DOLARBLUE = 195;
const DOLAROFICIAL = 110;
const KWH = 0.1;
const HORAS = 24; //Cantidad de horas que se usará por día.
const DIAS = 30; //Cantidad de días que se usará por mes.
const IVA = 1.21; // Multiplicador equivalente a 21%. 
const IMPUESTOPAIS = 1.30; //Multiplicador equivalente a 30%

// Operaciones básicas sobre las tarjetas.
for (let tarjeta of arrayTarjetas){
    tarjeta.consumoMensual = ((tarjeta.consumoWatts * HORAS * DIAS) / 1000) * DOLARBLUE * KWH;
    tarjeta.produccionMensual = tarjeta.hashrate * DIAS * DOLARBLUE;
    tarjeta.gananciaMensual = tarjeta.produccionMensual - tarjeta.consumoMensual;
    tarjeta.rentabilidad = Math.floor(tarjeta.precio / tarjeta.gananciaMensual);
}

function buscarTarjeta(){

}


function ordenarTarjetas(){

}



//MAIN DEL PROGRAMA.

for (let tarjeta of arrayTarjetas){
    const container = document.querySelector('#cards-container');

    const card = document.createElement('div');
    card.classList.add('card');

    //CARD DEL PRODUCTO
    card.innerHTML = `
    <div class="image-container">
        <img class="card-image" src="${tarjeta.img}">
        <p>${tarjeta.nombre}</p>
        <p>${tarjeta.marca}</p>
    </div>
    <div class="info-container">
        <div class="button-container">
            <button id="gaming">
                gaming
            </button>
            <button id="minado">
                minado
            </button>
        </div>
        <div class="info-gaming">
            <p>FPS promedio: ${tarjeta.gaming}</p>
            <p>extra info gaming</p>
            <p>extra info gaming</p>
        </div>
        <div class="info-minado">
            <p>hashrate: ${tarjeta.hashrate} usd/día</p>
            <p>consumo: ${tarjeta.consumoWatts} watts</p>
            <p>ganancia mensual: ${tarjeta.gananciaMensual}</p>
            <p>meses rentabilidad: ${tarjeta.rentabilidad}</p>
        </div>
        <div class="compra-container">
            <button id="${tarjeta.id}" class="material-icons md-36">
                shopping_cart
            </button>
            <p>añadir al carrito<p>
        </div>
            
    </div>
    `
    container.appendChild(card);

    //EVENTOS DEL PRODUCTO
    //Selecciono el botón de añadir al carrito de la tarjeta
    const botonAñadir = document.getElementById(`${tarjeta.id}`);
    //Si se clickea el botón, se añade la tarjeta al carrito.
    botonAñadir.addEventListener(`click`, () => agregarAlCarrito(`${tarjeta.id}`));
}

//CARRITO

let carrito = [];

function agregarAlCarrito(id) {
    carrito.push(arrayTarjetas[id - 1]);
    alert(`${arrayTarjetas[id - 1].nombre} añadida al carrito con éxito.`);

    calcularTotalCarrito();
}

// Esta funcion actualiza el total$ y la cantidad de productos en el carrito.
function calcularTotalCarrito(){
    let carritoTotal = document.querySelector('#carrito-total');
    let total = carrito.reduce((acc,el) => acc + el.precio, 0);
    carritoTotal.innerText = `${total} $`;

    let carritoProductos = document.querySelector('#carrito-productos');
    carritoProductos.innerText = `${carrito.length}`;

    //Retorno el total por si lo necesito para otra operacion.
    return total; 
}

function limpiarCarrito(){
    // Vacio el arreglo y actualizo los valores en pantalla.
    carrito = [];
    calcularTotalCarrito();
    console.log(carrito);
    alert("Has vaciado el carrito!");
}

function realizarCompra(){
    if (carrito.length === 0){
        return;
    }

    let compra = "Desea confirmar la compra de:\n\n";
    for (let producto of carrito){
        compra = compra + ` ${producto.nombre}: ${producto.precio}$\n`;
    }
    compra = compra + `\n Por un total de ${calcularTotalCarrito()}$ \n\n Ingrese "si" para confirmar.\n `;

    let confirmacion = "";
    confirmacion = prompt(compra);

    if (confirmacion.toLowerCase() == "si"){
        carrito = [];
        calcularTotalCarrito();
        alert("Gracias por su compra!");
}
    }



const botonComprar = document.querySelector('#boton-comprar');
botonComprar.addEventListener('click', realizarCompra);


const botonLimpiar = document.querySelector('#boton-limpiar');
botonLimpiar.addEventListener('click', limpiarCarrito);


