import { useEffect, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { ICharacter } from './listComponent.interfaces';
import { generateNullsArray } from '../../utils/index.utils';

import RowComponent from '../RowComponent/RowComponent';

const ListComponent = () => {
  const emptyCardsArray = generateNullsArray(826);
  const [charactersList, setCharactersList] = useState<(ICharacter | null)[]>(emptyCardsArray);
  const [charactersCounter, setCharactersCounter] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [apiInfo, setApiInfo] = useState({ count: 826, pages: 42 });

  const windowHeight = window.innerHeight - 60;
  const itemHeight = 400;

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://rickandmortyapi.com/api/character`)
        .then(response => response.json())
        .then(data => {
          charactersList.splice(0, 20, ...data.results);
          setCharactersList(charactersList);
          setApiInfo({ pages: data.info.pages, count: data.info.count });
        })
        .catch(() => {
          setCharactersList([]);
          setCharactersCounter(0);
        });
    };

    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const Row = ({ index, style }: ListChildComponentProps) => {
    const getCharactersRawArray = () => {
      const firstColomnIndex = index * 2;
      const secondColomnIndex = index * 2 + 1;

      return [charactersList[firstColomnIndex], charactersList[secondColomnIndex]];
    };

    return (
      <div style={style}>
        <RowComponent charactersRawArray={getCharactersRawArray()} />
      </div>
    );
  };

  const loadMore = () => {
    if (apiInfo.pages > pageNumber) {
      setPageNumber(prevNumber => prevNumber + 1);
      const divisionReminder = apiInfo.count % 20;
      if (pageNumber + 1 < apiInfo.pages) {
        setCharactersCounter(prevCounter => prevCounter + 10);
      } else {
        setCharactersCounter(prevCounter => prevCounter + divisionReminder / 2);
      }

      fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber + 1}`)
        .then(response => response.json())
        .then(data => {
          if (apiInfo.pages < pageNumber + 1) {
            charactersList.splice(pageNumber * 20, 20, ...data.results);
          } else {
            charactersList.splice(pageNumber * 20, divisionReminder, ...data.results);
          }

          setCharactersList(charactersList);
        })
        .catch(() => setCharactersCounter(prevCounter => prevCounter));
    }
  };

  return (
    <InfiniteLoader
      isItemLoaded={index => index < charactersCounter}
      itemCount={charactersCounter + 1}
      loadMoreItems={loadMore}
      threshold={1}
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
