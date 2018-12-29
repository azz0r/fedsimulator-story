class App {
	constructor(slides) {
		const currentSlideId = localStorage.getItem('currentSlideId') || 0;

		this.slides = slides;
		this.rootEl = document.getElementById('output');

		this.setCurrentSlideId(currentSlideId);
		this.updateCurrentSlide();
	}

	updateCurrentSlide() {
		this.currentSlide = this.slides.find(({ id }) => id === this.currentSlideId);

		this.render();
	}

	setCurrentSlideId(id) {
		this.currentSlideId = Number(id);
		localStorage.setItem('currentSlideId', id);
	}

	createEl = (tag, props = {}) => {
		let element = document.createElement(tag);
		Object.keys(props).forEach((prop) => (element[prop] = props[prop]));
		element.tabIndex = 0;

		this.rootEl.appendChild(element);
	};

	onClick = (gotoSlideId) => {
		const newSlide = this.slides.find(({ id }) => id === gotoSlideId);

		if (newSlide) {
			this.setCurrentSlideId(gotoSlideId);
			this.updateCurrentSlide();
		} else if (gotoSlideId === 100) {
			window.location = 'https://www.fedsimulator.com';
		}
	};

	displayCurrentSlide = () => {
        const { id, type, text } = this.currentSlide

		return this.createEl('div', {
			className: [ 'slide', 'slide-' + id, type ].join(' '),
			innerText: text
		});
	};

	displayOption = (option) =>
		this.createEl('div', {
			className: 'option',
			innerText: option.text,
			onclick: () => this.onClick(option.goto),
			onkeypress: () => this.onClick(option.goto)
		});

	render = () => {
		this.clearSlide();
		let currentView = this.displayCurrentSlide();

		this.currentSlide.options.forEach((option) => {
			currentView += this.displayOption(option);
		});

		return currentView;
	};

	clearSlide = () => {
		this.rootEl.innerHTML = '';
		this.rootEl.className = 'slide-' + this.currentSlide.id;
	};
}

