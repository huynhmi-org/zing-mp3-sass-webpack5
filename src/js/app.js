import APIController from "./apiController.js";
import PLAYER from "./player.js";
import UI from "./ui.js";

export default function Media({name, images, release_date, artists, id}) {
    this.title = name,
    this.cover = images[0].url,
    this.release_date = release_date,
    this.artists = artists.map(artist => artist.name),
    this.vip = false,
    this.id = id
}

// create release albums
APIController.getToken()
    .then(token => APIController.getData(token, 'browse/new-releases', 9))
    .then(data => {
        data = data.albums.items;
        const html = data.map(item => {
            const media = new Media(item);
            return UI.createAlbum(media);
        }).join('');

        document.getElementById('release-album').innerHTML = `
            <div class="row">
                    ${html}
            </div>
        `
    });




// create release-songs
APIController.getToken()
    .then(token => APIController.getPlayList(token, '37i9dQZF1DX5G3iiHaIzdf/tracks?limit=9'))
    .then(data => {
        data = data.items;
        const html = data.map(item => {
            const track = {
                name: item.track.name,
                images: item.track.album.images,
                release_date: item.track.album.release_date,
                artists: item.track.artists,
                id: item.track.id,
            }
            const media = new Media(track);
            return UI.createMedia(media)
        }).join('');

        document.getElementById('release-songs').innerHTML = `
            <div class="row">
                ${html}
            </div>
        `;
    })


APIController.getToken()
    .then(token => APIController.getPlayList(token, '37i9dQZF1DWVOaOWiVD1Lf/tracks?limit=25'))
    .then(playlist => {
        const tracks = playlist.items
                    .filter(item => item.track.preview_url)
                    .map(item => {
                        const track = item.track;
                        return {
                            name: track.name,
                            vip: false,
                            artist: track.artists.map(artist => artist.name),
                            cover: track.album.images[0].url,
                            url: track.preview_url
                        }
                    });
        PLAYER.setSongs(tracks);
    });
