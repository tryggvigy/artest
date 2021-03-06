import { wordBank } from '../utils/words';

const baseURL = process.env.REACT_APP_SPOTIFY_BASE_URL;

const fetchFiveRandomAlbums = async () => {
    const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    const accessToken = JSON.parse(localStorage.getItem('token'));

    const queryParam = `%${randomWord}%`;
    const offsetParam = 0; // to get the most relevant albums
    const typeParam = 'album';
    const limitParam = 5;

    const queryParams = new URLSearchParams({
        q: queryParam,
        type: typeParam,
        limit: limitParam,
        offset: offsetParam,
    });

    const stringifiedQueryParams = queryParams.toString();

    // append params to baseURL
    const searchEndpoint = `${baseURL}/search?${stringifiedQueryParams}`;

    const albumsResponse = await fetch(searchEndpoint, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    let albumsData;
    try {
        albumsData = await albumsResponse.json();
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }

    return albumsData;
};

export { fetchFiveRandomAlbums };
