import React, { useEffect } from 'react';
import './Result.css';
import { Button } from '../Button/Button';
import { getCurrentRoundResult } from '../getCurrentRoundResult';
import { getNextRoundArtistOptions } from '../getNextRoundArtistOptions';

const Result = (props) => {
    const {
        setRoute,
        setCurrentRound,
        rounds,
        currentRound,
        albums,
        setAlbums,
        results,
    } = props;

    const roundResult = getCurrentRoundResult(albums, currentRound, results);

    useEffect(() => {
        const albumsObj = albums;
        const nextRound = currentRound + 1;

        const getNextRoundOptions = async () => {
            const artists = await getNextRoundArtistOptions(
                albumsObj,
                nextRound
            );
            setAlbums(artists);
        };

        // if this is not the last round
        if (rounds >= nextRound) getNextRoundOptions();
    const {
        albumCoverArt,
        albumName,
        result,
        artistName,
        albumReleaseYear,
    } = roundResult;

    let description = `${artistName} is the artist behind ${albumName}`;
    if (result) {
        description = `${albumName} was released by ${artistName} in ${albumReleaseYear}`;
    }

    // for changing the route and updating current round
    const handleClick = (e) => {
        if (currentRound < rounds) {
            setCurrentRound((currentRound) => currentRound + 1);
            setRoute('play');
        } else {
            setRoute('end');
        }
    };

    return (
        <div
            className={`Result--container ${result ? 'correct' : 'incorrect'}`}
        >
            <img
                className="Result--album-image"
                src={albumCoverArt}
                alt={albumName}
            />
            <p className="Result--result">{result ? 'Correct' : 'Incorrect'}</p>
            <p className="Result--payload">{description}</p>
            <Button text="Continue" onClick={() => handleClick()} />
        </div>
    );
};

export { Result };
