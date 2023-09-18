

// we access Element by DOM Api and stores element in variable 
var container = document.getElementById('movies');
var search = document.getElementById('searchMovie');

// this is Api key we get it from OMDb website(IMDb Api)
const apiKey = '470efe52';

// geting the movie id and details
let id = '';
const urlParams = new URLSearchParams(location.search);
for (const [key, value] of urlParams) {
    id = value;
    console.log('id', id)
}

const fetchMovies = async (searchTerm) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${searchTerm}`);
    const data = await response.json();
    console.log("data",data);
    getMovies(data);
  };

  fetchMovies(id);






function getMovies(myJson) {
  
    // get the background image for the page 
    document.body.style.backgroundImage = `url(${myJson.Poster})`;
    var movieDiv = document.createElement('div');
    movieDiv.classList.add('each-movie-page');



    // html for the movie details page 
    movieDiv.innerHTML = `
        <div class="movie-poster">
            <img src=${myJson.Poster} alt="Poster">
        </div>
        <div class="movie-details">
            <div class="title">
                ${myJson.Title}
            </div>

            <div class="tagline">${myJson.Genre}</div>

            <div style="display: flex;"> 
                <div class="movie-duration">
                    <b><i class="fas fa-clock"></i></b> ${myJson.Runtime}
                </div>
                <div class="release-date">
                    <b>Raleased</b>: ${myJson.Released}
                </div>
            </div>

            <div class="rating">
                <b>IMDb Rating</b>: ${myJson.imdbRating}
            </div>

           
          
            <div class="plot">
                ${myJson.Plot}
            </div>
        </div>
    `;
//    now append this upcoming html in movie display container 
    document.getElementById('movie-display').appendChild(movieDiv);
}
