// SELECTORES
const cartBtn = document.querySelector(".cart-btn"); //abre el cart sidebar
const closeCartBtn = document.querySelector(".cart__closebtn"); //cierra el cart sidebar
const clearCartBtn = document.querySelector(".cart__footer__clearbtn"); //vacia el carrito

const completeBtn = document.querySelector(".cart__footer__completebtn"); // Abre el modal de compra final.
const paymentModal__close = document.querySelector(".paymentModal__closebtn"); // Cierra el modal de compra final.
const paymentModal__container = document.querySelector(".paymentModal__container"); // contenedor del modal de compra final
const cartorder__content = document.querySelector(".cartorder__content");

const cartItems = document.querySelector(".cart-items"); //cantidad de items en el carrito
const cartTotal = document.querySelector(".cart-total"); //total del carrito

const cartOverlay = document.querySelector(".cart-overlay"); //contenedor externo del cart sidebar
const cartDOM = document.querySelector(".cart"); //contenedor interior del cart sidebar
// Le pongo "DOM" en el nombre para no confundir con el arreglo cart

const productsDOM = document.querySelector(".products"); //contenedor donde inyecto los productos.
// le agrego "DOM" al nombre para no confundirlo con el arreglo productos [json]
const cartContent = document.querySelector(".cart-content"); //contenedor donde inyecto los productos al carrito.

const modalContainer = document.querySelector(".modal-container"); //contenedor externo del modal

const sortInput = document.querySelector("#sort-input");

const filterAMD = document.querySelector("#AMD"); //Boton de filtrar por amd
const filterNVIDIA = document.querySelector("#NVIDIA"); // Boton de filtrar por nvidia

let cart = []; //carrito

//CONSTANTES
const DOLARBLUE = 195;
const DOLAROFICIAL = 110;
let KWH = 0.1; // El usuario lo puede cambiar.
const HOURS = 24; //Cantidad de horas que se usará por día.
const DAYS = 30; //Cantidad de días que se usará por mes.
const IVA = 1.21; // Multiplicador equivalente a 21%.
const IMPUESTOPAIS = 1.3; //Multiplicador equivalente a 30%
