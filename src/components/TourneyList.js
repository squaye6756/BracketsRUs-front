import React, {useEffect} from 'react'
import axios from 'axios';
import Edit from './Edit.js';
import {Link} from 'react-router-dom';

const TourneyList = ({currUser, tournaments, getTournaments, handleEdit}) => {

  const handleDeleteTourney = (event) => {
    axios.delete(`https://bracketsrus.herokuapp.com/api/tournaments/${event.target.value}`)
    .then((response) => {
      getTournaments();
    });
  };

  useEffect(() => {
    getTournaments();
  }, []);

  return(
    <>
      <div className='tourneyList'>
        <h1>All Tournaments:</h1>
        <hr/>
        {tournaments.map((tourney) => {
          return(
            <div className='short-single-tourney' key={tourney.id}>
              <h2>{tourney.name}</h2>
              <h3>{tourney.details}</h3>
              <h3>{tourney.game}</h3>
              <h3>{tourney.prizes}</h3>
              <h3>{tourney.limit}</h3>
              <Link to={`/tournament/${tourney.id}`}>See Details</Link>
              {currUser.id === tourney.owner &&
                <Edit handleEdit={handleEdit} tourney={tourney} getTournaments={getTournaments} tournaments={tournaments} handleDeleteTourney={handleDeleteTourney}/>
              }
            </div>
          )
        })}
      </div>
    </>
  );
};

export default TourneyList;
