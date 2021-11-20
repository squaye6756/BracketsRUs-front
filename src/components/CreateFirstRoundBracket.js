import axios from 'axios';

const CreateFirstRoundBracket = ({ players, tournamentId, getBrackets }) => {
  const handleCreateBracket = () => {
    const roundObj = {
      tournamentId,
      userIds: players,
      round: 1
    };

    axios
      .put('https://bracketsrus.herokuapp.com/api/tournaments/next', roundObj)
      .then(response => {
        getBrackets();
      });
  };

  return <button onClick={handleCreateBracket}>Create First Round Bracket</button>;
};

export default CreateFirstRoundBracket;
