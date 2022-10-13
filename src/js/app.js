const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('#playlist-list');
const player = $('#player');
const progress = $('#progress-song');
const volume = $('#progress-volume');
const volumeBtn = $('.volume-btn');
const audio = $('.player-audio');
const timer = $('#current-time');
const duration = $('#duration');

const preBtn = $('#btn-pre-song');
const nextBtn = $('#btn-next-song');
const randomBtn = $('.shuffle-btn');
const repeatBtn = $('.repeat-btn');
const playBtn = player.querySelector('.play-btn');

const App = {
    isPlay: false,
    isRandom: randomBtn.classList.contains('shuffle-btn--act'),
    isRepeat: false,
    isMute: volumeBtn.classList.contains('volume-btn--mute'),
    volumePre: volume.value/100,
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
        },
        {
            name: 'Xuân thì',
            url: 'https://x2convert.com/vi/Thankyou?token=U2FsdGVkX18YrXGL4K4eie5zSURaebGEt2QGDFXchrpde%2fm%2b1HYe15H2R1l%2bctZd7%2fbLDAqbgyIALvVdcLOIdD1entbsHfvWuztVm%2fMqr58Xw7H32eQJ6h9ilMF61DQsT6rjKa87YyhnToG5pam8AK86xQCYJ%2byzFrIHHtf5UUModKMxmZbxsWwiII9yF02J&s=youtube&id=&h=2519495004921941764',
            cover: 'https://i.ytimg.com/vi/3s1r_g_jXNs/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC9oK-imzQGAmd9s9YxNDtQhboqWQ',
            artist: ['Phan Mạnh Quỳnh'],
            vip: false
        },
        {
            name: 'Đúng cũng thành sai',
            url: 'https://x2convert.com/vi/Thankyou?token=U2FsdGVkX182X8rv52B3NTeN61S3ZvhPS36lGsfsQtV9Ndhif38Qa4Ygf34wT8YI8liBP7wInmLKRbnJmGMBWL%2fDm4pTdHMIe7SSxhZcwoQbx29yFITYJsgn7VL%2bBlqoZCUOKbhk35Aty4kerVBR%2fXnsvGdtm4WEdLAzmnCv8x21s5yDM6NHmsWIeW674Poz&s=youtube&id=&h=2519495004921941765',
            cover: 'https://i.ytimg.com/vi/5_ozB0ImkYA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLADYBPAJZ_AAFQCmB0By4FUjWqqiA',
            artist: ['Mỹ Tâm'],
            vip: false
        },
        {
            name: 'Đừng hỏi em',
            url: 'https://x2convert.com/vi/Thankyou?token=U2FsdGVkX1%2b9LKGJVgld1I2RY6zGLEeRpMqpqxstzjheOy2ssfWJ7jdG48%2fk%2b9oa5LHh9b5xMj5R23bYVJZwbQPclx598MLT1xY2OIe7uD2caf2om9zjiSRgH8Jnh3PFZGkWm%2fPFpRWGoyA8WgKj4Wv1zwiwlY91a6pHpMgox5k%3d&s=youtube&id=&h=2519495004921941765',
            cover: 'https://i.ytimg.com/vi/Z4HivEWoXGE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC7b5WjFz-C5iQCMVwYFVRl9cwUrQ',
            artist: ['Mỹ Tâm'],
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
        audio.onloadeddata = () => {
            playBtn.onclick = () => {
                this.isPlay ? audio.pause() : audio.play();
            }

            duration.textContent = this.formatTime(audio.duration);
            
        }

        progress.oninput = function() {
            const timeChange = this.value/100 * audio.duration;
            audio.currentTime = timeChange;
        }

        nextBtn.onclick = () => {
            this.currentIndex = this.currentIndex === this.songs.length - 1 ? 0 : this.currentIndex + 1;
            this.renderCurrentSong();
            this.updateSongActive();
            this.isPlay = false;
            playBtn.click();
        }

        preBtn.onclick = () => {
            this.currentIndex = this.currentIndex === 0 ? this.songs.length - 1 : this.currentIndex - 1;
            this.renderCurrentSong();
            this.updateSongActive();
            this.isPlay = false;
            playBtn.click();
        }

        randomBtn.onclick = () => {
            this.cleanRepeat();

            randomBtn.classList.toggle('shuffle-btn--act');
            this.isRandom = !this.isRandom;

            this.isRandom ? 
                this.setContentTooltip(randomBtn, 'Tắt phát xáo trộn') : 
                this.setContentTooltip(randomBtn, 'Bật phát xáo trộn');
            
        }

        repeatBtn.onclick = () => {
            this.cleanRandom();
            
            switch (true) {
                case repeatBtn.classList.contains('repeat-btn--one'):
                    this.isRepeat = false;
                    repeatBtn.className = 'player-button has-tooltip repeat-btn';
                    this.setContentTooltip(repeatBtn, 'Bật phát lại tất cả bài hát')
                    break;
                case repeatBtn.classList.contains('repeat-btn--all'):
                    this.isRepeat = 1;
                    repeatBtn.className = 'player-button has-tooltip repeat-btn repeat-btn--one';
                    this.setContentTooltip(repeatBtn, 'Tắt phát lại bài hát');
                    break;
                default:
                    this.isRepeat = 'all';
                    repeatBtn.className = 'player-button has-tooltip repeat-btn repeat-btn--all';
                    this.setContentTooltip(repeatBtn, 'Bật phát lại một bài hát');
                    break;
            }
        }

        playlist.onclick = (e) => {
            const btnPlay = e.target.closest('.media-play-btn');
            if (btnPlay) {
                const media = btnPlay.closest('.media');
                this.currentIndex = media.dataset.id*1;
                this.updateSongActive();
                this.renderCurrentSong();
                this.isPlay = false;
                playBtn.click();
            }
        }

        volumeBtn.onclick = () => {
            audio.volume = this.isMute ? this.volumePre : 0;
        }

        volume.oninput = () => {
            const val = volume.value/100;
            audio.volume = val;
            this.volumePre = val;
        }
        
        audio.onvolumechange = () => {
            if (audio.volume == 0) {
                this.isMute = true;
                volumeBtn.classList.add('volume-btn--mute');
            } else {
                this.isMute = false;
                volumeBtn.classList.remove('volume-btn--mute');
            }
            volume.value = audio.volume * 100;
        }
        

        audio.onplay = () => {
            this.isPlay = true;
            player.classList.add('player--playing');
            this.updateMediaCurrent();
        }

        audio.onpause = () => {
            this.isPlay = false;
            player.classList.remove('player--playing');
            this.updateMediaCurrent();
        }

        audio.ontimeupdate = () => {
            const time = audio.currentTime;
            progress.value = time/audio.duration * 100 || 0;
            timer.textContent = this.formatTime(time);

        }

        audio.onended = () => {
            this.isRandom ? this.handleRandom() : this.isRepeat ? this.handleRepeat() : false;
        }

    },
    cleanRandom() {
        if (this.isRandom) {
            this.isRandom = false;
            randomBtn.classList.remove('shuffle-btn--act');
            randomBtn.className = 'player-button has-tooltip shuffle-btn';
            this.setContentTooltip(randomBtn, 'Bật phát xáo trộn')
        }
    },
    cleanRepeat() {
        if (this.isRepeat) {
            this.isRepeat = false;
            repeatBtn.className = 'player-button has-tooltip repeat-btn';
            this.setContentTooltip(repeatBtn,'Bật phát lại tất cả bài hát');
        }
    },
    setContentTooltip(element, content) {
        element.querySelector('.tooltip__content').textContent = content;
    },
    handleRepeat() {
        switch (this.isRepeat) {
            case 1:
                playBtn.click();                
                break;
            default:
                nextBtn.click();
                break;

        }
    },
    handleRandom() {
        let numberRandom;
        do {
            numberRandom = Math.floor(Math.random() * this.songs.length);
        } while (numberRandom === this.currentIndex);
        
        this.currentIndex = numberRandom;
        this.renderCurrentSong();
        this.updateSongActive();
        playBtn.click();
       
    },
    updateMediaCurrent() {
        const mediaCurrent = $('.media-current .media');
        this.isPlay ? mediaCurrent.classList.add('media--active') : mediaCurrent.classList.remove('media--active');
    },
    updateSongActive() {
        let mediaCurrent = $('.media-current');
        mediaCurrent.querySelector('.media').classList.remove('media--active');
        mediaCurrent.classList.remove('media-current');

        const medias = playlist.querySelectorAll('.media');
        [mediaCurrent] = [...medias].filter(media => media.dataset.id == this.currentIndex);
        mediaCurrent.parentElement.className = 'media-current';
    },
    formatTime(time = 1000) {
        let [m,s] = [parseInt(time/60), (time%60).toFixed(0)*1];
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
            <div class="media ${this.currentSong.vip ? 'media--vip' : ''} media--l">
                <div class="media-cover">
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
