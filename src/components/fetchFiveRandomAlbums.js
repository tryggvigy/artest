import { extractAlbumData } from './extractAlbumData';

const baseURL = process.env.REACT_APP_SPOTIFY_BASE_URL;

const fetchFiveRandomAlbums = async() => {

    // todo: add check for token validity

    const accessToken = JSON.parse(localStorage.getItem('token'));
    const queryParam = 'one%'; // todo: to be randomized
    const offsetParam = 0; // to get the most relevant albums
    const typeParam = 'album';
    const limitParam = 5;

    const queryParams = new URLSearchParams({
        q: queryParam,
        type: typeParam,
        limit: limitParam,
        offset: offsetParam
    });

    const stringifiedQueryParams = queryParams.toString();

    // append params to baseURL
    const searchEndpoint = `${baseURL}/search?${stringifiedQueryParams}`;

    const albumsResponse = await fetch(searchEndpoint, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
        }
    });

    const albumsData = await albumsResponse.json();
    const albums = extractAlbumData(albumsData);

    return albums;
}

export { fetchFiveRandomAlbums };