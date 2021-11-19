import React, {useState, useEffect} from 'react'
import axios from 'axios';

const TourneyList = ({currUser}) => {
  let [name, setName] = useState('')
  let [details, setDetails] = useState('')
  let [game, setGame] = useState('')
  let [prizes, setPrizes] = useState()
  let [limit, setLimit] = useState()
  let [players, setplayers] = useState([])
  let [tournaments, setTournaments] = useState([])
  // let [currUser, setCurrUser] = useState({})

  // const numOfPlayers = players.length
  // const numAvailable = limit - players.length

  const getTournaments = () => {
    axios
    .get('https://bracketsrus.herokuapp.com/api/tournaments')
    .then((response) => {
      setTournaments(response.data)
    })
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
            </>
          )
        })}
      </div>
      {currUser &&
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
