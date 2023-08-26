
//Pedir el id del formulario principal
const url_parametro = new URLSearchParams(window.location.search);
const id = url_parametro.get('id') //Valor del id del anime anteriormente seleccionado para hacer consultas a la API 

// Consultas a la API
const query_personajes = `https://api.jikan.moe/v4/anime/${id}/characters`
const query_pictures = `https://api.jikan.moe/v4/anime/${id}/pictures`

const contenedor__personajes__main = document.querySelector(".contenedor__personajes__main")
const contenedor__personajes__ramdom = document.querySelector(".contenedor__personajes__ramdom")
let contenedor__pictures = document.querySelector(".contenedor__pictures")

// Auxiliares para llenar el HTML
let personajes = ""
let pictures = ""

// Varible para identificar el personaje nulo de la api
let texto__invalido = "questionmark"

try {
    fetch(query_personajes)
        .then(resp => resp.json())
        .then(info => {
            // LLenar contenedor de personajes
            info.data.map((items, index) => {
                
                /*
                url_personaje: Esta variable tiene como función transformar la url en un string para comprobar 
                si dentro de la url contiene la imagen del personaje en su dirección para 
                mostrarlo o no en pantalla y omitirla con un mensaje en consola ubicando 
                la posición de las imagenes con este problema
                */
                let url_personaje = `"${items.character.images.webp.image_url}"`

                // Comprueba si encuentra la imagen del personaje dentro de la api y si no la encuentra no la muestra en pantalla e imprime la posición de cada una de estas
                if (url_personaje.includes(texto__invalido) != true) {

                    // Clasifica a los personajes principales y los de supporting, en donde los ubica a cada uno en su divisón
                    if(items.role === "Main"){
                        personajes = ` 
                        <div class="swiper mySwiper">
                        <img class="img__char img_numero${index}" src="${items.character.images.webp.image_url}" alt="Imagen">
                        <h1 class="name__anime">${items.character.name}</h1>
                        </div> 
                        `
                        contenedor__personajes__main.innerHTML += personajes;
                    }else{
                        personajes = ` 
                        <div class="swiper mySwiper">
                        <img class="img__char img_numero${index}" src="${items.character.images.webp.image_url}" alt="Imagen">
                        <h1 class="name__anime">${items.character.name}</h1>
                        </div> 
                        `
                        contenedor__personajes__ramdom.innerHTML += personajes;
                    }

                } else {
                    console.log("Se encontro una incognita en la posición ", index)
                }


            });
            console.log(info)
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




