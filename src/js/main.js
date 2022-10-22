'use strict';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// //**************** Button menu setting **************** */
const btnMenuSetting = document.getElementById('menu-setting-button');
const menuSetting = document.getElementById('menu-setting');
btnMenuSetting.onclick = () => {
	menuSetting.classList.toggle('show');
};


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

//**************** Handle Carousel **************** */
import carousel from "./carousel.js";

const newSongCarousel = carousel($('#top-new-song-release'));

const newSongCarousel2 = carousel($('#new-song-release'));

const topArtistCarousel = carousel($('#top-artist-carousel'));
topArtistCarousel.handleBtnEvent();

const topRadioCarousel = carousel($('#top-radio'));
topRadioCarousel.handleBtnEvent();

const eventCarousel = carousel($('#events'));
eventCarousel.handleBtnEvent();
let intCarousel;
addEventListener('resize', resetIntCarousel);
addEventListener('load', resetIntCarousel);
function resetIntCarousel() {
	intCarousel ? clearInterval(intCarousel) : false;
 	const w = window.innerWidth;
	if (w > 740) {
		intCarousel = setInterval(() => {
			newSongCarousel.handleCarouselNext();
			newSongCarousel2.handleCarouselNext();
			topArtistCarousel.handleCarouselNext();
		}, 5000);
	} 

}



//**************** Handle Player **************** */
import createToastMessage from "./_toastMessage.js";
export const favoriteToast = createToastMessage({
	position: 'fixed',
    left: '20px',
    bottom: 'calc($player-height + 30px)'
}, 2000);

const btnFavorites = $$('.media-favorite-btn');
btnFavorites.forEach( btn => {
	btn.onclick = function() {
		const media = this.closest('.media');

		if (media.classList.contains('media--favorite')) {
			media.classList.remove('media--favorite');
			favoriteToast('Đã xóa bài hát khỏi thư viện');
		} else {
			media.classList.add('media--favorite');
			favoriteToast('Đã thêm bài hát vào thư viện');
		}
	}
})




//**************** Handle Playlist **************** */
const btnTogglePlayList = $('.playlist-toggle-btn');
const sidePlayList = $('.side-playlist');
let isPlayListOpen = sidePlayList.classList.contains('side-playlist--open');

btnTogglePlayList.onclick = function() {
	isPlayListOpen = !isPlayListOpen;
	sidePlayList.classList.toggle('side-playlist--open', isPlayListOpen);
	this.classList.toggle('playlist-toggle-btn--active', isPlayListOpen);
}


const btnSwitchPlayList = $$('.playlist-switch-btn');
console.log(btnSwitchPlayList);
const containerPlaylist = $$('.playlist-container');
btnSwitchPlayList.forEach( (btn, index) => {
	btn.onclick = function() {
		$('.playlist-switch-btn.playlist-switch-btn--active').classList.remove('playlist-switch-btn--active');
		this.classList.add('playlist-switch-btn--active');

		$('.playlist-container.playlist-container--active').classList.remove('playlist-container--active');
		containerPlaylist[index].classList.add('playlist-container--active');
	}
})


//**************** Handle sidebar toggle on tablet **************** */
const sidebar = $('.sidebar');
const btnOpenSidebar = $('#btn-open-sidebar');
const btnCloseSidebar = $('#btn-close-sidebar');

btnOpenSidebar.onclick = () => {
	sidebar.classList.add('sidebar--open');
}

btnCloseSidebar.onclick = () => {
	sidebar.classList.remove('sidebar--open');
}



//**************** Handle sidebar player toggle btn **************** */
const player = $('.player');
const btnTogglePlayer = $('.player-toggle-btn');
let isPlayerOpen = player.classList.contains('player--open');
btnTogglePlayer.onclick = () => {
    isPlayerOpen = !isPlayerOpen;
	player.classList.toggle('player--open', isPlayerOpen);
    btnTogglePlayer.classList.toggle('player-toggle-btn--open', !isPlayerOpen);
    
    $('.sidebar').style.bottom = isPlayerOpen ? '90px': '0px';

	if (!isPlayerOpen) {
		isPlayListOpen ? btnTogglePlayList.click(): false;
	}
}

