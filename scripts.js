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
}

function informacionTarjeta(){
    // la función busca una tarjeta que cumpla con el parametro dado. 
    let findProperty = prompt("Por que propiedad quiere buscar la tarjeta? \n \"nombre\" para buscar por nombre \n \"id\" para buscar por id ");
    // Mientras no sea una propiedad valida de busqueda, repetir.
    while (findProperty != 'id' && findProperty != 'nombre'){
        findProperty = prompt("Esa NO ES una propiedad valida para buscar. \n \"nombre\" para buscar por nombre \n \"id\" para buscar por id ")
    }
    let searchKey = prompt(`ingrese el ${findProperty} de la tarjeta.`);
    let found = tarjetas.find(el => el[findProperty] == searchKey)

    if (found == undefined){
        alert("Tarjeta no encontrada.");
        return;
    }
    else{
        alert(`Datos de la tarjeta ${found.nombre}:`);
        alert(`Información de la tarjeta en formato JSON: \n ${JSON.stringify(found)}`);
        console.log(`Información de la tarjeta buscada`)
        console.log(found);
    }
}


function ordenarTarjetas(propiedad){
    tarjetas.sort((a,b) => a[propiedad] - b[propiedad]);
    alert(`lista ordenada por ${propiedad}`);
    console.log(`lista ordenada por ${propiedad}`);
}

//MAIN DEL PROGRAMA.

for (let tarjeta of arrayTarjetas){
    const container = document.querySelector('#cards-container');

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    <h1>${tarjeta.nombre}</h1>
    <img class="card__img" src="${tarjeta.img}">
    `

    container.appendChild(card);
}


