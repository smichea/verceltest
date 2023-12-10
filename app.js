document.getElementById('movieForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const movieName = document.getElementById('movieName').value;
    const response = await fetch(`/api/search?movieName=${encodeURIComponent(movieName)}`);
    const movies = await response.json();

    const results = document.getElementById('results');
    results.innerHTML = movies.map(movie => `<p>${movie.name}</p>`).join('');
});
