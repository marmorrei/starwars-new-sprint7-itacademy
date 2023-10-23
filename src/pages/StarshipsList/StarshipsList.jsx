import { useState, useEffect } from 'react';
import StarshipDetailsModal from '../../components/StarshipDetailsModal/StarshipDetailsModal';
import { MainContainer, ListItem } from './Styled-components';
import { useStarships } from '../../utils/hooks/useStarships';
import starshipsImg from '../../assets/starship-images';
import { useCurrentPathContext } from '../../context/PathProvider';

export default function StarshipsList() {
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedStarship, setSelectedStarship] = useState(undefined);
  const {
    starships,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useStarships();
  const [currentPath, setCurrentPath] = useCurrentPathContext();

  useEffect(() => {
    setCurrentPath('/starships');
  }, []);

  console.log(currentPath);

  const starshipsList = starships?.map(starship => (
    <ListItem
      key={starship.name}
      onClick={() => {
        setDisplayModal(true);
        setSelectedStarship(starship);
      }}
    >
      <h2>{starship.name}</h2>
      <p>{starship.model}</p>
      <img
        src={
          starshipsImg?.find(element => element.name === starship.name).url ||
          'https://starwars-visualguide.com/assets/img/placeholder.jpg'
        }
        alt={starship.name}
      />
    </ListItem>
  ));

  return (
    <MainContainer>
      <h1>STARSHIPS</h1>
      {starships.length > 0 && <ul>{starshipsList}</ul>}
      {isLoading && <strong>Loading...</strong>}
      {isError && <p>There is an error</p>}
      {!isLoading && !isError && hasNextPage === true && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'LOADING MORE' : 'VIEW MORE'}
        </button>
      )}
      {!isLoading && !isError && hasNextPage === false && (
        <p>There are no more results.</p>
      )}
      {displayModal && (
        <StarshipDetailsModal
          modalState={displayModal}
          changeModalState={setDisplayModal}
          selectedStarship={selectedStarship}
        />
      )}
    </MainContainer>
  );
}
