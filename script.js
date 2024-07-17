document.addEventListener('DOMContentLoaded', () => {
    const jokeContainer = document.getElementById('joke');
    const newJokeBtn = document.getElementById('new-joke-btn');

    const fetchJoke = async () => {
        jokeContainer.textContent = 'Loading...';
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json();
            jokeContainer.textContent = data.joke;
        } catch (error) {
            jokeContainer.textContent = 'Failed to fetch a joke!';
        }
    };

    newJokeBtn.addEventListener('click', fetchJoke);
    fetchJoke();
});
