import { useEffect, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { ICharacter } from './listComponent.interfaces';

import RowComponent from '../RowComponent/RowComponent';

const ListComponent = () => {
  const [charactersList, setCharactersList] = useState<null | ICharacter[]>(null);
  const [charactersCounter, setCharactersCounter] = useState<number>(20);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const windowHeight = window.innerHeight - 60;

  const itemCount = true ? charactersCounter + 1 : charactersCounter;
  useEffect(() => {
    setTimeout(() => {
      fetch('https://rickandmortyapi.com/api/character')
        .then(data => data.json())
        .then(data => {
          setNextPage(data.info.next);
          setCharactersList(data.results);
          setCharactersCounter(data.results.length / 2);
        })
        .catch(() => setCharactersCounter(0));
    }, 1000);
  }, []);

  const Row = ({ index, style }: ListChildComponentProps) => {
    if (charactersList) {
      const isIndexSmallerList = index * 2 + 1 < charactersList.length;

      if (isIndexSmallerList) {
        const firstColomnIndex = index * 2;
        const secondColomnIndex = index * 2 + 1;

        const charactersRawArray = [
          charactersList[firstColomnIndex],
          charactersList[secondColomnIndex],
        ];

        return (
          <div style={style}>
            <RowComponent charactersRawArray={charactersRawArray} />
          </div>
        );
      }
    }

    return (
      <div style={style}>
        <RowComponent charactersRawArray={[null, null]} />
      </div>
    );
  };

  const loadMore = () => {
    setTimeout(() => {
      if (nextPage) {
        fetch(nextPage)
          .then(data => data.json())
          .then(data => {
            if (charactersList) {
              setNextPage(data.info.next);
              setCharactersList([...charactersList, ...data.results]);
              setCharactersCounter(charactersCounter + data.results.length / 2);
            }
          })
          .catch(() => setCharactersCounter(charactersCounter));
      }
    }, 500);
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
            height={windowHeight}
            width={'100%'}
            className="list-component"
            itemCount={charactersCounter}
            itemSize={400}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Row}
          </FixedSizeList>
        );
      }}
    </InfiniteLoader>
  );
};

export default ListComponent;
