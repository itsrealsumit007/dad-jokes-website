document.addEventListener('DOMContentLoaded', () => {
    const jokeContainer = document.getElementById('joke');
    const jokeList = document.getElementById('joke-list');
    const favoriteJokesContainer = document.getElementById('favorite-jokes');
    const newJokeBtn = document.getElementById('new-joke-btn');
    const shareBtn = document.getElementById('share-btn');
    const categoryInput = document.getElementById('category-input');
    const getJokeByCategoryBtn = document.getElementById('get-joke-by-category');
    const sortSelect = document.getElementById('sort-select');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageInfo = document.getElementById('page-info');
    const body = document.body;

    let currentPage = 1;
    let currentCategory = '';
    let currentSort = 'relevance';
    let jokesPerPage = 10;

    const fetchJokes = async (page, category, sort) => {
        jokeList.innerHTML = ''; // Clear previous jokes
        jokeContainer.textContent = 'Loading...';
        try {
            const response = await fetch(`https://icanhazdadjoke.com/search?page=${page}&limit=${jokesPerPage}&term=${category}&sort=${sort}`, {
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch jokes');
            }
            const data = await response.json();
            displayJokes(data.results);
            pageInfo.textContent = `Page ${page}`;
            jokeContainer.textContent = '';
        } catch (error) {
            console.error('Error fetching jokes:', error);
            jokeContainer.textContent = 'Failed to fetch jokes!';
        }
    };

    const displayJokes = (jokes) => {
        jokes.forEach(joke => {
            const jokeElement = document.createElement('div');
            jokeElement.className = 'joke';
            jokeElement.innerHTML = `
                <span>${joke.joke}</span>
                <button class="favorite-btn">❤️</button>
            `;
            jokeList.appendChild(jokeElement);

            jokeElement.querySelector('.favorite-btn').addEventListener('click', () => {
                addFavoriteJoke(joke.joke);
            });
        });
    };

    const addFavoriteJoke = (joke) => {
        const favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
        if (!favorites.includes(joke)) {
            favorites.push(joke);
            localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
            displayFavoriteJokes();
        }
    };

    const displayFavoriteJokes = () => {
        favoriteJokesContainer.innerHTML = '';
        const favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
        favorites.forEach(joke => {
            const jokeElement = document.createElement('div');
            jokeElement.className = 'joke';
            jokeElement.innerHTML = `<span>${joke}</span>`;
            favoriteJokesContainer.appendChild(jokeElement);
        });
    };

    // Function to change background color randomly
    const changeBackgroundColor = () => {
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        body.style.backgroundColor = randomColor;
    };

    // Event listeners
    newJokeBtn.addEventListener('click', () => fetchJokes(currentPage, '', currentSort));
    shareBtn.addEventListener('click', shareJoke);

    getJokeByCategoryBtn.addEventListener('click', () => {
        currentCategory = categoryInput.value.trim();
        if (currentCategory) {
            fetchJokes(currentPage, currentCategory, currentSort);
        }
    });

    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        fetchJokes(currentPage, currentCategory, currentSort);
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchJokes(currentPage, currentCategory, currentSort);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        fetchJokes(currentPage, currentCategory, currentSort);
    });

    // Fetch and display the last fetched joke on page load
    const lastJoke = localStorage.getItem('lastJoke');
    if (lastJoke) {
        jokeContainer.textContent = lastJoke;
    } else {
        fetchJokes(currentPage, '', currentSort); // Fetch a new joke if no joke is stored
    }

    displayFavoriteJokes(); // Display favorite jokes on page load
});
