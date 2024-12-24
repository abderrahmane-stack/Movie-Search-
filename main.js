const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const results = document.getElementById('results');

let api = 'http://www.omdbapi.com/';
let apikey = 'e32c8f96';

async function searchMovies(query) {
  try {
    let response = await fetch(`${api}?s=${query}&apikey=${apikey}`);
    let data = await response.json();

    if (data.Response === "True") {
      results.innerHTML = data.Search.map(
        
        movie => `
                 <div class='movie'>
                    <h2>${movie.Title}</h2>
                    <img src="${movie.Poster}" alt='${movie.Title}' >
                    <p><strong>Year:</strong>${movie.Year }</p>
                  
                  
                     
                    
                 </div>
        `).join('');
    } else {
      results.innerHTML = `<p>No movies found. Try another search please!</p>`;
    }
  } catch (e) {
    results.innerHTML = `<p>Error fetching movies. Please try again later.</p>`;
    console.log('Error', e.message);
  }
}

searchBtn.addEventListener('click', () => {
  let query = searchInput.value.trim();
  console.log('query');
  if (query) {
    searchMovies(query);
  } else {
    results.innerHTML = `<p>Please enter a movie name!</p>`;
  }
});
