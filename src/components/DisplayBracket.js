import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayRound from './DisplayRound'

const DisplayBracket = ({ tournamentId, userList }) => {
  const [brackets, setBrackets] = useState([]);

  const getBrackets = () => {
    axios.get('https://bracketsrus.herokuapp.com/api/brackets')
    .then((response) => {
      console.log('Bracket, users:', userList)
      const allBrackets = response.data;
      const filteredBrackets = allBrackets.filter(bracket => bracket.tournament === tournamentId);
      console.log(filteredBrackets);
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
          {brackets.map(bracket => {
            return (
              <DisplayRound bracket={bracket} userList={userList} />
            )
          })}
          </>
        :
          <h3>No Brackets Yet</h3>
        }
      </>
  );
};

export default DisplayBracket;
