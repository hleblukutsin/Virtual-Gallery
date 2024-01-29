import { useEffect, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { ICharacter } from './listComponent.interfaces';

import RowComponent from '../RowComponent/RowComponent';

const ListComponent = () => {
  const [charactersList, setCharactersList] = useState<ICharacter[] | null>(null);
  const [charactersCounter, setCharactersCounter] = useState<number>(20);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const windowHeight = window.innerHeight - 60;
  const itemHeight = 400;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();

        setNextPage(data.info.next);
        setCharactersList(data.results);
        setCharactersCounter(data.results.length / 2);
      } catch (error) {
        setCharactersCounter(0);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const Row = ({ index, style }: ListChildComponentProps) => {
    const getCharactersRawArray = () => {
      if (charactersList) {
        const firstColomnIndex = index * 2;
        const secondColomnIndex = index * 2 + 1;

        return [charactersList[firstColomnIndex], charactersList[secondColomnIndex]];
      }

      return [null, null];
    };

    return (
      <div style={style}>
        <RowComponent charactersRawArray={getCharactersRawArray()} />
      </div>
    );
  };

  const loadMore = () => {
    setTimeout(async () => {
      if (nextPage) {
        try {
          const response = await fetch(nextPage);
          const data = await response.json();

          if (charactersList) {
            setNextPage(data.info.next);
            setCharactersList([...charactersList, ...data.results]);
            setCharactersCounter(prevCounter => prevCounter + data.results.length / 2);
          }
        } catch (error) {
          setCharactersCounter(prevCounter => prevCounter);
        }
      }
    }, 500);
  };

  return (
    <InfiniteLoader
      isItemLoaded={index => index < charactersCounter}
      itemCount={charactersCounter + 1}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={windowHeight}
          width="100%"
          className="list-component"
          itemCount={charactersCounter}
          itemSize={itemHeight}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};

export default ListComponent;
