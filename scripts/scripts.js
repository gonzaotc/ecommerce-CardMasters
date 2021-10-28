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
            <button id="comprar">
                comprar
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
    </div>
    `

    container.appendChild(card);
}

