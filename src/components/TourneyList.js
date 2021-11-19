import React, {useState, useEffect} from 'react'
import axios from 'axios';
import DisplayTourney from './DisplayTourney.js';

const TourneyList = ({currUser, userList, tournaments, getTournaments}) => {

  // const numOfPlayers = players.length
  // const numAvailable = limit - players.length

  // const getTournaments = () => {
  //   axios
  //   .get('https://bracketsrus.herokuapp.com/api/tournaments')
  //   .then((response) => {
  //     setTournaments(response.data)
  //   })
  // }

  const toggleDetails = (event) => {
    // console.log(event.target);
    const tourneyId = event.target.value.split('-')[2];
    const tourney = document.getElementById(`tourney-${tourneyId}`);
    console.log(tourney);
    console.log(tourneyId);
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
            <>
              <h2>{tourney.name}</h2>
              <h3>{tourney.details}</h3>
              <h3>{tourney.game}</h3>
              <h3>${tourney.prizes}</h3>
              <h3>{tourney.limit}</h3>
              <button value={`toggle-show-${tourney.id}`} onClick={toggleDetails}>Show Details</button> {/*router to display full tourney*/}
              <DisplayTourney tourney={tourney} userList={userList} currUser={currUser} getTournaments={getTournaments}/>
            </>
          )
        })}
      </div>
      {currUser.username &&
        <>
          <div className='tourneyList'>
            <h1>Participating in:</h1>
            <hr/>
            {tournaments.map((tourney) => {
              return(
                <>
                  {tourney.players.includes(currUser.id) &&
                    <div>
                        <h2>{tourney.name}</h2>
                        <h3>{tourney.details}</h3>
                        <h3>{tourney.game}</h3>
                        <h3>${tourney.prizes}</h3>
                        <h3>{tourney.limit}</h3>
                    </div>
                  }
                </>
              )
            })}
          </div>
        </>
      }
    </>
  )
}

export default TourneyList;
