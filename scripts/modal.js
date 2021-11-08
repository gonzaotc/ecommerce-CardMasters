let abrirModal = document.querySelector('.modal-button');

let modalClose = document.querySelector('.modal-close');

modalClose.addEventListener('click', () => {
    console.log('hey');
    modalContainer.classList.toggle("showModal");
 })


abrirModal.addEventListener('click', () => {
    modalContainer.classList.toggle('showModal');
 })