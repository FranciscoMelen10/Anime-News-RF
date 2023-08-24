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
const contenedor_anime = document.querySelector(".contenedor_anime")

try {
    fetch(API)
      .then(resp => resp.json())
      .then(info => {
        info.data.map((items, index) => {  
          informacion = ` 
            <img class="anime-img img-${index}" src="${items.images.jpg.image_url}" alt="Imagen">
          `
          contenedor_anime.innerHTML += informacion
        })
        //agregue un index para que las clases de cada imagen sean distintas y poder editar cada una de manera distinta
      })
  } catch (error) {
    console.error(error);
  }