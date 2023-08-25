const url_parametro = new URLSearchParams(window.location.search);
const id = url_parametro.get('id') //Valor del id del anime anteriormente seleccionado para hacer consultas a la API 

const query_personajes = `https://api.jikan.moe/v4/anime/${id}/characters`
const section__personajes = document.querySelector(".section__personajes")
let personajes = ""

try {
    fetch(query_personajes)
        .then(resp => resp.json())
        .then(info => {
            info.data.map((items) => {
                personajes = ` 
                    <img src="${items.character.images.jpg.image_url}" alt="Imagen">
                `
                section__personajes.innerHTML += personajes;
            });
            console.log(info);
        });
} catch (error) {
    console.error(error);
}

