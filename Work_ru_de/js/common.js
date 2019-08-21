let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
});

async function install() {
	if (deferredPrompt) {
		deferredPrompt.prompt();
		console.log(deferredPrompt);
		deferredPrompt.userChoice.then(function (choiceResult) {
			if (choiceResult.outcome === 'accepted') {
				console.log('Your PWA has been installed');
			} else {
				console.log('User chose to not install your PWA');
			}
			deferredPrompt = null;
		});
	}
}




if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('./sw.js').then(function (registration) {
				// Registration was successful
			},
			function (err) {
				// registration failed :(
				console.log('ServiceWorker registration failed: ', err);
			});
	});
}




//Эффект наведения на кнопку
let btn = document.querySelectorAll('.btn');

function hover(el) {
	for (let k = 0; k < el.length; k++) {
		el[k].onmousemove = (e) => {
			const x = e.pageX - e.target.offsetLeft;
			const y = e.pageY - e.target.offsetTop;
			e.target.style.setProperty('--x', `${ x }px`);
			e.target.style.setProperty('--y', `${ y }px`);
		};
	}
}

hover(btn);



//Динамическая дата в футере
let year = document.querySelector('.footer-year');
year.textContent = new Date().getFullYear();


//Кнопка вверх
let goTopBtn = document.querySelector('.back_to_top');
let topElement = document.querySelector('.s-head');

function backToTop() {
	topElement.scrollIntoView({
		block: "center",
		behavior: "smooth"
	});
}

function trackScroll() {
	let scrolled = window.pageYOffset;
	let coords = document.documentElement.clientHeight;

	if (scrolled > coords) {
		goTopBtn.classList.add('back_to_top-show');
	}
	if (scrolled < coords) {
		goTopBtn.classList.remove('back_to_top-show');
	}
}

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);




//Ленивая подгрузка картинок
const options = {
	rootMargin: '0px',
	threshold: 0.1,
};

const handleIntersection = (entries, observer) => {
	entries.forEach(entry => {
		if (entry.intersectionRatio > 0) {
			loadImage(entry.target);
		}
	});
};

const observer = new IntersectionObserver(handleIntersection, options);

const images = document.querySelectorAll('.lazy-load');

images.forEach(img => {
	observer.observe(img);
});

const loadImage = (image) => {
	const src = image.dataset.src;
	fetchImage(src).then(() => {
		image.src = src;
	});
};

const fetchImage = (url) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = url;
		image.onload = resolve;
		image.onerror = reject;
	});
};

if ('IntersectionObserver' in window) {
	// Observer code
	const observer = new IntersectionObserver(handleIntersection, options);
} else {
	// IO is not supported.
	// Just load all the images
	Array.from(images).forEach(image => loadImage(image));
}












//Модальное окно для кнопок
let modalButtons = document.querySelectorAll('.btn-pop-up'),
	overlay = document.querySelector('.pop-up-overlay'),
	blur = document.querySelector('.blur-wrapper'),
	closeButton = document.querySelector('.close-mail');
	buttonMail = document.querySelector('.s-questions btn');



if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(!navigator.userAgent)) {
	buttonMail.classList.remove('btn-pop-up');
} 


modalButtons.forEach(function (item) {
	item.addEventListener('click', function (e) {
		e.preventDefault();
		let modalId = this.getAttribute('data-modal'),
			modalElem = document.querySelector('.pop-up[data-modal="' + modalId + '"]');
		modalElem.classList.add('active');
		overlay.classList.add('active');
		blur.classList.add('blur');
	});
});


closeButton.addEventListener('click', function (e) {
	closeModalMail();
});


document.body.addEventListener('keyup', function (e) {
	let key = e.keyCode;

	if (key == 27) {
		closeModalMail();
	}
}, false);


function closeModalMail() {
	document.querySelector('.pop-up.active').classList.remove('active');
	document.querySelector('.pop-up-overlay').classList.remove('active');
	blur.classList.remove('blur');
}


overlay.addEventListener('click', function () {
	document.querySelector('.pop-up.active').classList.remove('active');
	this.classList.remove('active');
	blur.classList.remove('blur');
});