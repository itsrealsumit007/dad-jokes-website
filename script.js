document.addEventListener('DOMContentLoaded', () => {
    const jokeContainer = document.getElementById('joke');
    const newJokeBtn = document.getElementById('new-joke-btn');
    const shareBtn = document.getElementById('share-btn');
    const categoryInput = document.getElementById('category-input');
    const getJokeByCategoryBtn = document.getElementById('get-joke-by-category');
    const body = document.body;

    // Function to fetch a new joke
    const fetchJoke = async () => {
        jokeContainer.style.opacity = '0';
        jokeContainer.textContent = 'Loading...';
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }
            const data = await response.json();
            jokeContainer.textContent = data.joke;
            jokeContainer.style.opacity = '1'; 

            localStorage.setItem('lastJoke', data.joke);

            changeBackgroundColor();
        } catch (error) {
            console.error('Error fetching joke:', error);
            jokeContainer.textContent = 'Failed to fetch a joke!';

        }
    };


    const fetchJokeByCategory = async (category) => {
        jokeContainer.style.opacity = '0'; 
        jokeContainer.textContent = 'Loading...';
        try {
            const response = await fetch(`https://icanhazdadjoke.com/search?limit=1&term=${category}`, {
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }
            const data = await response.json();
            if (data.results.length > 0) {
                jokeContainer.textContent = data.results[0].joke;
                jokeContainer.style.opacity = '1'; 


                changeBackgroundColor();
            } else {
                jokeContainer.textContent = 'No jokes found for this category.';
            }
        } catch (error) {
            console.error('Error fetching joke by category:', error);
            jokeContainer.textContent = 'Failed to fetch a joke!';

        }
    };


    const changeBackgroundColor = () => {
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        body.style.backgroundColor = randomColor;
    };

    // Event listeners
    newJokeBtn.addEventListener('click', fetchJoke);
    newJokeBtn.addEventListener('mouseover', () => {
        newJokeBtn.style.transform = 'scale(1.1)'; 
    });
    newJokeBtn.addEventListener('mouseout', () => {
        newJokeBtn.style.transform = 'scale(1)'; 
    });

    shareBtn.addEventListener('click', shareJoke);

    getJokeByCategoryBtn.addEventListener('click', () => {
        const category = categoryInput.value.trim();
        if (category) {
            fetchJokeByCategory(category);
        }
    });

    const lastJoke = localStorage.getItem('lastJoke');
    if (lastJoke) {
        jokeContainer.textContent = lastJoke;
    } else {
        fetchJoke(); 
    }
});
