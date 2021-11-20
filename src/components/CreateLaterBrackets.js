import { useState } from 'react';
import axios from 'axios';

const CreateLaterBrackets = ({ prevRound, prevPlayers, tournamentId, getBrackets }) => {
  const [winners, setWinners] = useState([]);
  const [readyToCreate, setReadyToCreate] = useState(false);

  const handleSelectWinner = (e) => {
    const newWinners = winners;
    newWinners[e.target.id] = +e.target.value;
    setWinners(newWinners);
    if (newWinners.length >= prevPlayers.length / 2) {
      setReadyToCreate(true);
    }
  };

  const handleCreateBracket = () => {
    const roundObj = {
      tournamentId,
      userIds: winners,
      round: prevRound + 1
    };

    axios
      .put('https://bracketsrus.herokuapp.com/api/tournaments/next', roundObj)
      .then(response => {
        getBrackets();
      });
  };


  return (
    <>
      {
        prevPlayers.map((user, index) => {
          const firstPlayer = user
          const secondPlayer = prevPlayers[index + 1] ?
            prevPlayers[index + 1]
            :
            null
          return index % 2 === 0 && (
            <>
              <label htmlFor={index/2}>Winner:</label>
              {secondPlayer ?
                <select onChange={handleSelectWinner} id={index/2}>
                  <option disabled selected value>Select Winner</option>
                  <option value={firstPlayer.id}>{firstPlayer.username}</option>
                  <option value={secondPlayer.id}>{secondPlayer.username}</option>
                </select>
                :
                <select onChange={handleSelectWinner} id={index/2}>
                  <option disabled selected value>Select Winner</option>
                  <option value={firstPlayer.id}>{firstPlayer.username}</option>
                </select>
              }
              <br />
            </>
          )

        })
      }
      {readyToCreate &&
        <button onClick={handleCreateBracket}>Create Next Round Bracket</button>
      }
    </>
  );
};

export default CreateLaterBrackets;
