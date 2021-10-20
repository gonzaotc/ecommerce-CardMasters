// CALCULADORA DE RENTABILIDAD DE TARJETAS GRAFICAS PARA MINADO DE CRYPTOMONEDAS EN ARGENTINA

// PROYECT TODO: 
// Aún no tengo claros todos los impuestos que deben sumarse para la compra del producto en el exterior y su posterior ingreso al país, prontamente serán tenidos en cuenta correctamente. 
// La pagina informará el precio comprando el producto en el exterior y también comprandolo en el país. 
// Más adelante, (se intentara) incorporar scraping para obtener los precios actuales en tiempo real. (del hardware, de las cryptomonedas y del dolar en pesos Argentinos.)
alert("Bienvenido al prototipo de mi calculadora de rendimiento de minado de cryptomonedas, pensada principalmente para Argentina y sus particularidades. \n\nInformará al usuario sobre el rendimiento actual de ésta inversión, teniendo en cuenta las regulaciones y impuestos del país. \n\nRecomendará al usuario las mejores opciones y donde le conviene adquirir el hardware, redireccionando a dichas tiendas (amazon + tiendas regionales). \n\nPor lo pronto, puede pre-visualizar algunas funciones que tendrá la página.")


//CONSTANTES
const DOLARBLUE = 180;
const DOLAROFICIAL = 104;
const KWH = prompt("Ingrese el costo de su KwH (Kilowatt/hora) en usd.\nNota: 0.1 USD aprox para Arg.", 0.1);
console.log(`Su costo de KiloWattHora es de ${KWH} dolares`)
const HORAS = 24; //Cantidad de horas que se usará por día.
const DIAS = 30; //Cantidad de días que se usará por mes.
const IVA = 1.21; // Multiplicador equivalente a 21%. 
const IMPUESTOPAIS = 1.30; //Multiplicador equivalente a 30%

let tarjetas = [];

class Tarjeta{
    constructor (id = 0, nombre = 'default', marca = 'default', precioUsd = 0, precioArs = 0, consumoWatts = 0, hashrateDiarioUsd = 0){
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precioUsd = precioUsd;
        this.precioArs = precioArs;
        this.consumoWatts = consumoWatts;
        this.hashrateDiarioUsd = hashrateDiarioUsd;
                                     //consumo energetico mensual. 
        this.consumoMensual = ((consumoWatts*HORAS*DIAS) / 1000) * DOLARBLUE * KWH;
        this.produccionMensual = hashrateDiarioUsd * DIAS * DOLARBLUE;
        this.gananciaMensual = this.produccionMensual - this.consumoMensual;
    }
}

function añadir(id, nombre, marca, precioUsd, precioArs, consumoWatts, hashrateDiarioUsd){
    let nuevaTarjeta = new Tarjeta (id, nombre, marca, precioUsd, precioArs, consumoWatts, hashrateDiarioUsd);
    
    // añado la tarjeta al arreglo únicamente si no esta repetida.
    for (let element in tarjetas){
        if (tarjetas[element].nombre === nombre){
            console.log('Esa tarjeta ya esta guardada');
        }
    }
    tarjetas.push(nuevaTarjeta);
    console.log(`${nuevaTarjeta.nombre} añadida con éxito.`)
}

//esta función permite añadir mediante prompt, es temporal hasta tener la página completa.
function añadirPrompt(){
    let id = prompt("Agrege el identificador (NÚMERICO) de la tarjeta gráfica a añadir.")
    let nombre = prompt("Ingrese el nombre de la tarjeta a añadir.");
    let marca = prompt("Ingrese la marca de la tarjeta a añadir.");
    let precioUsd = prompt("Ingrese el precio de la tarjeta en USD, si lo conoce.");
    let precioArs = prompt("Ingrese el precio de la tarjeta en pesos, si lo conoce.");
    let consumoWatts = prompt("Ingrese el consumo energetico de la tarjeta.");
    let hashrateDiarioUsd = prompt("Ingrese el hashrate diario de la tarjeta en dolares");

    añadir(id, nombre, marca, precioUsd, precioArs, consumoWatts, hashrateDiarioUsd);
}

function mostrarTarjetas(){
    alert(`ARREGLO DE TARJETAS --> (VISTA EN FORMATO JSON): \n${JSON.stringify(tarjetas)}`);
    console.log("ARREGLO DE TARJETAS (en formato objeto directamente):")
    console.log(tarjetas);
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

//Tarjetas añadidas por defecto inicialmente. 
  //    ID,   NOMBRE,   M,     PU,  PA,    CW,  HRD
añadir(550, 'RX 550', 'AMD',  225,  20000,  50,  0.9);
añadir(560, 'RX 560', 'AMD',  350,  40000,  80,  0.8);
añadir(570, 'RX 570', 'AMD',  420,  60000,  150, 2.3);
añadir(580, 'RX 580', 'AMD',  500, 125000,  185, 2.5);


let exit = false;
while (exit === false){
    let operacion = prompt("Que operacion desea realizar? \n \"añadir\", para añadir una nueva tarjeta. \n \"ver\", para ver las tarjetas guardadas. \n \"ordenar\", para ordenar las tarjetas según un parametro. \n \"informacion\", para ver los datos de una tarjeta en particular. \n \"exit\" para salir. ");

    switch (operacion){
        case 'añadir':
            añadirPrompt();
            break;

        case 'informacion':
            informacionTarjeta();
            break;

        case 'ver': 
            mostrarTarjetas();
            break;

        case 'ordenar':
            let sortParameter = prompt("Según que propiedad desea ordenar las tarjetas \n \"id\" \n \"marca\" \n \"nombre\" \n \"consumoWatts\" \n \"precioUsd\" \n \"precioArs\" \n \"hashrateDiarioUsd\"?");
            // Si el primer elemento del arreglo de tarjetas no tiene la propiedad, no es una prop valida. 
            while (!tarjetas[0].hasOwnProperty(sortParameter)){
                sortParameter = prompt("Esa NO ES una propiedad válida. \n \"id\" \n \"marca\" \n \"nombre\" \n \"consumoWatts\" \n \"precioUsd\" \n \"precioArs\" \n \"hashrateDiarioUsd\" \n \"produccionMensual\" \n \"consumoMensual\" \n \"gananciaMensual\" ");
            }
            ordenarTarjetas(sortParameter);
            break;

        case 'exit':
            exit = true;
            break;

        default:
            alert("Esa no es una opción válida.");
            break;
    }
}

