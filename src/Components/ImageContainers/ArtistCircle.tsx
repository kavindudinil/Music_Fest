import React from 'react';
import '../../StyleSheets/Circle.scss';

interface ArtistCircleProps {
    imageSrc: string;
    artistName: string;
}

const ArtistCircle: React.FC<ArtistCircleProps> = ({ imageSrc, artistName }) => {
    return (
        <div className="artist-circle">
            <div className="artist-circle-background">
                <img src={imageSrc} alt={artistName} />
            </div>
            <div className="artist-name">{artistName}</div>
        </div>
    );
};

export default ArtistCircle;
