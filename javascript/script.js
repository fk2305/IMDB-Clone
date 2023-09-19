// we access Element by DOM Api and stores element in variable 
var container = document.getElementById('movies');
var search = document.getElementById('searchMovie');
const apiKey = '470efe52'


// Function to fetch movies from the OMDB api

const fetchMovies = async (searchTerm) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
    const data = await response.json();
    console.log(data);
    console.log(data.Search)
    var moviesArray=data.Search;
        moviesArray.forEach(movie => moviesElement(movie));



  };

//Element to display the movies
function moviesElement(movie) {
    console.log(movie.imdbID);
    var movieElement = document.createElement('div');
    movieElement.classList.add('movie-element');
    
    
    movieElement.innerHTML = `
    <a href="./moviePage.html?id=${movie.imdbID}"><img src=${movie.Poster} alt="{movie.id}"></a>
    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <div class="star-fab">
      <div class="add-movie-to-list" id="${movie.imdbID}" onclick="addMovie(id)">
      <span class="icon-color"><i class="fas fa-plus"></i></span>
      </div>
      <span class="icon-color"><i class="fa-solid ">&nbsp;</i>${movie.Year}</span>
    </div>
    </div>
  
    `;
    //  now append this upcoming html in movieElement Container 
    container.appendChild(movieElement);
}

// array to store fav movies 
var favMovies = [];
// this old Movie list array kept previous local storage favorite Movie 
var oldLocalsMov=[];

// function to add movie to fav list 
function addMovie(btnId){
  
    console.log("add to fav" , btnId);
    document.getElementById(btnId).innerHTML = '<span class="icon-color"><i class="fas fa-check"></i></span>';
    
    // to avoid duplicate movies 
    if(!favMovies.includes(btnId.toString())){
        favMovies.push(btnId.toString()); 
    }
    console.log("favmovieS",favMovies);
    // getting array from local storage  
    oldLocalsMov = JSON.parse(localStorage.getItem('MovieArray'));
    console.log(oldLocalsMov);
    if(oldLocalsMov==null){
        // if empty 
        localStorage.setItem('MovieArray', JSON.stringify(favMovies));
    }else{
        // if not empty 
        favMovies.forEach(item=>{
            if(!oldLocalsMov.includes(item)){
                oldLocalsMov.push(item);
            }
        })
        // adding the movie in local storage 
        localStorage.setItem('MovieArray', JSON.stringify(oldLocalsMov));
    }
}



search.addEventListener('keypress', (event)=>{
    // input char in the search box
    if(event.key=='Enter'){
    var input = search.value;
    console.log(input);
   
    if(input.length !=0){
       fetchMovies(input);
    }else{
        window.location.reload();
    }
}
});


