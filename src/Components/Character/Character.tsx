import { ICharacter } from '../ListComponent/listComponent.interface';

import './index.scss';

interface ICharacterProps {
  character: ICharacter | null;
}

const Character = ({ character }: ICharacterProps) => {
  return <div className="cell-card"></div>;
};

export default Character;
