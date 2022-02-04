const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2e4bf9983e2103372a3ee4ec93e54af7&page=1'
const image_path = "https://image.tmdb.org/t/p/w1280";
const search_input  = document.querySelector("#search");
const search_api = 'https://api.themoviedb.org/3/search/movie?&api_key=2e4bf9983e2103372a3ee4ec93e54af7&query='
const movie_container = document.querySelector('.movie-container');
const form = document.querySelector('#form');
const search = document.querySelector('#search');


movieApp(api_url);

async function movieApp(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
    return respData;
}

function showMovies(movies) {
        movie_container.innerHTML = '';
        movies.forEach((movie) => {
        const {poster_path, title, vote_average,overview} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${image_path + poster_path}"
            alt=${title}>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
            <h4>Overview:</h4>
            ${overview}
            </div>
        `;

        movie_container.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        movieApp(search_api + searchTerm);
        search.value = '';
    }
});

function refresh(){
    window.location.reload();
}