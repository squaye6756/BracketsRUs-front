import { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayBracket = ({ tournamentId }) => {
  const [brackets, setBrackets] = useState([]);

  const getBrackets = () => {
    axios.get('https://bracketsrus.herokuapp.com/api/brackets')
    .then((response) => {
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
      <div>Brackets</div>
    </>
  );
};

export default DisplayBracket;
