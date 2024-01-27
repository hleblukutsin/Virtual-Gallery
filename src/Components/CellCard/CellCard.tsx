import { isNil } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { ICharacter } from '../ListComponent/listComponent.interface';

import './index.scss';

interface ICellCardProps {
  character: ICharacter | null;
}

const CellCard = ({ character }: ICellCardProps) => {
  return (
    <div className="cell-card">
      {isNil(character) ? <Skeleton height={380} width={470} borderRadius={15} /> : 123}
    </div>
  );
};

export default CellCard;
