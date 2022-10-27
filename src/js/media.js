import APIController from "./apiController.js";
import Media from "./app.js";
import {default as PLAYER} from "./player.js";
import createToastMessage from "./toastMessage.js";

const toast = createToastMessage({
	position: 'fixed',
    left: '20px',
    bottom: 'calc($player-height + 30px)'
}, 2000);


// enabled song in new release
(() => {
    addEventListener('click', (e) => {
        const target = e.target;
        // play music
        if (target.closest('.media-play-btn') && target.closest('.tabs')) {
            const btn = target.closest('.media-play-btn');
            const media = btn.closest('.media');
            const id = media.dataset.id;
            APIController.getToken()
                .then((token) => APIController.getTrack(token, id))
                .then(track => {
                    const url = track.preview_url;
                    if (url) {
                        // set songs temp
                        track = {
                            name: track.name,
                            vip: false,
                            artist: track.artists.map(artist => artist.name),
                            cover: track.album.images[0].url,
                            url: track.preview_url
                        };

                        // remove active meida and enable new active media when click
                        const mediaAct = document.querySelector('.media.media--active');
                        mediaAct && mediaAct.classList.remove('media--active');
                        media.classList.add('media--active');
                        PLAYER.playSongFromTabs(track);
                        
                    } else {
                        toast('Sorry, url is not available to play!');
                    }
                })
                
        // show the toast message
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

