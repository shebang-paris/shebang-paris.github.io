/* eslint-disable max-classes-per-file */

const SVGNS = 'http://www.w3.org/2000/svg';

class DonutMask {

	constructor(id) {

		this.element = document.createElementNS(SVGNS, 'mask');
		this.element.setAttribute('id', id);
		const outerCircle = document.createElementNS(SVGNS, 'circle');
		outerCircle.setAttribute('id', `${id}OuterCircle`);
		outerCircle.setAttribute('cx', 0);
		outerCircle.setAttribute('cy', 0);
		outerCircle.setAttribute('r', 0);
		outerCircle.setAttribute('fill', 'white');
		const innerCircle = document.createElementNS(SVGNS, 'circle');
		innerCircle.setAttribute('id', `${id}InnerCircle`);
		innerCircle.setAttribute('cx', 0);
		innerCircle.setAttribute('cy', 0);
		innerCircle.setAttribute('r', 0);
		innerCircle.setAttribute('fill', 'black');
		this.element.appendChild(outerCircle);
		this.element.appendChild(innerCircle);

		Object.defineProperty(this, 'radius', {
			enumerable: true,
			get: () => 1 + Math.sqrt((this.width / 2) ** 2 + (this.height / 2) ** 2),
		});

		let outerRadius;
		Object.defineProperty(this, 'outerRadius', {
			enumerable: true,
			get: () => outerRadius,
			set: (value) => {
				outerRadius = value;
				outerCircle.setAttribute('r', outerRadius * this.radius);
			},
		});

		let innerRadius;
		Object.defineProperty(this, 'innerRadius', {
			enumerable: true,
			get: () => innerRadius,
			set: (value) => {
				innerRadius = value;
				innerCircle.setAttribute('r', innerRadius * this.radius);
			},
		});

		Object.defineProperty(this, 'width', {
			enumerable: true,
			get: () => 2 * parseInt(outerCircle.getAttribute('cx'), 10),
			set: (value) => {
				const previousInnerRadius = this.innerRadius;
				const previousOuterRadius = this.outerRadius;
				outerCircle.setAttribute('cx', value / 2);
				innerCircle.setAttribute('cx', value / 2);
				this.innerRadius = previousInnerRadius || 0;
				this.outerRadius = previousOuterRadius || 0;
			},
		});

		Object.defineProperty(this, 'height', {
			enumerable: true,
			get: () => 2 * parseInt(outerCircle.getAttribute('cy'), 10),
			set: (value) => {
				const previousInnerRadius = this.innerRadius;
				const previousOuterRadius = this.outerRadius;
				outerCircle.setAttribute('cy', value / 2);
				innerCircle.setAttribute('cy', value / 2);
				this.innerRadius = previousInnerRadius || 0;
				this.outerRadius = previousOuterRadius || 0;
			},
		});

	}

}

let index = 0;

class Mask {

