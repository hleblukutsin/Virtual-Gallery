import 'react-loading-skeleton/dist/skeleton.css';

import { ICharacter } from '../ListComponent/listComponent.interfaces';

import CellCard from '../CellCard/CellCard';

import './index.scss';

interface IRowComponentProps {
  charactersRawArray: (ICharacter | null)[];
}

const RowComponent = ({ charactersRawArray }: IRowComponentProps) => {
  return (
    <div className="row">
      {charactersRawArray.map((character, index) => (
        <CellCard key={index} character={character} />
      ))}
    </div>
  );
};

export default RowComponent;
