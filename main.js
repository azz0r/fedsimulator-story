const slides = [
	{
		id: 1,
		type: 'scene',
		text: 'intro',
		options: [
            {
                goto: 2,
                text: "start"
            }
        ]
	},
	{
		id: 2,
		type: 'match',
		text: 'match 1',
		options: [
            {
                goto: 3,
                text: "Win"
            },
            {
                goto: 1,
                text: "Lose"
            }
        ]
	},
	{
		id: 3,
		type: 'scene',
		text: 'cut scene 2',
		options: [
            {
                goto: 4,
                text: "Win"
            }
        ]
    },
	{
		id: 4,
		type: 'decision',
		text: 'decision 2',
        options: [
            {
                goto: 1,
                text: "Start again"
            },
            {
                goto: 3,
                text: "Back 1 stage"
            }
        ]
	}
];

class App {
	constructor(slides) {
        const currentSlideId = localStorage.getItem('currentSlideId') || 1;
        
        this.slides = slides;
        this.rootEl = document.getElementById('output');

        this.setCurrentSlideId(currentSlideId);
        this.updateCurrentSlide();
    }
    
    updateCurrentSlide() {
        this.currentSlide = this.slides.find((item) => item.id === this.currentSlideId);

        this.render();
    }

    setCurrentSlideId(id) {
        this.currentSlideId = Number(id);
        localStorage.setItem('currentSlideId', id);
    }

    createEl = (tag, props = {}) => {
        let element = document.createElement(tag);
        Object.keys(props).forEach((prop) => (element[prop] = props[prop]));
    
        this.rootEl.appendChild(element);
    };

    onClick = (gotoSlideId) => {
        const newSlide = this.slides.find(item => item.id === gotoSlideId);

        if (newSlide) {
            this.setCurrentSlideId(gotoSlideId);
            this.updateCurrentSlide();
        }
    };

    displayCurrentSlide = () =>  this.createEl('div', {
        className: 'current-slide',
        innerText: this.currentSlide.text
    });

    displayOption = (option) =>	this.createEl('div', {
        className: option.text,
        innerText: option.text,
        onclick: () => this.onClick(option.goto)
    });

    render = () => {
        this.clearSlide();
        let currentView = this.displayCurrentSlide();

        this.currentSlide.options.forEach(option => {
            currentView += this.displayOption(option);
        });
        
        return currentView;
    }

    clearSlide = () => this.rootEl.innerHTML = ''
}

new App(slides);
