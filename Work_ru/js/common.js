$(function () {

	//SVG Fallback
	if (!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function () {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function () { //Change
		let th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function () {
			alert("Thank you!");
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if ($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch (err) {

	};

	$("img, a").on("dragstart", function (event) {
		event.preventDefault();
	});

});



$(window).load(function () {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});


//Эффект наведения на кнопку
let btn = document.querySelectorAll('.btn');

function hover(el) {
	for (let k = 0; k < el.length; k++) {
		el[k].onmousemove = (e) => {
			const x = e.pageX - e.target.offsetLeft
			const y = e.pageY - e.target.offsetTop
			e.target.style.setProperty('--x', `${ x }px`);
			e.target.style.setProperty('--y', `${ y }px`);
		}
	}
}

hover(btn);



//Динамическая дата в футере
let year = document.querySelector('.footer-year');
year.textContent = new Date().getFullYear();


//Кнопка вверх
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

function backToTop() {
	let scrollStep = window.pageYOffset / 40;
	if (window.pageYOffset > 0) {
		window.scrollBy(0, -(scrollStep));
		setTimeout(backToTop, 0);
	}
}

let goTopBtn = document.querySelector('.back_to_top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);












let modalButtons = document.querySelectorAll('.btn-pop-up'),
	overlay = document.querySelector('.pop-up-overlay'),
	blur = document.querySelector('.blur-wrapper'),
	closeButtons = document.querySelectorAll('.js-modal-close');


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


closeButtons.forEach(function (item) {
	item.addEventListener('click', function (e) {
		let parentModal = this.closest('.pop-up');

		parentModal.classList.remove('active');
		overlay.classList.remove('active');
	});

}); 


document.body.addEventListener('keyup', function (e) {
	let key = e.keyCode;

	if (key == 27) {

		document.querySelector('.pop-up.active').classList.remove('active');
		document.querySelector('.pop-up-overlay').classList.remove('active');
		blur.classList.remove('blur');
	};
}, false);


overlay.addEventListener('click', function () {
	document.querySelector('.pop-up.active').classList.remove('active');
	this.classList.remove('active');
	blur.classList.remove('blur');
});