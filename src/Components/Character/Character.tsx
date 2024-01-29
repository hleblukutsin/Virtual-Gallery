import { ICharacter } from '../ListComponent/listComponent.interfaces';
import React, { useState } from 'react';
import './index.scss';
import Skeleton from 'react-loading-skeleton';

interface ICharacterProps {
  character: ICharacter;
}

const Character = ({ character: { image, name, gender, species } }: ICharacterProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="character">
      <div className="avatar">
        <img
          alt="avatar"
          src={image}
          style={{ display: imageLoaded ? 'block' : 'none' }}
          onLoad={handleImageLoad}
        />
        {!imageLoaded && (
          <div className="loading-indicator">
            <Skeleton circle width={300} height={300} />
          </div>
        )}
      </div>
      <div className="info-block">
        <p>{`Name: ${name}`}</p>
        <p>{`Gender: ${gender}`}</p>
        <p>{`Species: ${species} `}</p>
      </div>
    </div>
  );
};

export default Character;