	constructor() {

		index += 1;
		const id = `mask${index}`;
		this.element = document.createElementNS(SVGNS, 'svg');
		this.element.setAttribute('id', id);
		this.element.classList.add('mask');
		const defs = document.createElementNS(SVGNS, 'defs');
		this.mask = new DonutMask(`${id}Mask`);
		defs.appendChild(this.mask.element);
		this.element.appendChild(defs);

		const blur = document.createElementNS(SVGNS, 'filter');
		blur.setAttribute('id', `${id}Blur`);
		const blurFilter = document.createElementNS(SVGNS, 'feGaussianBlur');
		blur.appendChild(blurFilter);
		defs.appendChild(blur);

		const gradient = document.createElementNS(SVGNS, 'linearGradient');
		gradient.setAttribute('id', `${id}Gradient`);
		gradient.setAttribute('x1', 0);
		gradient.setAttribute('x2', 0);
		gradient.setAttribute('y1', 0);
		gradient.setAttribute('y2', 1);
		let stop = document.createElementNS(SVGNS, 'stop');
		stop.setAttribute('offset', '0%');
		gradient.appendChild(stop);
		stop = document.createElementNS(SVGNS, 'stop');
		stop.setAttribute('offset', '100%');
		gradient.appendChild(stop);
		defs.appendChild(gradient);

		const group = document.createElementNS(SVGNS, 'g');
		group.setAttribute('width', '100%');
		group.setAttribute('height', '100%');
		group.setAttribute('mask', `url(#${id}Mask)`);
		this.element.appendChild(group);

		const background = document.createElementNS(SVGNS, 'rect');
		background.classList.add('background');
		background.setAttribute('width', '100%');
		background.setAttribute('height', '100%');
		background.setAttribute('fill', `url(#${id}Gradient)`);
		group.appendChild(background);

		const text = document.createElementNS(SVGNS, 'text');
		text.setAttribute('dominant-baseline', 'hanging');
		text.setAttribute('alignment-baseline', 'hanging');
		text.setAttribute('filter', `url(#${id}Blur)`);
		text.setAttribute('mask', `url(#${id}Mask)`);
		group.appendChild(text);

		const loader = document.createElementNS(SVGNS, 'circle');
		loader.setAttribute('id', `${id}LoaderCircle`);
		loader.setAttribute('class', 'loader');
		loader.setAttribute('cx', 0);
		loader.setAttribute('cy', 0);
		loader.setAttribute('r', 20);
		loader.setAttribute('stroke-linecap', 'round');
		loader.setAttribute('stroke-dasharray', 2 * Math.PI * parseInt(loader.getAttribute('r'), 10));
		loader.setAttribute('stroke-dashoffset', loader.getAttribute('stroke-dasharray'));
		loader.setAttribute('stroke-width', 8);
		loader.setAttribute('stroke', 'black');
		loader.setAttribute('fill', 'transparent');
		loader.setAttribute('mask', `url(#${id}Mask)`);
		this.element.appendChild(loader);

		Object.defineProperty(this, 'outerRadius', {
			enumerable: true,
			get: () => this.mask.outerRadius,
			set: (value) => {
				this.mask.outerRadius = value;
			},
		});

		Object.defineProperty(this, 'innerRadius', {
			enumerable: true,
			get: () => this.mask.innerRadius,
			set: (value) => {
				this.mask.innerRadius = value;
			},
		});

		Object.defineProperty(this, 'x', {
			enumerable: true,
			get: () => text.getAttribute('x'),
			set: (value) => text.setAttribute('x', value),
		});

		Object.defineProperty(this, 'y', {
			enumerable: true,
			get: () => text.getAttribute('y'),
			set: (value) => text.setAttribute('y', value),
		});

		Object.defineProperty(this, 'blur', {
			enumerable: true,
			get: () => blurFilter.getAttribute('stdDeviation'),
			set: (value) => blurFilter.setAttribute('stdDeviation', value),
		});

		Object.defineProperty(this, 'width', {
			enumerable: true,
			get: () => this.element.getAttribute('width'),
			set: (value) => {
				this.element.setAttribute('width', Math.floor(value));
				this.mask.width = Math.floor(value);
				loader.setAttribute('cx', Math.floor(value / 2));
				loader.setAttribute('transform', `rotate(-90, ${loader.getAttribute('cx')}, ${loader.getAttribute('cy')})`);
			},
		});

		Object.defineProperty(this, 'height', {
			enumerable: true,
			get: () => this.element.getAttribute('height'),
			set: (value) => {
				this.element.setAttribute('height', Math.floor(value));
				this.mask.height = Math.floor(value);
				loader.setAttribute('cy', Math.floor(value / 2));
				loader.setAttribute('transform', `rotate(-90, ${loader.getAttribute('cx')}, ${loader.getAttribute('cy')})`);
			},
		});

		Object.defineProperty(this, 'text', {
			enumerable: true,
			get: () => text.textContent,
			set: (value) => {
				text.textContent = value;
			},
		});

		let percentage = 0;
		Object.defineProperty(this, 'loader', {
			enumerable: true,
			get: () => percentage,
			set: (value) => {
				percentage = value;
				loader.setAttribute('stroke-opacity', percentage);
				loader.setAttribute('stroke-dashoffset', parseFloat(loader.getAttribute('stroke-dasharray')) * (1 - percentage));
			},
		});

		let _className; // eslint-disable-line no-underscore-dangle
		Object.defineProperty(this, 'className', {
			enumerable: true,
			get: () => _className,
			set: (value) => {
				this.element.classList.remove(_className);
				_className = value;
				this.element.classList.add(_className);
			},
		});

	}

}

/**
 * Get stack trace
 * @function getStackTrace
 * @returns {Object[]} An array of with function names & file paths
 */

const LINE = /at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?$/;

const getStackTrace = () => {
	const lines = (new Error()).stack.split('\n').slice(1);
	const trace = lines.map((line) => line.match(LINE))
		.map((line) => Object.assign({}, {
			name: line[1],
			fileName: line[2],
			lineNumber: line[3],
			columnNumber: line[4],
		}));
	return trace.slice(1);
};

/**
 * Animation
 * @function animation
 */

const animation = (target, property, easing, start, end, duration, delay, callback) => {
	const distance = end - start;
	let timeStart;
	let timeElapsed;
	const base = {};
	base[property] = start;
	Object.assign(target, base);
	const loop = function loop(time) {
		timeElapsed = time - timeStart;
		const obj = {};
		obj[property] = easing(timeElapsed, start, distance, duration);
		Object.assign(target, obj);
		if (timeElapsed < duration) {
			requestAnimationFrame(loop.bind(this));
		} else {
			obj[property] = (start + distance);
			Object.assign(target, obj);
			if (callback) callback.call();
		}
	};
	const wait = function wait(time) {
		timeElapsed = time - timeStart;
		if (timeElapsed < (delay || 0)) {
			requestAnimationFrame(wait.bind(this));
		} else {
			timeStart = time;
			requestAnimationFrame(loop.bind(this));
		}
	};
	requestAnimationFrame((time) => {
		timeStart = time;
		wait.call(window, time);
	});
};

