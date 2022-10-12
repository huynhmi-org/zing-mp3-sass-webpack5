const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('#playlist-list');
const player = $('#player');
const progress = $('#progress-song');
const volume = $('#progress-volume');
const audio = $('.player-audio');
const timer = $('#current-time');
const duration = $('#duration');

const App = {
    isPlay: false,
    songs : [
        {
            name: 'Until you',
            url: 'https://x2convert.com/vi/Thankyou?token=U2FsdGVkX1%2fd1rc1po0QSKH3dd%2bDBGD%2btFGxC4ORm1GToYAQSJZmlqevTTvgmSy5%2bwAevNcUgnsk9w1DtrbEUdKj0llUsjaQECNas5EorRd514dnmzwUfxeI%2bI2rojcWqYZ93hlRljNNq2SFq0CtFHD9XFA0L%2bhhLiwXhGcDI5A%3d&s=youtube&id=&h=2519495004921941749',
            cover: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/d/0/5/2/d052d52517be5a83f5e2657c33c9bec9.jpg',
            artist: ['Shayne Ward'],
            vip: false
        },
        {
            name: 'why not me',
            url: 'https://x2convert.com/vi/Thankyou?token=U2FsdGVkX183PEj9rFkOwVYSX30fr9EllvSsZNO2MubAp8bSeIUoCyH6Nvh9UP0tdEviO%2b64omMDEf8QrwKA43Ol8YPsfZ%2fNFqLrA6tdj9BZJ6eEiBpEdoaitD%2bEo%2bRwzptewPR9kNc3A5iMfN6UGg%3d%3d&s=youtube&id=&h=2519495004921941749',
            cover: 'https://theharmonica.vn/wp-content/uploads/2019/09/whynotme.jpg',
            artist: ['Enrique Iglesias'],
            vip: false
        },
        {
            name: 'Proud of you',
            url: 'https://x2convert.com/vi/Thankyou?token=U2FsdGVkX198doW5kX6E%2fz4R1wjfBcr9iplQrWpG%2fw3xUKOyrIruY9biraEtlfSG7Tfa3dRxFW8JQgCxNSL8wkdupH4LMwkRBZeAxyrUfFoVk0gVnpwV7Z37JZXC3r9K&s=youtube&id=&h=2519495004921941750',
            cover: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/covers/f/3/f3ccdd27d2000e3f9255a7e3e2c48800_1365321047.jpg',
            artist: ['Fiona Fung'],
            vip: false
        }
    ],
    currentIndex : 0,
    properties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent() {
        const playBtn = player.querySelector('.play-btn');
        audio.onloadedmetadata = () => {
            playBtn.onclick = () => {
                this.isPlay ? audio.pause() : audio.play();
            }

            duration.textContent = this.formatTime(audio.duration);
            
        }

        audio.onplay = () => {
            this.isPlay = true;
            player.classList.add('player--playing');
        }

        audio.onpause = () => {
            this.isPlay = false;
            player.classList.remove('player--playing');
        }

        audio.ontimeupdate = () => {
            const time = audio.currentTime;
            progress.value = time/audio.duration * 100 || 0;
            timer.textContent = this.formatTime(time);
        }

        progress.oninput = function() {
            const timeChange = this.value/100 * audio.duration;
            audio.currentTime = timeChange;
        }

    },
    formatTime(time = 1000) {
        let [m,s] = [(time/60).toFixed(0)*1, (time%60).toFixed(0)*1];
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;

    },
    renderList() {
        const html = this.songs.map((song, index) => {
                return `
                    <div class="${index == this.currentIndex ? 'media-current': ''}">
                        <div 
                            class="
                                media media--s 
                                ${song.vip ? 'media--vip' : ''} 
                                " 
                                data-id=${index}
                            >
                            <div class="media-cover">
                                <img src="${song.cover}" alt="Cover" class="media-cover__img">
                                <button class="media-play-btn">
                                    <i class="media-play-btn__icon media-play-btn__icon--pause fa-solid fa-play"></i>
                                    <i class="media-play-btn__icon media-play-btn__icon--play fa-solid fa-pause"></i>
                                </button>
                            </div>
                            <div class="media-content">
                                <div class="media-content-header">
                                    <span class="media__title">${song.name}</span>
                                    <span class="media__vip-label">vip</span>
                                </div>
                                <div class="media-list-subtitle">
                                    ${song.artist.map(name => `<a href="" class="media__subtitle media__subtitle--link">${name}</a>`).join(', ')}
                                </div>
                            </div>
                            <button class="media-favorite-btn">
                                <i class="media-favorite-btn__icon media-favorite-btn__icon--love fa-solid fa-heart"></i>
                                <i class="media-favorite-btn__icon media-favorite-btn__icon--unlove fa-regular fa-heart"></i>
                            </button>
                            <div class="media-options has-tooltip">
                                <i class="media-options__icon fa-solid fa-ellipsis"></i>
                                <span class="tooltip">
                                    <span class="tooltip__content">
                                        Khác
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                `
        }).join('');
        playlist.innerHTML = html;
    },
    renderCurrentSong() {
        const media = `
            <div class="media ${this.currentSong.vip ? 'media--vip' : ''}">
                <div class="media-cover media-cover--medium">
                    <img src="${this.currentSong.cover}" alt="Cover" class="media-cover__img">
                </div>
                <div class="media-content">
                    <div class="media-content-header">
                        <a href="" class="media__title">${this.currentSong.name}</a>
                        <span class="media__vip-label">vip</span>
                    </div>
                    <div class="media-list-subtitle">
                        ${this.currentSong.artist.map(
                            name => `<a href="" class="media__subtitle media__subtitle--link">${name}</a>`
                        ).join()}
                    </div>
                </div>
                <button class="media-favorite-btn">
                    <i class="media-favorite-btn__icon media-favorite-btn__icon--love fa-solid fa-heart"></i>
                    <i class="media-favorite-btn__icon media-favorite-btn__icon--unlove fa-regular fa-heart"></i>
                </button>
                <div class="media-options has-tooltip">
                    <i class="media-options__icon fa-solid fa-ellipsis"></i>
                    <span class="tooltip tooltip--above">
                        <span class="tooltip__content">
                            Xem thêm
                        </span>
                    </span>
                </div>
            </div>
        `
        player.querySelector('.player-song').innerHTML = media;
        audio.src = this.currentSong.url;
    },
    start() {
        this.renderList();
        this.properties();
        this.renderCurrentSong();
        this.handleEvent();
    }
}


App.start();
