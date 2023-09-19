
const apiKey = '470efe52';

// getting the fav movies stored in the local storage 
var storageData = localStorage.getItem('MovieArray');
var favMovieArray = JSON.parse(storageData);
// console.log(favMovieArray);


// Function to fetch movies from the OMDB api according to a our search

const fetchMovies = async (searchTerm) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${searchTerm}`);
    const data = await response.json();
    console.log(data)
    favMovieData(data,searchTerm);
  };

  // looping over the fav movie array 
favMovieArray.forEach(async id => {
    console.log("Id",id);
    await fetchMovies(id);
});


// displaying the fav movies here 
function favMovieData(jsonResp, id) {
    var eachListItem = document.createElement('div');
    eachListItem.classList.add('list-item');
    eachListItem.innerHTML = `
        <div class="movie-details">
         
            <div class="thumbnail">
                <a href="./moviePage.html?id=${jsonResp.imdbID}">
                    <img id="movieimg" src=${jsonResp.Poster} alt="Thumbnail">
                <a/>
            </div>
            <div id="details">
                <div class="title">
                <a href="./moviePage.html?id=${jsonResp.imdbID}""> ${jsonResp.Title} </a> 
                </div>
            
                <div class="remove-movie" id='${jsonResp.imdbID}' onclick="deleteMovie(id)">
                <i id="removeicon" class="far fa-trash-alt"></i>
                </div>
            </div>
        </div>

    `;
    document.getElementById('list-container').appendChild(eachListItem);
}


// removing all the movies from the fav list 
// clearing the local storage.
document.getElementById('clear-whole-list').addEventListener('click', function () {
    if (window.confirm("Clear All Favorite Movie List")) {
        localStorage.clear();
        window.location.reload();
    }
});

// deleting single movie from fav array 
async function deleteMovie(id) {
    if (window.confirm('Delete this Movie from Favorite List')) {
        var temp = await JSON.parse(localStorage.getItem('MovieArray'));
        var i = await temp.indexOf(id.toString());
        await temp.splice(i, 1);
        await localStorage.setItem('MovieArray', JSON.stringify(temp));
        await window.location.reload();
    }
}