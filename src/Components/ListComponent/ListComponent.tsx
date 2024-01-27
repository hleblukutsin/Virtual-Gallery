import React, { useEffect, useState } from 'react';
import {
  FixedSizeGrid,
  FixedSizeList,
  GridChildComponentProps,
  ListChildComponentProps,
} from 'react-window';
import { isEmpty } from 'lodash';

import RowComponent from '../RowComponent/RowComponent';
import { ICharacter } from './listComponent.interface';
import { getCharacterElementNumber } from '../../utils/utils';

// import items from './mock.json';

const Row = ({ index, style }: ListChildComponentProps) => {
  console.log(123, 'in raw');
  return <RowComponent image={''} num={index} style={style} />;
};

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
    return (
      <div style={style}>
        {charactersList ? charactersList[currentElementNumber].name : 'Loading'}
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
      rowHeight={150}
      itemData={123}
    >
      {Cell}
    </FixedSizeGrid>
  );
};

export default ListComponent;
