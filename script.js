document.addEventListener('DOMContentLoaded', () => {
    const jokeContainer = document.getElementById('joke');
    const newJokeBtn = document.getElementById('new-joke-btn');
    const shareBtn = document.getElementById('share-btn');

    const fetchJoke = async () => {
        jokeContainer.style.opacity = '0';
        jokeContainer.textContent = 'Loading...';
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json();
            jokeContainer.textContent = data.joke;
            jokeContainer.style.opacity = '1'; 
        } catch (error) {
            jokeContainer.textContent = 'Failed to fetch a joke!';
        }
    };

    const shareJoke = () => {
        const joke = jokeContainer.textContent;
        const shareUrl = `https://example.com/share?joke=${encodeURIComponent(joke)}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Check out this Dad Joke!',
                text: joke,
                url: shareUrl,
            })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error sharing', error));
        } else {
            alert(`Share this joke: ${joke}`);
        }
    };

    newJokeBtn.addEventListener('click', fetchJoke);
    newJokeBtn.addEventListener('mouseover', () => {
        newJokeBtn.style.transform = 'scale(1.1)';
    });
    newJokeBtn.addEventListener('mouseout', () => {
        newJokeBtn.style.transform = 'scale(1)'; 
    });

    shareBtn.addEventListener('click', shareJoke);

    fetchJoke();
});