const slides = [
	{
		id: 0,
		type: 'intro',
		text: 'Fed Sim - story mode',
		options: [
			{
				goto: 1,
				text: 'Start'
			},
			{
				goto: 100,
				text: 'Go to fedsimulator.com'
			}
		]
	},
	{
		id: 1,
		type: 'decision',
		text: 'Its your debut match against Sheamus!',
		options: [
			{
				goto: 2,
				text: 'Start the match with a superkick'
			},
			{
				goto: 2,
				text: 'Start the match with a quick rollup'
			}
		]
	},
	{
		id: 2,
		type: 'loss',
		text: 'Sheamus knows its coming and kicks you right in the face for the 3 count \n\n Vince wants a word',
		options: [
			{
				goto: 3,
				text: 'Go chat to the boss'
			}
		]
	},
	{
		id: 3,
		type: 'scene',
		text:
			'Losing is part of the business - try to make an impact \n\n Show me some ruthless agression, some attitude...',
		options: [
			{
				goto: 4,
				text: 'Vince has an idea...'
			}
		]
	},
	{
		id: 4,
		type: 'decision',
		text: 'We could try tag competition to ease you in... \n\n Do you want to be part of a tag team?',
		options: [
			{
				goto: 5,
				text: 'Yeah, pair me with your best!'
			},
			{
				goto: 26,
				text: "Forget that, I'm born to be a solo star!"
			}
		]
	},
	{
		id: 5,
		type: 'scene',
		text: 'You are teamed with the phenomenal one A.J Styles!! You both decide to work towards the tag titles',
		options: [
			{
				goto: 6,
				text: 'You take over a segment on the tv taping'
			}
		]
	},
	{
		id: 6,
		type: 'scene',
		text: 'Other teams are gathering and things get heated',
		options: [
			{
				goto: 7,
				text: 'A match is being made...'
			}
		]
	},
	{
		id: 7,
		type: 'match',
		text: 'A Tag Team Battle Royal is taking place',
		options: [
			{
				goto: 9,
				text: 'Go for victory: charge at the last competitor'
			},
			{
				goto: 8,
				text: 'Play it cool: wait in the corner and go for a suprise superkick'
			}
		]
	},
	{
		id: 8,
		type: 'win',
		text:
			"You kicked them right out! \n\n You win the Tag Team Battle Royal!! \n\n Now you'll get a tag team championship match at the next pay per view!",
		options: [
			{
				goto: 11,
				text: "We're ready to fight!"
			}
		]
	},
	{
		id: 9,
		type: 'loss',
		text: 'You lost the tournament, nevermind, oh wait the boss wants to have a chat',
		options: [
			{
				goto: 10,
				text: 'Listen to some constructive criticism'
			}
		]
	},
	{
		id: 10,
		type: 'scene',
		text: 'Pull your weight! Lets try rebranding you',
		options: [
			{
				goto: 5,
				text: "Let's repackage your team"
			}
		]
	},
	{
		id: 11,
		type: 'match',
		text: 'Your PPV match begins \n\n You have the advantage - time to finish the Usos off',
		options: [
			{
				goto: 12,
				text: 'Hit the Diving forearm driver'
			},
			{
				goto: 13,
				text: 'Hit the Phenomenal driver!'
			}
		]
	},
	{
		id: 12,
		type: 'loss',
		text: 'No good! It got reversed and now you lost!',
		options: [
			{
				goto: 7,
				text: 'Lets train, work hard and take a shot at the next Battle Royal'
			}
		]
	},
	{
		id: 13,
		type: 'win',
		text: 'One, two, threeeee! \n\n You win! \n\n New Tag Team Champions!',
		options: [
			{
				goto: 14,
				text: "What a night. \n\n Let's go to the next nights TV taping"
			}
		]
	},
	{
		id: 14,
		type: 'match',
		text:
			'You get attacked by the Usos when cutting your promo \n\n You agree to a rematch for the title, right NOW',
		options: [
			{
				goto: 16,
				text: 'You hit the superkick'
			},
			{
				goto: 15,
				text: 'You hit a top rope splash'
			}
		]
	},
	{
		id: 15,
		type: 'loss',
		text: 'They roll out the way and pin you for the three. Ouch - you lost but theres still hope',
		options: [
			{
				goto: 11,
				text: 'Get a rematch the next pay per view'
			}
		]
	},
	{
		id: 16,
		type: 'win',
		text: 'Another victory, now its that time of the year...',
		options: [
			{
				goto: 17,
				text: 'Wrestlemania!'
			}
		]
	},
	{
		id: 17,
		type: 'match',
		text: 'Its your big Wrestlemania match. You face off against the best in the world',
		options: [
			{
				goto: 19,
				text: '...but you still win this match easily'
			},
			{
				goto: 18,
				text: 'You lose... theres always next year...'
			}
		]
	},
	{
		id: 18,
		type: 'scene',
		text: 'Back to working as hard as we can to get to wrestlemania as the champs again!',
		options: [
			{
				goto: 7,
				text: 'Lets do the work'
			}
		]
	},
	{
		id: 19,
		type: 'win',
		text: 'What a victory, your both celebrating in the ring!',
		options: [
			{
				goto: 20,
				text: 'you turn your back...'
			}
		]
	},
	{
		id: 20,
		type: 'scene',
		text: '...grab the chair and smash your partner in the back!',
		options: [
			{
				goto: 21,
				text: '"but why?!" the commentators scream!'
			}
		]
	},
	{
		id: 21,
		type: 'decision',
		text: '"I will tell you why I turned my back on him!" You scream down the microphone',
		options: [
			{
				goto: 22,
				text: "I've always been the one carrying this team, hes nothing compared to me!"
			},
			{
				goto: 23,
				text: 'I wanted to go solo all along - call out the boss to discuss what you want to do next'
			}
		]
	},
	{
		id: 22,
		type: 'scene',
		text: 'You throw down the title and declare you hated A.J Styles all along and you wanted your own freedom',
		options: [
			{
				goto: 24,
				text: 'The boss comes out and accepts the Tag Team Championship, he hands it right over to vacant'
			}
		]
	},
	{
		id: 23,
		type: 'decision',
		text: 'The boss comes out and puts you in a handicap match for the tag titles!',
		options: [
			{
				goto: 24,
				text: 'You lost, quickly'
			}
		]
	},
	{
		id: 24,
		type: 'loss',
		text: 'Now you have lost everything and think its time for a change',
		options: [
			{
				goto: 25,
				text: 'You decide to take the next step'
			}
		]
	},
	{
		id: 25,
		type: 'scene',
		text: 'You have decided its time to prove yourself alone',
		options: [
			{
				goto: 26,
				text: 'Its time to get back in solo competition'
			}
		]
	},
	{
		id: 26,
		type: 'scene',
		text: 'This is a big singles match - lets make it count! You will face...',
		options: [
			{
				goto: 27,
				text: 'AJ Styles'
			}
		]
	},
	{
		id: 27,
		type: 'match',
		text: 'You know each other well - how will you try to win this one?',
		options: [
			{
				goto: 30,
				text: 'Superkick'
			},
			{
				goto: 28,
				text: 'Running powerslam'
			}
		]
	},
	{
		id: 28,
		type: 'loss',
		text:
			'Reversal out of nowhere! You eat a your opponents finisher \n\n You go backstage and the boss is staring you out',
		options: [
			{
				goto: 29,
				text: 'Time for a pep talk'
			}
		]
	},
	{
		id: 29,
		type: 'scene',
		text: '"Sometimes you have to take a half step back to take two forward" - Vince',
		options: [
			{
				goto: 26,
				text: "I'll try harder boss"
			}
		]
	},
	{
		id: 30,
		type: 'win',
		text: 'You win! Thats a big victory!',
		options: [
			{
				goto: 31,
				text: 'Lets take out Randy Orton at pay per view'
			}
		]
	},
	{
		id: 31,
		type: 'match',
		text:
			'Randy Orton controls the start of the match, you see an opening and do some serious leg damage to him - nows your chance',
		options: [
			{
				goto: 32,
				text: 'Set a trap so Randy attempts an RKO - then lock him in a leg crab'
			},
			{
				goto: 28,
				text: 'Kick him in the face and try a leverage pin'
			}
		]
	},
	{
		id: 32,
		type: 'win',
		text: "He didn't see it coming! You've climbed the ladder!!",
		options: [
			{
				goto: 33,
				text: 'Now its time to get a title match'
			}
		]
	},
	{
		id: 33,
		type: 'decision',
		text: 'The boss is so impressed by your win streak he lets you choose the title match',
		options: [
			{
				goto: 34,
				text: 'One on One versus the WWE Champion'
			},
			{
				goto: 39,
				text: 'Triple threat: A.J Styles vs Daniel Bryan vs YOU'
			}
		]
	},
	{
		id: 34,
		type: 'match',
		text:
			'Daniel Bryan is ready for you and controls most the match, how can you possibly beat such a ring technician',
		options: [
			{
				goto: 35,
				text: 'Smash him as hard as you can in the face'
			},
			{
				goto: 37,
				text: 'Try to lock him in a submission'
			}
		]
	},
	{
		id: 35,
		type: 'win',
		text:
			'The champion goes down for the count, you are the NEW WWE Champion! \n\n The former champ is carried off on a stretcher...',
		options: [
			{
				goto: 100,
				text: 'Now go play fedsimulator.com to put DB back on top you fickle player'
			},
			{
				goto: 0,
				text: 'Go back to the start'
			}
		]
	},
	{
		id: 36,
		type: 'scene',
		text: 'new champ scene, the end!',
		options: [
			{
				goto: 100,
				text: 'You win! Now go play some fedsimulator.com'
			},
			{
				goto: 0,
				text: 'Go back to the start'
			}
		]
	},
	{
		id: 37,
		type: 'loss',
		text: 'You should have known a submission victory over Daniel Bryan is impossible - you lose',
		options: [
			{
				goto: 38,
				text: 'What could be next for you?'
			}
		]
	},
	{
		id: 38,
		type: 'scene',
		text: 'You rest up and decide to get face a new up and comer',
		options: [
			{
				goto: 43,
				text: 'Lets face Mustafa Ali'
			}
		]
	},
	{
		id: 39,
		type: 'decision',
		text:
			'The triple threat for the WWE Champioship title is underway... \n\n Daniel Bryan goes hard, you fight hard \n\n AJ Styles controls both of you',
		options: [
			{
				goto: 40,
				text: 'Hit Daniel Bryan with your finisher'
			},
			{
				goto: 42,
				text: 'Hit AJ Styles with your finisher'
			}
		]
	},
	{
		id: 40,
		type: 'win',
		text: 'Daniel stays down for the three, making you the NEW WWE Champion!',
		options: [
			{
				goto: 41,
				text: "It's time to celebrate"
			}
		]
	},
	{
		id: 41,
		type: 'win',
		text: "You've reached the top of WWE - you are now the champ!",
		options: [
			{
				goto: 100,
				text: 'Go play some full fedsimulator.com simulations'
			},
			{
				goto: 0,
				text: 'Go back to the start'
			}
		]
	},
	{
		id: 42,
		type: 'loss',
		text: 'AJ Styles is quick and knows your moveset well - he dodges it and hits the Styles Clash on you!',
		options: [
			{
				goto: 38,
				text: 'What could be next for you?'
			}
		]
	},
	{
		id: 43,
		type: 'match',
		text: 'Mustafa Ali is fast! You go back and forth. After a missed finisher, you see an opening',
		options: [
			{
				goto: 28,
				text: 'Roll up Mustafa Ali'
			},
			{
				goto: 30,
				text: 'Spear Mustafa and try to lock in a submission'
			}
		]
	}
];

new App(slides);
