import 'react-loading-skeleton/dist/skeleton.css';

import { ICharacter } from '../ListComponent/listComponent.interfaces';

import CellCard from '../CellCard/CellCard';

import './index.scss';

interface IRowComponentProps {
  charactersRawArray: (ICharacter | null)[];
}

const RowComponent = ({ charactersRawArray }: IRowComponentProps) => {
  const characters = charactersRawArray.map((character, index) => (
    <CellCard key={index} character={character} />
  ));

  return <div className="row">{characters}</div>;
};

export default RowComponent;
