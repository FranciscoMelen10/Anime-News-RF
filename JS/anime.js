
//Pedir el id del formulario principal
const url_parametro = new URLSearchParams(window.location.search);
const id = url_parametro.get('id') //Valor del id del anime anteriormente seleccionado para hacer consultas a la API 

// Consultas a la API
const query_anime = `https://api.jikan.moe/v4/anime/${id}/full`
const query_personajes = `https://api.jikan.moe/v4/anime/${id}/characters`
const query_pictures = `https://api.jikan.moe/v4/anime/${id}/pictures`

const info__principal__anime = document.querySelector(".info__principal__anime")
const contenedor__personajes__main = document.querySelector(".contenedor__personajes__main")
const contenedor__personajes__ramdom = document.querySelector(".contenedor__personajes__ramdom")
let contenedor__pictures = document.querySelector(".contenedor__pictures")
let sypnosis = document.querySelector(".sypnosis")

// Auxiliares para llenar el HTML
let info_anime = ""
let personajes = ""
let pictures = ""

//Controlador de personajes
var controlador = 0 // Indice de control para imprimir a los personajes en pantalla
let limite = 20 // Limite de fotos para mostrar en pantalla 
let personajes_faltantes = 0 // Se realizara una operación aritmetica para identificar exactamente la cantidad de personajes que faltan de la api 

// Varible para identificar el personaje nulo de la api
let texto__invalido = "questionmark"

//Llenar información general del anime
try {
    fetch(query_anime)
        .then(resp => resp.json())
        .then(info => {
            let fecha_creacion = `${info.data.aired.prop.from.day}/${info.data.aired.prop.from.month}/${info.data.aired.prop.from.year}`
            info_anime = ` 
                <img class="img__info__anime" loading="lazy" src="${info.data.images.jpg.large_image_url}"/>
                    <div class="contenedor__info__anime">
                    <p class="info_name info_principal" loading="lazy">Title: <span class="span_anime">${info.data.title}</span></p>
                    <p class="info_rank info_principal" loading="lazy">Rank: <span class="span_rank">${info.data.rank}</span></p>
                    <p class="info_source info_principal" loading="lazy">Source: <span class="span_source">${info.data.source}</span></p>
                    <p class="info_episodes info_principal" loading="lazy">Total Episodes: <span class="span_episodes">${info.data.episodes}</span></p>
                    <p class="info_from info_principal" loading="lazy">From: <span class="span_info">${fecha_creacion}</span></p>
                </div>
            `
            info__principal__anime.innerHTML += info_anime;

            info_anime = ` 
                <p>${info.data.synopsis}</p>
                `
            sypnosis.innerHTML += info_anime;
        });
} catch (error) {
    console.error(error);
}



//Llenar carrusel
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




/* 
    Para no cargar todas las imagenes de golpe y no tumbar la pagina (Me paso con one piece)
    se hizo esta funcion para cargar a cierto despliegue del scroll carga de 
    20 en 20 imagenes de la api para no consumir todos esos pixeles de una y consumirlo de poco
    a poco para no saturar la pagina
*/

window.onscroll = function () {
    /*
        ¿ Qué hace window.innerHeight + Math.round(window.scrollY)) > document.body.offsetHeight?
        Lo que hace esto es realizar una accion que cuando llegue al final de la pagina, pero al 
        sumarle cierta cantidad, la acción llegaria un poco antes por lo que se le suma a la 
        altura del viewport antes de llegar abajo.
    */
    if ((window.innerHeight + Math.round(window.scrollY)) + 1200 > document.body.offsetHeight) {
        try {
            fetch(query_personajes)
                .then(resp => resp.json())
                .then(info => {
                    cargar_personajes(info)
                });
        } catch (error) {
            console.error(error);
        }
    }
};

//Función para cargar poco a poco las imagenes de la página
function cargar_personajes(info) {

    if (controlador <= info.data.length) {

        //Comprueba que el limite no se sobrepase al tamaño de la api
        if (limite > info.data.length) {
            personajes_faltantes = (info.data.length - controlador)
            limite = (controlador + personajes_faltantes)
            console.log("personajes_faltantes ", personajes_faltantes)
            console.log("limite ", limite)
        }

        for (let index = controlador; index < limite; index++) {
            /*
            url_personaje: Esta variable tiene como función transformar la url en un string para comprobar 
            si dentro de la url contiene la imagen del personaje en su dirección para 
            mostrarlo o no en pantalla y omitirla con un mensaje en consola ubicando 
            la posición de las imagenes con este problema
            */
            let url_personaje = `"${info.data[index].character.images.webp.image_url}"`

            // Comprueba si encuentra la imagen del personaje dentro de la api y si no la encuentra no la muestra en pantalla e imprime la posición de cada una de estas
            if (url_personaje.includes(texto__invalido) != true) {

                // Clasifica a los personajes principales y los de supporting, en donde los ubica a cada uno en su divisón
                if (info.data[index].role === "Main") {
                    personajes = ` 
                    <div class="swiper mySwiper contenedor_personajes">
                    <img class="img__char img_numero${index}" src="${info.data[index].character.images.webp.image_url}" alt="Imagen">
                    <h1 class="name__anime">${info.data[index].character.name}</h1>
                    </div> 
                    `
                    contenedor__personajes__main.innerHTML += personajes;
                } else {
                    personajes = ` 
                    <div class="swiper mySwiper contenedor_personajes">
                    <img class="img__char img_numero${index}" src="${info.data[index].character.images.webp.image_url}" alt="Imagen">
                    <h1 class="name__anime">${info.data[index].character.name}</h1>
                    </div> 
                    `
                    contenedor__personajes__ramdom.innerHTML += personajes;
                }
            }
        }
        controlador += 20 // Aumenta el control de las imagenes para mostrar a los personajes que hacen faltan
        limite += 20 // Se aumenta el limite para seguir buscando el final sin sobrecargar mucho la pagina
    }
}