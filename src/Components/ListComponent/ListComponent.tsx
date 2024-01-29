import { useEffect, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { isEmpty, isNil } from 'lodash';

import { ICharacter } from './listComponent.interfaces';

import CellCard from '../CellCard/CellCard';

const ListComponent = () => {
  const [charactersList, setCharactersList] = useState<null | ICharacter[]>(null);
  const [charactersCounter, setCharactersCounter] = useState<number>(20);
  const itemCount = true ? charactersCounter + 1 : charactersCounter;

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(data => data.json())
      .then(data => {
        setCharactersList(data.results);
        setCharactersCounter(data.results.length);
      })
      .catch(() => setCharactersCounter(0));
  }, []);

  const Cell = ({ index, style }: ListChildComponentProps) => {
    const character: ICharacter | null =
      charactersList && !isEmpty(charactersList[index]) ? charactersList[index] : null;

    return (
      <div style={style}>
        <CellCard character={character} />
      </div>
    );
  };

  const loadMore = () => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(data => data.json())
      .then(data => {
        const prevData = isNil(charactersList) ? [] : charactersList;
        setCharactersList([...prevData, ...data.results]);

        if (charactersList) {
          setCharactersCounter(charactersList?.length + data.results.length);
        }
      })
      .catch(() => setCharactersCounter(0));
  };

  return (
    <InfiniteLoader
      isItemLoaded={index => index < charactersCounter}
      itemCount={itemCount}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => {
        return (
          <FixedSizeList
            height={850}
            width={740}
            className="list-component"
            itemCount={charactersCounter}
            itemSize={400}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Cell}
          </FixedSizeList>
        );
      }}
    </InfiniteLoader>
  );
};

export default ListComponent;
