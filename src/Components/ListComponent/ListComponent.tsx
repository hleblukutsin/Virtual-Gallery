import React, { useEffect, useState } from 'react';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import { isEmpty } from 'lodash';

import { getCharacterElementNumber } from '../../utils/utils';
import { ICharacter } from './listComponent.interface';

import CellCard from '../CellCard/CellCard';

const ListComponent = () => {
  const [charactersList, setCharactersList] = useState<null | ICharacter[]>(null);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(data => data.json())
      .then(data => setCharactersList(data.results));
  }, []);

  const charactersCout = isEmpty(charactersList)
    ? 10
    : charactersList && charactersList?.length / 2;

  const Cell = ({ rowIndex, columnIndex, style }: GridChildComponentProps) => {
    const currentElementNumber = getCharacterElementNumber(rowIndex, columnIndex);
    const character: ICharacter | null =
      charactersList && !isEmpty(charactersList[currentElementNumber])
        ? charactersList[currentElementNumber]
        : null;

    return (
      <div style={style}>
        <CellCard character={character} />
      </div>
    );
  };

  return (
    <FixedSizeGrid
      height={500}
      width={1000}
      className="list-component"
      columnCount={2}
      columnWidth={490}
      rowCount={charactersCout ? charactersCout : 0}
      rowHeight={400}
    >
      {Cell}
    </FixedSizeGrid>
  );
};

export default ListComponent;
