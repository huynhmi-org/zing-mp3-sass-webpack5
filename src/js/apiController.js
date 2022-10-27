const APIController = (() => {
    const client_id = 'a78cc9d52e0f4bbdabf1fc8760ee9d50';
    const client_secret = '2e1ec33170fd42c8a5ab7de458c44d5e';
    
    const getToken = () => {
        const token =  fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
            },
            body: 'grant_type=client_credentials'
        })
        .then(res => res.json())
        .then(token => {
            return token.access_token;
        });
        
        return token;

    };

    const option = (token) => ({
        method:'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });


    const getData = (token, type, limit) => {
        const data = fetch(`https://api.spotify.com/v1/${type}?country=VN&limit=${limit}&offset=5`, option(token))
        .then(res => res.json());

        return data;
    }

    const getPlayList = (token, id) => {
        const data = fetch(`https://api.spotify.com/v1/playlists/${id}`, option(token))
        .then(res => res.json());
        return data;
    }

    const getAlbum = (token, id) => {
        const data = fetch(`https://api.spotify.com/v1/albums/${id}`, option(token))
        .then(res => res.json());
        return data;
    }

    const getGenres = (token) => {
        const data = fetch(`https://api.spotify.com/v1/browse/new-releases`, option(token))
        .then(res => res.json());
        return data;
    }
    const getTrack = (token, id) => {
        const data = fetch(`https://api.spotify.com/v1/tracks/${id}`, option(token))
        .then(res => res.json());
        return data;
    }
    
    return {
        getToken,
        getData,
        getPlayList,
        getGenres,
        getAlbum,
        getTrack
    }
})();


export default APIController;
