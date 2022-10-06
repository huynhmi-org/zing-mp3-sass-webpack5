'use strict';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// //**************** Button menu setting **************** */
const btnMenuSetting = document.getElementById('menu-setting-button');
const menuSetting = document.getElementById('menu-setting');
btnMenuSetting.onclick = () => {
	menuSetting.classList.toggle('show');
};


// //**************** Slide **************** */
const btnNext = $('.slider-button--next');
const btnPrevious = $('.slider-button--previous');

const slides = $$('.slide-item');

btnNext.onclick = () => {
	const [leftIndex, centerIndex, rightIndex] = getCurrentSlideIndex();
	removeSlidesCurrent(leftIndex, centerIndex, rightIndex);
	
	let increaseIndex = rightIndex == slides.length - 1 ? 0 : rightIndex + 1;

	addSlidesCurrent(centerIndex,rightIndex, increaseIndex);
};

btnPrevious.onclick = () => {
	const [leftIndex, centerIndex, rightIndex] = getCurrentSlideIndex();
	removeSlidesCurrent(leftIndex, centerIndex, rightIndex);
	
	let increaseIndex = leftIndex == 0 ? slides.length - 1 : leftIndex - 1;
	
	addSlidesCurrent(increaseIndex, leftIndex, centerIndex);
};

setInterval(function () {
	btnNext.click();
}, 6000);


function getCurrentSlideIndex() {
	const left = [...slides].findIndex((slide) =>
		slide.classList.contains('slide-item--left')
	);
	const right = [...slides].findIndex((slide) =>
		slide.classList.contains('slide-item--right')
	);
	const center = [...slides].findIndex((slide) =>
		slide.classList.contains('slide-item--center')
	);

	return [left, center, right];
}

function removeSlidesCurrent(leftIndex, centerIndex, rightIndex) {
	slides[leftIndex].classList.remove('slide-item--left');
	slides[centerIndex].classList.remove('slide-item--center');
	slides[rightIndex].classList.remove('slide-item--right');
}

function addSlidesCurrent(leftIndex, centerIndex, rightIndex) {
	slides[leftIndex].classList.add('slide-item--left');
	slides[centerIndex].classList.add('slide-item--center');
	slides[rightIndex].classList.add('slide-item--right');
}



//**************** Handle Tabs **************** */
const btnTabs = $$('.tab-btn');
const tabs = $$('.tab-item');

btnTabs.forEach((btn, index) => {
	btn.onclick = function() {
		const btnTabActive = $('.tab-btn.tab-btn--active');
		btnTabActive.classList.remove('tab-btn--active');

		this.classList.add('tab-btn--active');

		const tabActive = $('.tab-item--active');
		tabActive.classList.remove('tab-item--active');

		tabs[index].classList.add('tab-item--active');
	}
})

//**************** Handle Carousel of New Song **************** */
import carousel from "./carousel.js";

const newSongCarousel = carousel($('#top-new-song-release'));

const newSongCarousel2 = carousel($('#new-song-release'));

const topArtistCarousel = carousel($('#top-artist-carousel'));
topArtistCarousel.handleBtnEvent();

const topRadioCarousel = carousel($('#top-radio'));
topRadioCarousel.handleBtnEvent();

const eventCarousel = carousel($('#events'));
eventCarousel.handleBtnEvent();

setInterval(() => {
	newSongCarousel.handleCarouselNext();
	newSongCarousel2.handleCarouselNext();
	topArtistCarousel.handleCarouselNext();
}, 5000);


