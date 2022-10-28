const UI = (() => {
    
    const createAlbum = (data) => {
        return `
            <div class="col l-4 m-6 c-12" >
                <div class="media media--cd ${data.vip ? 'media--vip': false}" title="${data.title}">
                    <div class="media-cover-with-cd">
                        <div class="media-cover">
                            <img src="${data.cover}" alt="Cover" class="media-cover__img">
                            <button class="media-play-btn">
                                <i class="media-play-btn__icon media-play-btn__icon--pause fa-solid fa-play"></i>
                                <i class="media-play-btn__icon media-play-btn__icon--play fa-solid fa-pause"></i>
                            </button>
                        </div>
                        <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/album-disk.png" alt="" class="media-cover__cd">
                    </div>
                    <div class="media-content">
                        <div class="media-content-header">
                            <span class="media__title">${data.title}</span>
                            <span class="media__vip-label">vip</span>
                        </div>
                        <div class="media-list-subtitle">
                            ${data.artists.map(artist => 
                                `<a href="" class="media__subtitle media__subtitle--link">${artist}</a>`    
                                ).join()
                            }
                        </div>
                        <span class="media__subtitle">Hôm nay</span>
                    </div>
                    <div class="media-options has-tooltip">
                        <i class="media-options__icon media-options__icon--hori fa-solid fa-ellipsis"></i>
                        <i class="media-options__icon media-options__icon--vert fa-solid fa-ellipsis-vertical"></i>
                        <span class="tooltip tooltip--above">
                            <span class="tooltip__content">
                                Khác
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        `
    };

    const createMedia = (data, type) => {
        return `
            <div class="col l-4 m-6 c-12">
                <div class="media ${type} ${data.vip ? 'media--vip': false}" data-id=${data.id}>
                    <div class="media-cover">
                        <img src="${data.cover}" alt="Cover" class="media-cover__img">
                        <button class="media-play-btn">
                            <i class="media-play-btn__icon media-play-btn__icon--pause fa-solid fa-play"></i>
                            <i class="media-play-btn__icon media-play-btn__icon--play fa-solid fa-pause"></i>
                        </button>
                    </div>
                    <div class="media-content">
                        <div class="media-content-header">
                            <span class="media__title">${data.title}</span>
                            <span class="media__vip-label">vip</span>
                        </div>
                        <div class="media-list-subtitle">
                            ${data.artists.map(artist => 
                                `<a href="" class="media__subtitle media__subtitle--link">${artist}</a>`    
                                )
                            }
                        </div>
                        <span class="media__subtitle">Hôm nay</span>
                    </div>
                    <div class="media-options has-tooltip">
                        <i class="media-options__icon media-options__icon--hori fa-solid fa-ellipsis"></i>
                        <i class="media-options__icon media-options__icon--vert fa-solid fa-ellipsis-vertical"></i>
                        <span class="tooltip tooltip--above">
                            <span class="tooltip__content">
                                Khác
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        `
    }

    const createPlayList = (data) => {
        
    }

    const createMediaActiveInPlayList = (song, index) => {
        return `
                <div class="media media--s media--active-primary ${song.vip ? 'media--vip' : ''} " data-id=${index}>
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
        `
    }

    const createMediaPreviousInPlayList = (song, index) => {
        return `
            <div class="media media--s media--previous" data-id=${index}>
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
        `
    }

    const createNextSongInPlayList = (song, index) => {
        return `
            <div class="media media--s" data-id="${index}">
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
        `
    }


    return {
        createAlbum,
        createMedia,
        createMediaActiveInPlayList,
        createMediaPreviousInPlayList,
        createNextSongInPlayList
    }
})();

export default UI;