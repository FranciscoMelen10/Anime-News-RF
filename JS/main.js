// Obtén la referencia al elemento de entrada de texto y a la imagen
const SwitchLB = document.querySelector('.SwitchLB');

SwitchLB.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    SwitchLB.classList.toggle('active');
});

let informacion

const API = "https://api.jikan.moe/v4/anime"
const section_anime = document.querySelector(".section_anime")

try {
    fetch(API)
        .then(resp => resp.json())
        .then(info => {
            info.data.map((items, index) => {
                informacion = ` 
                <div class="contenedor__anime" onclick="abrir_anime(${items.mal_id})">
                    <div class="contenedor_extra"">
                        <img class="anime-img img-${index}"  src="${items.images.jpg.image_url}" alt="Imagen">
                        <h1 class="title__anime">${items.title}</h1>
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


function abrir_anime(id) {
    const url = `./HTML/anime.html?id=${id}`;
    location.href = url;
}
