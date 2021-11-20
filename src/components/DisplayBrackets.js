import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayRound from './DisplayRound'
import CreateFirstRoundBracket from './CreateFirstRoundBracket'

const DisplayBrackets = ({ tourney, tournamentId, userList, currUser }) => {
  const [brackets, setBrackets] = useState([]);

  const getBrackets = () => {
    axios.get('https://bracketsrus.herokuapp.com/api/brackets')
    .then((response) => {
      const allBrackets = response.data;
      const filteredBrackets = allBrackets.filter(bracket => bracket.tournament === tournamentId);
      setBrackets(filteredBrackets);
    });
  };

  useEffect(() => {
    getBrackets();
  }, []);

  return (
      <>
        {brackets[0] ?
          <>
          <h3>Brackets</h3>
          {brackets.map((bracket, index) => {
            return (
              <>
              {index === brackets.length - 1 ?
                <DisplayRound tourney={tourney} currUser={currUser} bracket={bracket} userList={userList} key={bracket.id} getBrackets={getBrackets} isLatestRound={true}/>
                :
                <DisplayRound tourney={tourney} currUser={currUser} bracket={bracket} userList={userList} key={bracket.id} getBrackets={getBrackets} isLatestRound={false}/>
              }
              </>
            )
          })}
          </>
        :
          <>
            <h3>No Brackets Yet</h3>
            {tourney.locked & !brackets[0] & currUser.id === tourney.owner ?
              <CreateFirstRoundBracket
                players={tourney.players}
                tournamentId={tourney.id}
                getBrackets={getBrackets}
              />
              :
              null
            }
          </>
        }
      </>
  );
};

export default DisplayBrackets;
