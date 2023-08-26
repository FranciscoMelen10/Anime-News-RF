
//Pedir el id del formulario principal
const url_parametro = new URLSearchParams(window.location.search);
const id = url_parametro.get('id') //Valor del id del anime anteriormente seleccionado para hacer consultas a la API 

// Consultas a la API
const query_personajes = `https://api.jikan.moe/v4/anime/${id}/characters`
const query_pictures = `https://api.jikan.moe/v4/anime/${id}/pictures`


const contenedor__personajes = document.querySelector(".contenedor__personajes")
let contenedor__pictures = document.querySelector(".contenedor__pictures")

// Auxiliares para llenar el HTML
let personajes = ""
let pictures = ""

try {
    fetch(query_personajes)
        .then(resp => resp.json())
        .then(info => {
            // LLenar contenedor de personajes
            info.data.map((items, index) => {
                personajes = ` 
                    <img src="${items.character.images.webp.image_url}" alt="Imagen">
                `
                contenedor__personajes.innerHTML += personajes;
                console.log(index)
            });
        });
} catch (error) {
    console.error(error);
}

try {
    fetch(query_pictures)
        .then(resp => resp.json())
        .then(info => {
            // llenar carusel de pictures del anime
            info.data.map((items) => {
                pictures = ` 
                <swiper-slide>
                    <img src="${items.jpg.image_url}"/>
                </swiper-slide>
                `
                contenedor__pictures.innerHTML += pictures;
            });

        });
} catch (error) {
    console.error(error);
}




