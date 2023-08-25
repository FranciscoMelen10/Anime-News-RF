// Obtén la referencia al elemento de entrada de texto y a la imagen
const SwitchLB = document.querySelector('.SwitchLB');

SwitchLB.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    SwitchLB.classList.toggle('active');
});

/* Primera API (Es mejor porque me permite usar más animes pero es limitada a 100 promesas al dia)

Link de uso: https://rapidapi.com/brian.rofiq/api/anime-db/ 

const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5fb990c64emshec4427b6f88bd84p173791jsn1d626afcd5e5',
        'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
    }
};

try {
    fetch(url, options)
    .then(resp => resp.json())
    .then(info => {
        info.data.map(items => {
            console.log(items.title)
        })
    })
} catch (error) {
    console.error(error);
}

*/



/* 
Segunda API Gratis 

Link de uso: https://docs.api.jikan.moe/#section/Information
*/

let informacion

const API = "https://api.jikan.moe/v4/anime"
const section_anime = document.querySelector(".section_anime")

try {
    fetch(API)
        .then(resp => resp.json())
        .then(info => {
            info.data.map((items, index) => {
                informacion = ` 
                <div class="contenedor__anime">
                    <div class="contenedor_extra">
                        <img class="anime-img img-${index}" src="${items.images.jpg.image_url}" alt="Imagen">
                        <h4 class="title__anime">${items.title}</h4>
                        <h4 class="synopsis__anime">${items.synopsis}</h4>
                    </div>
                </div>
                `
                section_anime.innerHTML += informacion;
            });
            console.log(info);
        });
} catch (error) {
    console.error(error);
}