window.onload = function(){
    setTimeout($("#onload").fadeOut(),2000)
    $('section').removeClass("hidden")
    $('div').removeClass("hidden")
    $('swiper-container').removeClass("hidden")
    document.getElementById("onload").classList.add("invisible")
}

// Obtén la referencia al elemento de entrada de texto y a la imagen
const SwitchLB = document.querySelector('.SwitchLB');

SwitchLB.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    SwitchLB.classList.toggle('active');
});

//Pedir el id del formulario principal
const url_parametro = new URLSearchParams(window.location.search);
const id = url_parametro.get('id') //Valor del id del anime anteriormente seleccionado para hacer consultas a la API 
const anime = url_parametro.get('anime') //Valor del id del anime anteriormente seleccionado para hacer consultas a la API 
const autor = url_parametro.get('autor') //Valor del id del anime anteriormente seleccionado para hacer consultas a la API 

console.log(anime)
const query_info_personajes = `https://api.jikan.moe/v4/characters/${id}`
const query_personajes = `https://api.jikan.moe/v4/anime/${anime}/characters`

const contenedor_info_principal = document.querySelector(".contenedor_info_principal")

try {
    fetch(query_info_personajes)
        .then(resp => resp.json())
        .then(info => {
            info_anime = ` 
                    <div class="contenedor__info_character">
                    
                        <div class="contenedor__info">
                            <div img_character>
                                <img class="img_personaje" loading="lazy" src="${info.data.images.jpg.image_url}"/>
                            </div>

                            <div class="info_character">
                                <div class="icons_info">
                                    <p class=" info_principal" loading="lazy">Name: 
                                        <span class="span_anime">${info.data.name}</span>
                                    </p>
                                    <box-icon name='user' class="icons" color="white"></box-icon>
                                </div>

                                <div class="icons_info">
                                    <p class=" info_principal" loading="lazy">Kanji: 
                                        <span class="span_rank">${info.data.name_kanji}</span>
                                    </p>
                                    <box-icon name='sushi' class="icons" color="white" type='solid'></box-icon>
                                </div>

                                <div class="icons_info">
                                    <p class="info_principal " loading="lazy">Favorites: 
                                        <span class="span_rank">${info.data.favorites}</span>
                                    </p>
                                    <box-icon name='heart' class="icons" color="red"  type='solid' ></box-icon>
                                </div>

                            </div>
                        </div>
                        <article>
                        <p class="titles">About</p>

                        <span class="span_rank">${info.data.about}</span>
                        </article>
                    </div>


            `
            contenedor_info_principal.innerHTML += info_anime;
        });
} catch (error) {
    console.error(error);
}


const contenedor__autores = document.querySelector(".contenedor__autores")
let autores = ""


//Llenar carrusel
try {
    fetch(query_personajes)
        .then(resp => resp.json())
        .then(info => {
            // llenar carusel de pictures de autores

            for (const iterator of info.data[autor].voice_actors) { 
                autores = ` 
                <div class="swiper-slide contenedor_info_autor">
                    <img src="${iterator.person.images.jpg.image_url}"/>
                    <h1>${iterator.person.name}</h1>
                    <h1>${iterator.language}</h1>
                </div>
                

                    `
                contenedor__autores.innerHTML += autores;
            }

        });
} catch (error) {
    console.error(error);
}
