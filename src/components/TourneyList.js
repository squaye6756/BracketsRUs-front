import React, {useEffect} from 'react'
import axios from 'axios';
import Edit from './Edit.js';
import {Link} from 'react-router-dom';

const TourneyList = ({currUser, tournaments, getTournaments}) => {

  const handleEdit = (editTourney) => {
    console.log(editTourney)
    axios.put('https://bracketsrus.herokuapp.com/api/tournaments/' + editTourney.id, editTourney)
    .then((response) => {
      console.log(response)
      getTournaments()
    })
  }

  const handleDeleteTourney = (event) => {
    axios.delete(`https://bracketsrus.herokuapp.com/api/tournaments/${event.target.value}`)
    .then((response) => {
      getTournaments()
    });
  }

  const toggleDetails = (event) => {
    const tourneyId = event.target.value.split('-')[2];
    const tourney = document.getElementById(`tourney-${tourneyId}`);
    if (event.target.innerHTML === 'Hide Details' ) {
      event.target.innerHTML = 'Show Details';
      tourney.style.display = 'none';
    } else {
      event.target.innerHTML = 'Hide Details';
      tourney.style.display = 'block';
    }
  }

  useEffect(() => {
    getTournaments()
  }, [])

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
              {/*<DisplayTourney tourney={tourney} userList={userList} currUser={currUser} getTournaments={getTournaments}/>*/}
              {currUser.id === tourney.owner &&
                <Edit handleEdit={handleEdit} tourney={tourney} getTournaments={getTournaments} tournaments={tournaments} handleDeleteTourney={handleDeleteTourney}/>
              }
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TourneyList;
