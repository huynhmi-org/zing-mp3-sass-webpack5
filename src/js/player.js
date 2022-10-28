import UI from "./ui.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('#playlist-list');
const playlistCurrent = $('.playlist-current');
const player = $('#player');
const playerMobile = $('#player-mobile');

const progress = $$('.progress-song');
const volume = $('#progress-volume');
const volumeBtn = $('.volume-btn');
const audio = $('.player-audio');
const timers = $$('.current-time');
const durations = $$('.duration');

const preBtns = $$('.btn-pre-song');
const nextBtns = $$('.btn-next-song');
const randomBtns = $$('.shuffle-btn');
const repeatBtns = $$('.repeat-btn');
const playBtns = $$('.play-btn');

const tabs = $('.tabs');
const modal = $('.modal');

let PLAYER = {
    isPlay: player.classList.contains('player--playing'),
    isRandom: true,
    isRepeat: false,
    isMute: volumeBtn.classList.contains('volume-btn--mute'),
    volumePre: volume.value/100,
    songs : [],
    currentIndex : null,
    previousIndexs: [],
    tempIndex: false,
    properties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex];
            }
        })
    },
    cdAnimate: null,
    handleEvent() {
        playBtns.forEach(btn => {
            btn.onclick = () => {
                this.isPlay ? audio.pause() : audio.play();
            }
        })
        
        progress.forEach(item => {
            item.oninput = function() {
                const timeChange = this.value/100 * audio.duration;
                audio.currentTime = timeChange;
            }
        })

        nextBtns.forEach(btn => {
            btn.onclick = () => {
                this.tempIndex = this.isRepeat !== 1 && this.currentIndex;
                this.isRandom ? this.handleRandom() : this.handleNext();
                this.removeMediaActFromTab();
            };
        })

        preBtns.forEach(btn => {
            btn.onclick = () => {
                this.handlePrevious();
            };
        })


        randomBtns.forEach(btn => {
            btn.onclick = () => {
                this.cleanRepeat();
    
                btn.classList.toggle('shuffle-btn--act');
                this.isRandom = !this.isRandom;
    
                this.isRandom ? 
                    this.setContentTooltip(btn, 'Tắt phát xáo trộn') : 
                    this.setContentTooltip(btn, 'Bật phát xáo trộn');
            }
        })

        repeatBtns.forEach(btn => {
            btn.onclick = () => {
                this.cleanRandom();
                
                switch (true) {
                    case btn.classList.contains('repeat-btn--one'):
                        this.isRepeat = false;
                        btn.className = 'player-button has-tooltip repeat-btn';
                        this.setContentTooltip(btn, 'Bật phát lại tất cả bài hát')
                        break;
                    case btn.classList.contains('repeat-btn--all'):
                        this.isRepeat = 1;
                        btn.className = 'player-button has-tooltip repeat-btn repeat-btn--one';
                        this.setContentTooltip(btn, 'Tắt phát lại bài hát');
                        break;
                    default:
                        this.isRepeat = true;
                        btn.className = 'player-button has-tooltip repeat-btn repeat-btn--all';
                        this.setContentTooltip(btn, 'Bật phát lại một bài hát');
                        break;
                }
            }
        })
        

        playlist.onclick = (e) => {
            const btnPlay = e.target.closest('.media-play-btn');
            if (btnPlay) {
                this.removeMediaActFromTab();
                const media = btnPlay.closest('.media');
                this.tempIndex = this.currentIndex;
                this.currentIndex = media.dataset.id*1;
                this.removePrevious();
                this.renderPlayer();
                audio.play();
            }

        }

        $('.side-playlist').onclick = this.closePlaylist;
        player.onclick = this.openModal;

        playerMobile.onclick = (e) => {
            this.closeModal(e);
            this.openPlaylist(e);
        };

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
        
        audio.onloadeddata = () => {
            this.isPlay ? audio.play() : audio.pause();
            durations.forEach(item => item.textContent = this.formatTime(audio.duration));
        }

        audio.onplay = () => {
            this.isPlay = true;
            player.classList.add('player--playing');
            playerMobile.classList.add('player--playing');
            this.cdAnimate.play();
            this.addNewPreviousIndex();
            this.renderList();
        }

        audio.onpause = () => {
            this.isPlay = false;
            player.classList.remove('player--playing');
            playerMobile.classList.remove('player--playing');
            this.updatePlayBtnOfMedia();
            this.cdAnimate.pause();
        }

        audio.ontimeupdate = () => {
            const time = audio.currentTime;
            progress.forEach(item => {
                item.value = time/audio.duration * 100 || 0;
            })
            
            timers.forEach(item => item.textContent = this.formatTime(time));

            const progressMobile = player.querySelector('.player-progress-on-mobile');
            if (getComputedStyle(progressMobile).display === 'block') {
                progressMobile.style.width =  `${time/audio.duration * 100 || 0}%`;
            }
        }

        audio.onended = () => {
            if (this.currentIndex === this.songs.length - 1 && !this.isRepeat) return;
            if (this.isRepeat) {
                this.handleRepeat();
            } else {
                nextBtns.forEach(btn => btn.click());
            }
            this.cdAnimate.cancel();
        }

    },
    openModal(e) {
        const target = e.target.closest('.media-content');
        target && modal.classList.add('modal--open');
    },
    closeModal(e) {
        const target = e.target.closest('#btn-close-modal');
        target && modal.classList.remove('modal--open');
    },
    openPlaylist(e) {
        const target = e.target.closest('.player-button.playlist-toggle-btn');
        target && $('.side-playlist').classList.add('side-playlist--open');
    },
    closePlaylist(e) {
        const target = e.target.closest('#btn-close-side-playlist');
        target && $('.side-playlist').classList.remove('side-playlist--open');
    },
    createCDAnimate() {
        this.cdAnimate = playerMobile.querySelector('.player-cd-inner').animate(
            [
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(360deg)' }
            ], 
            {
                duration: 5000,
                iterations: Infinity
            }
        )
        this.cdAnimate.pause();
    },
    cleanRandom() {
        if (this.isRandom) {
            this.isRandom = false;
            randomBtns.forEach(btn => {
                btn.classList.remove('shuffle-btn--act');
                btn.className = 'player-button has-tooltip shuffle-btn';
                this.setContentTooltip(btn, 'Bật phát xáo trộn')
            })
        }
    },
    cleanRepeat() {
        if (this.isRepeat) {
            this.isRepeat = false;
            repeatBtns.forEach(btn => {
                btn.className = 'player-button has-tooltip repeat-btn';
                this.setContentTooltip(btn,'Bật phát lại tất cả bài hát');
            })
        }
    },
    setContentTooltip(element, content) {
        element ?? (element.querySelector('.tooltip__content').textContent = content);
    },
    handleRepeat() {
        switch (this.isRepeat) {
            case 1:
                audio.load();
                break;
            default: 
                this.handleIncreaseIndex();
                break;
        }
        this.renderPlayer();
        audio.play();
    },
    handleRandom() {
        this.currentIndex = this.getRandom();
        this.removePrevious();
        this.renderPlayer();
        audio.play();
    },
    getRandom() {
        let number;
        do {
            number = Math.floor(Math.random() * this.songs.length);
        } while (
            number === this.currentIndex || 
            number === (this.currentIndex === this.songs.length - 1 ? 0 : this.currentIndex + 1) ||
            number === (this.currentIndex === 0 ? this.songs.length - 1 : this.currentIndex - 1)
        );
        return number;
    },
    handleNext() {
        this.currentIndex = this.getNextIndexs()[0];
        this.renderPlayer();
        this.renderList();
        audio.play();
    },
    getNextIndexs() {
        const nextIndexs = [];
        this.songs.forEach((song, index) => {
            if (index == this.currentIndex || this.previousIndexs.includes(index)) return;
            nextIndexs.push(index);
        });
        return nextIndexs;
    },
    handleIncreaseIndex() {
        this.currentIndex = this.currentIndex === this.songs.length - 1 ? 0 : this.currentIndex + 1;
    },
    handlePrevious() {
        this.removeMediaActFromTab();
        if ( this.previousIndexs.length ) {
            this.currentIndex = this.previousIndexs.shift();
            this.renderPlayer();
            audio.play();
        }

        if (this.previousIndexs.length == 0) {
            preBtns.forEach(btn => btn.classList.add('play-btn--disabled'));
        }
    },
    addNewPreviousIndex() {
        if (this.tempIndex || this.tempIndex === 0) {
            this.previousIndexs.unshift(this.tempIndex);
            this.tempIndex = false;
        }


        if (this.previousIndexs.length > 0) {
            preBtns.forEach(btn => {
                btn.classList.contains('play-btn--disabled') && btn.classList.remove('play-btn--disabled');
            })
            
        }
    },
    updatePlayBtnOfMedia() {
        const mediaCurrent = $('.playlist-current').querySelector('.media');
        mediaCurrent && mediaCurrent.classList.toggle('playing', this.isPlay);
    },
    formatTime(time = 1000) {
        let [m,s] = [parseInt(time/60), (time%60).toFixed(0)*1];
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;

    },
    renderList() {
        this.renderCurrentSong();
        this.renderPreviousSongs();
        this.renderNextSongs();
    },
    renderCurrentSong() {
        if (this.currentIndex || this.currentIndex == 0) {
            const html = UI.createMediaActiveInPlayList(this.currentSong, this.currentIndex);
            $('.playlist-current').innerHTML = html;
        }
        this.updatePlayBtnOfMedia();
    },
    renderPreviousSongs() {
        const html = this.previousIndexs.map(index => {
            return UI.createMediaPreviousInPlayList(this.songs[index], index);
        }).reverse().join('');
        $('.playlist-previous').innerHTML = html;
    },
    renderNextSongs() {
        let html = '';
        this.songs.forEach((song, index) => {
            if (index === this.currentIndex || this.previousIndexs.includes(index)) return;
            html += UI.createNextSongInPlayList(song, index);
        });
        $('.playlist-next').innerHTML = html;
    },
    renderPlayer(song = this.currentSong) {
        
        if (this.currentIndex || this.currentIndex === 0) {
            const media = `
                   <div class="media ${song.vip ? 'media--vip' : ''} media--l">
                       <div class="media-cover">
                           <img src="${song.cover}" alt="Cover" class="media-cover__img">
                       </div>
                       <div class="media-content">
                           <div class="media-content-header">
                               <span href="" class="media__title">${song.name}</span>
                               <span class="media__vip-label">vip</span>
                           </div>
                           <div class="media-list-subtitle">
                               ${song.artist.map(
                                   name => `<span href="" class="media__subtitle media__subtitle--link">${name}</span>`
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
           audio.src = song.url;

            playerMobile.querySelector('.player__title').innerText = song.name;
            playerMobile.querySelector('.player-cd__img').src = song.cover;
            playerMobile.querySelector('.player__subtitle').innerText = song.artist;

            this.createCDAnimate();

        }
    },
    setSongs(songs) {
        this.songs = songs;
        this.currentIndex = 0;
        this.renderList();
        this.renderPlayer();
    },
    addNewSongToPlayList(track) {
        const checkTrack = this.songs.findIndex(song => song.id === track.id);

        if (checkTrack > -1) {
            this.currentIndex = checkTrack;

        } else {
            this.songs.unshift(track);
            this.currentIndex = 0;
        }
        this.removePrevious();
        this.renderPlayer();
        this.renderList();
        audio.play();
    },
    removeMediaActFromTab() {
        const mediaAct = tabs.querySelector('.media.media--active');
        mediaAct && mediaAct.classList.remove('media--active');
    },
    removePrevious() {
        if (this.previousIndexs.includes(this.currentIndex)) {
            this.previousIndexs = this.previousIndexs.filter(i => i !== this.currentIndex);
        }
    },
    start() {
        this.properties();
        this.renderList();
        this.renderPlayer();
        this.handleEvent();
    }

}

PLAYER.start();
export default PLAYER;

