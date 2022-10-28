import APIController from "./apiController.js";
import {default as PLAYER} from "./player.js";
import createToastMessage from "./toastMessage.js";

export default function Track({name, artists, album, preview_url, id}) {
    this.name = name,
    this.artist = artists.map(artist => artist.name),
    this.cover = album.images[0].url,
    this.url = preview_url,
    this.id = id
}


const toast = createToastMessage({
	position: 'fixed',
    left: '20px',
    bottom: 'calc($player-height + 30px)'
}, 2000);


(() => {
    const tabs = document.querySelector('.tabs');

    function resetMediaActiveFromTabs(media) {
        const mediaAct = tabs.querySelector('.media.media--active');
        mediaAct && mediaAct.classList.remove('media--active');
        media.classList.add('media--active');
    }

    addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.media-play-btn') && target.closest('.tabs')) {
            const btn = target.closest('.media-play-btn');
            const media = btn.closest('.media');
            const id = media.dataset.id;
            APIController.getToken()
                .then((token) => APIController.getTrack(token, id))
                .then(track => {
                    const url = track.preview_url;
                    if (url) {
                        track = new Track(track);
                        resetMediaActiveFromTabs(media);
                        PLAYER.addNewSongToPlayList(track);
                        
                    } else {
                        toast('Sorry, url is not available to play!');
                    }
                })
                
        } else if (target.closest('.media-favorite-btn')) {
            const btn = target.closest('.media-favorite-btn');
            console.log(btn);
            const media = btn.closest('.media');
            if (media.classList.contains('media--favorite')) {
                media.classList.remove('media--favorite');
                toast('Đã xóa bài hát khỏi thư viện');
            } else {
                media.classList.add('media--favorite');
                toast('Đã thêm bài hát vào thư viện');
            }
        }
    })
})();

