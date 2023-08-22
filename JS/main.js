// Obtén la referencia al elemento de entrada de texto y a la imagen
const SwitchLB = document.querySelector('.SwitchLB');

SwitchLB.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    SwitchLB.classList.toggle('active');
});
