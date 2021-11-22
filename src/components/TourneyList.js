import React, {useEffect} from 'react'
import axios from 'axios';
import Edit from './Edit.js';
import {Link} from 'react-router-dom';
import '../views/tournaments.css';

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
        <h1 className='browse'>Browse Tournaments</h1>
        {tournaments.map((tourney) => {
          return(
            <div className='tourney-container' id={(tourney.id % 2)? 'grey': (tourney.id % 3) ? 'blue': 'green'} key={tourney.id}>
              <h2>Name:{tourney.name}</h2>
              <h3>Game:{tourney.game}</h3>
              <h3>Details:{tourney.details}</h3>
              <h3>Prize:{tourney.prizes}</h3>
              <h3>Limit:{tourney.limit}</h3>
              <Link className="link" to={`/tournament/${tourney.id}`}>See Details</Link>
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
