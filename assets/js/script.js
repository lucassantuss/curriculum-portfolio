const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
	body.classList.add(bodyClass)
	btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

	addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)

function abrirLink(url) {
	window.open(url, '_blank');
}

function setupCarousel(carouselSelector, interval = 3500) {
	const carousel = document.querySelector(carouselSelector);
	if (!carousel) return;

	let isDown = false;
	let startX;
	let scrollLeft;
	let autoScroll;

	// Drag com mouse
	carousel.addEventListener('mousedown', (e) => {
		isDown = true;
		carousel.classList.add('dragging');
		startX = e.pageX - carousel.offsetLeft;
		scrollLeft = carousel.scrollLeft;
		clearInterval(autoScroll);
	});

	carousel.addEventListener('mouseleave', () => {
		isDown = false;
		carousel.classList.remove('dragging');
	});

	carousel.addEventListener('mouseup', () => {
		isDown = false;
		carousel.classList.remove('dragging');
		startAutoScroll();
	});

	carousel.addEventListener('mousemove', (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - carousel.offsetLeft;
		const walk = (x - startX) * 2; // velocidade
		carousel.scrollLeft = scrollLeft - walk;
	});

	// Auto-scroll
	function startAutoScroll() {
		autoScroll = setInterval(() => {
			carousel.scrollBy({
				left: carousel.clientWidth,
				behavior: 'smooth'
			});

			// volta pro início se chegar no fim
			if (
				carousel.scrollLeft + carousel.clientWidth >=
				carousel.scrollWidth - 5
			) {
				carousel.scrollTo({ left: 0, behavior: 'smooth' });
			}
		}, interval);
	}

	startAutoScroll();
}

// Ativa nos dois carrosséis
setupCarousel('.experiencias__carousel', 4000);
setupCarousel('.formacoes__carousel', 4500);
