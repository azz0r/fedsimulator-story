const slides = [
    {
        id: "0",
        type: "scene",
        text: "intro",
    },
    {
        id: "1",
        type: "match",
        text: "win this match",
        options: {
            competitors: 2
        }
    }
]

const app = () => {
    let currentSlide = 0;

    return slides[currentSlide].text;
}

document.getElementById('output').innerHTML = app();