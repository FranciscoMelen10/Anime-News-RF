# Anime News RF

Proyecto web de practica consumiendo la API de JIKAN usando HTML, CSS y JavaScript.

[![jikan](https://img.shields.io/badge/Documentación-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://docs.api.jikan.moe/#section/Information)

## API Reference

#### Obtiene la información general de todos los animes que contiene la API.

```http
https://api.jikan.moe/v4/anime
```

#### Obtener información de un personaje.

```http
https://api.jikan.moe/v4/anime/${id}/characters
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `Entero` | **Requerido**. ID del personaje |

#### Obtener los datos de un anime (Personajes, información del anime e imágenes).

```http
https://api.jikan.moe/v4/anime/${id}/full
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `Entero` | **Requerido**. ID del anime |

#### Obtiene muchas fotos del anime.

```http
https://api.jikan.moe/v4/anime/${id}/pictures
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `Entero` | **Requerido**. ID del anime |

## Color Reference

| Color           | Hex                                                              |
| --------------- | ---------------------------------------------------------------- |
| Fondo oscuro    | ![#0D1F23](https://via.placeholder.com/10/0D1F23?text=+) #0D1F23 |
| Fondo oscuro 2  | ![#132E35](https://via.placeholder.com/10/132E35?text=+) #132E35 |
| Color de letras | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Bordes          | ![#10f3d9](https://via.placeholder.com/10/10f3d9?text=+) #10f3d9 |

## Authors

- [@Francisco Melendez](https://github.com/FranciscoMelen10)

- @Rene Sandoval

## Tecnologías

<p>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="100px" height="100px"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="100px" height="100px"/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png" alt="html5" width="100px" height="100px"/>
</p>