animation.easingInOut = (t, b, c, d) => {
	let time = t / (d / 2);
	if (time < 1) return ((c / 2) * time * time) + b;
	time -= 1;
	return ((-c / 2) * ((time * (time - 2)) - 1)) + b;
};

const baseURL = getStackTrace()[0].fileName;
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(baseURL.replace(/[^/]+\.js$/, 'sw.js')).then(() => {

	});
}

/* eslint-disable */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-101946239-1', 'auto');
/* eslint-enable */

const pages = {};
const TRANSITION = 500;
const base = document.querySelector('[rel="home"]').getAttribute('href');
const relative = document.querySelector('[rel="canonical"]').getAttribute('href').replace(base, '/');
const real = document.URL.replace(new RegExp(`${relative}$`, 'i'), '/');

let foreground;
let width;
let height;
let titleX;
let titleY;
const resize = () => {
	const bounds = document.querySelector('h1').getBoundingClientRect();
	width = window.innerWidth;
	height = window.innerHeight;
	titleX = bounds.top;
	titleY = bounds.left;
};

const createForeground = (id, caption, first) => {
	if (!foreground) {
		foreground = new Mask();
		foreground.blur = 3;
		foreground.innerRadius = 0;
		foreground.outerRadius = 1;
		foreground.width = width;
		foreground.height = height;
		foreground.x = titleX;
		foreground.y = titleY;
		foreground.text = caption;
		if (!first) foreground.className = id;
		document.body.appendChild(foreground.element);
	}
};

const removeForeground = () => {
	foreground.element.parentNode.removeChild(foreground.element);
	foreground = null;
};

const open = function open(url, first, push) {
	if (first) resize();
	const page = pages[url];
	const container = document.querySelector('.container');
	const main = document.querySelector('main');
	if (!first) {
		const title = document.querySelector('h1');
		title.innerHTML = page.title;
		container.setAttribute('id', page.id);
		document.querySelector('[rel="canonical"]').setAttribute('href', page.canonical);
		main.innerHTML = page.content;
	}
	if (first || push) {
		Array.prototype.slice.call(main.querySelectorAll('[rel="noopener"]')).forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				ga('send', 'event', 'outbound', 'click', link.href, {
					transport: 'beacon',
					hitCallback: () => {
						document.location = link.href;
					},
				});
			});
		});
	}
	document.title = page.documentTitle;
	const loader = document.createElement('div');
	document.querySelector('main').appendChild(loader);
	createForeground(page.id, '', first);
	container.classList.add(page.id);
	if (first) window.history.replaceState(page, page.documentTitle, `${real}${url.substring(1)}`);
	if (push) window.history.pushState(page, page.documentTitle, `${real}${url.substring(1)}`);
	ga('send', 'pageview', document.location.pathname);
	animation(foreground.mask, 'innerRadius', animation.easingInOut, 0, 1, TRANSITION, 0, () => {
		removeForeground();
	});
};

const closeTo = function closeTo(id, caption, callback) {
	createForeground(id, caption);
	foreground.loader = 0;
	animation(foreground.mask, 'innerRadius', animation.easingInOut, 1, 0, TRANSITION, 0, () => {
		const container = document.querySelector('.container');
		container.classList.remove(container.getAttribute('id'));
		container.removeAttribute('id');
		if (callback) callback.call(this);
	});
};

const load = function load(doc, push) {
	const canonical = doc.querySelector('[rel="canonical"]').getAttribute('href');
	const url = canonical.replace(base, '/');
	const main = doc.querySelector('main');
	const data = {
		id: doc.querySelector('.container').getAttribute('id'),
		title: doc.querySelector('h1').innerHTML,
		documentTitle: doc.querySelector('title').textContent,
		content: main.innerHTML,
		canonical,
		url,
	};
	pages[url] = data;
	open(url, doc === document, push);
};

load(document);

window.addEventListener('DOMContentLoaded', () => {
	window.addEventListener('resize', resize);
	resize();
});

const popstate = (e) => {
	const page = pages[e.state.url];
	closeTo(page.id, page.title, () => {
		open(page.url);
	});
};
window.addEventListener('popstate', popstate);

const links = Array.prototype.slice.call(document.querySelector('nav ol').querySelectorAll('a'));
links.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		document.getElementById('toggle').checked = false;
		window.scrollTo(0, 0);
		if (link.href !== document.URL) {
			closeTo(link.getAttribute('data-id'), link.title, () => {
				const url = link.href.replace(base, '/');
				const page = pages[url];
				if (!page) {
					animation(foreground, 'loader', animation.easingInOut, 0, 1, TRANSITION, 0, () => {
						const httpRequest = new XMLHttpRequest();
						httpRequest.addEventListener('readystatechange', () => {
							if (httpRequest.readyState === 4) {
								if (httpRequest.status === 200) {
									const doc = document.implementation.createHTMLDocument('');
									doc.documentElement.innerHTML = httpRequest.responseText;
									load(doc, true);
								}
							}
						});
						httpRequest.open('GET', link.href);
						httpRequest.send();
					});
				} else {
					open(url, false, true);
				}
			});
		}
	});
});
