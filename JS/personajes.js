
//Pedir el id del formulario principal
const url_parametro = new URLSearchParams(window.location.search);
const id = url_parametro.get('id') //Valor del id del anime anteriormente seleccionado para hacer consultas a la API 


const query_info_personajes = `https://api.jikan.moe/v4/characters/${id}`
const section_character = document.querySelector(".section_character")

try {
    fetch(query_info_personajes)
        .then(resp => resp.json())
        .then(info => {
            info_anime = ` 
                <img class="img_personaje" loading="lazy" src="${info.data.images.jpg.image_url}"/>
                <div class="contenedor__info_character">
                    <p class=" info_principal" loading="lazy">Name: <span class="span_anime">${info.data.name}</span></p>
                    <p class=" info_principal" loading="lazy">Kanji: <span class="span_rank">${info.data.name_kanji}</span></p>
                    <p class=" info_principal" loading="lazy">About: <span class="span_rank">${info.data.about}</span></p>
                </div>
            `
            section_character.innerHTML += info_anime;
        });
} catch (error) {
    console.error(error);
}