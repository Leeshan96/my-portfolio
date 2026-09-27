export const quotes = [
  'Hey {name},\n\nCuriosity is how every good idea starts. Keep asking questions.',
  'Hey {name},\n\nStay curious. It\'s usually the people who wonder \'what if\' who build the interesting things.',
  'Hey {name},\n\nCuriosity is a compliment to whoever\'s on the other end of it. Thanks for being here.',
  'Hey {name},\n\nInspiration is a signal, not a coincidence. Follow it somewhere.',
  'Hey {name},\n\nGlad something here sparked an idea. That\'s kind of the whole point.',
  'Hey {name},\n\nHold onto that spark — it\'s usually smarter than it feels in the moment.',
  'Hey {name},\n\nKeep that optimism close. It\'s rarer than it should be.',
  'Hey {name},\n\nThe world needs more people who expect good things. Keep going.',
  'Hey {name},\n\nOptimism is a quiet kind of courage. Don\'t lose it.',
  'Hey {name},\n\nThere\'s nothing wrong with just being here. No agenda needed.',
  'Hey {name},\n\nEnjoy the scroll. Not everything has to be productive.',
  'Hey {name},\n\nJust vibing is a valid way to spend your time. Glad you\'re doing it here.',
];

export const funFacts = [
  'Curious what I build when nobody\'s asking? Check out Currently case study.',
  'The Design of Everyday Things was the first design book I read.',
  'I\'m a designer by day, builder at night, a learner at heart.',
  'The decorative line on the work section cards took 6 iterations to sit right at every screen size. Responsive design is 10% vibe coding, 90% patience.',
  'This site was built through prompting and debugging with Claude Code.',
  'I spent 2 hours troubleshooting a slide-up animation blink issue on mobile that turned out to be iOS Reduce Motion being enabled, not the code itself.',
];

export const flowers = [
  { svg: 'orchid.svg',    bgColor: '#fdf2f6' },
  { svg: 'poppy.svg',     bgColor: '#fbe9e7' },
  { svg: 'sunflower.svg', bgColor: '#fdf6e3' },
  { svg: 'tulip.svg',     bgColor: '#fce4ec' },
  { svg: 'daisy.svg',     bgColor: '#E1E6DD' },
  { svg: 'lavender.svg',  bgColor: '#f1edfb' },
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomNote() {
  return {
    quote:   pick(quotes),
    funFact: pick(funFacts),
    flower:  pick(flowers),
  };
}
