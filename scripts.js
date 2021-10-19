let tarjetas =  [];

class Tarjeta{
    constructor (nombre, marca, precioUsd, precioArs, consumo, hashrate){
        this.nombre = nombre;
        this.marca = marca;
        this.precioUsd = precioUsd;
        this.precioArs = precioArs;
        this.consumo = consumo;
        this.hashrate = hashrate;
    }
}

function añadir(nombre, marca, precioUsd, precioArs, consumo, hashrate){
    let nuevaTarjeta = new Tarjeta (nombre, marca, precioUsd, precioArs, consumo, hashrate);
    tarjetas.push(nuevaTarjeta);
}


añadir('rx570',234,234,234,234,23);
añadir('rx230',234,234,234,234,23);
console.log(tarjetas);