import { useEffect, useState } from 'react';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { isEmpty } from 'lodash';

import { getCharacterElementNumber } from '../../utils/utils';

import Custom from '../CellCard/CellCard';
import CellCard from '../CellCard/CellCard';
import { ICharacter } from '../ListComponent/listComponent.interfaces';

const ListComponent = () => {
  const [charactersList, setCharactersList] = useState<null | ICharacter[]>(null);
  const [charactersCounter, setCharactersCounter] = useState<number>(10);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(data => data.json())
      .then(data => {
        setCharactersList(data.results);

        if (charactersList) {
          setCharactersCounter(charactersList?.length / 2);
        }
      })
      .catch(() => setCharactersCounter(0));
  }, [charactersList]); // Include charactersList as a dependency

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

  const [load, setLoad] = useState(false);

  const loadMore = () => {
    setLoad(true);
    setLoad(false);
    console.log('loading more items');
    setCharactersList(charactersList);
    // return true;
    // Fetch more items or update the state to trigger a re-render with additional items
  };

  return (
    <InfiniteLoader
      isItemLoaded={index => load}
      itemCount={charactersCounter}
      loadMoreItems={loadMore}
      threshold={2}
    >
      {({ onItemsRendered, ref }: any) => {
        const newItemsRendered = (gridData: any) => {
          console.log(gridData);
          const useOverscanForLoading = true;
          const {
            visibleRowStartIndex,
            visibleRowStopIndex,
            visibleColumnStopIndex,
            overscanRowStartIndex,
            overscanRowStopIndex,
            overscanColumnStopIndex,
          } = gridData;
          const endCol =
            (useOverscanForLoading || true ? overscanColumnStopIndex : visibleColumnStopIndex) + 1;
          const startRow =
            useOverscanForLoading || true ? overscanRowStartIndex : visibleRowStartIndex;
          const endRow = useOverscanForLoading || true ? overscanRowStopIndex : visibleRowStopIndex;
          const visibleStartIndex = startRow * endCol;
          const visibleStopIndex = endRow * endCol;
          onItemsRendered({
            visibleStartIndex,
            visibleStopIndex,
          });
        };

        return (
          <FixedSizeGrid
            height={850}
            width={740}
            className="list-component"
            columnCount={2}
            columnWidth={360}
            rowCount={charactersCounter}
            rowHeight={400}
            onItemsRendered={newItemsRendered}
            ref={ref}
          >
            {Cell}
          </FixedSizeGrid>
        );
      }}
    </InfiniteLoader>
  );
};

export default Custom;
