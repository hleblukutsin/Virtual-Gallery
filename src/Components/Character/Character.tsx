import { ICharacter } from '../ListComponent/listComponent.interfaces';

import './index.scss';

interface ICharacterProps {
  character: ICharacter;
}

const Character = ({ character: { image, name, gender, species } }: ICharacterProps) => {
  return (
    <div className="character">
      <div className="avatar">
        <img alt="avatar" src={image} />
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
