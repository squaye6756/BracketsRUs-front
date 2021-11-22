import { useState, useEffect } from 'react';
import CreateLaterBrackets from './CreateLaterBrackets';
import SelectChampion from './SelectChampion';

const DisplayRound = ({ bracket, userList, isLatestRound, tourney, currUser, getBrackets, handleEdit }) => {
  const [sortedUsers, setSortedUsers] = useState([]);

  const sortUserList = () => {
    const tempSortedUsers = [];
    for (const userId of bracket.list) {
      const player = userList.filter(user => user.id === userId)[0];
      tempSortedUsers.push(player);
    }
    setSortedUsers(tempSortedUsers);
  };

  useEffect(() => {
    sortUserList();
  }, []);

  return (
    <div className="round">
      <h4>Round: {bracket.round}</h4>
      {sortedUsers.map((user, index) => {
        const firstPlayer = user.username
        const secondPlayer = sortedUsers[index + 1] ?
          sortedUsers[index + 1].username
          :
          'Bye'
        return index % 2 === 0 &&
          <p key={user.id}>{firstPlayer} vs {secondPlayer}</p>
      })}
      {isLatestRound & tourney.locked & currUser.id === tourney.owner &
      bracket.list.length > 2 ?
        <>
          <p>Enter Winners to create next round:</p>
          <CreateLaterBrackets
            prevRound={bracket.round}
            prevPlayers={sortedUsers}
            tournamentId={bracket.tournament}
            getBrackets={getBrackets}
          />
        </>
        :
        null
      }
      {isLatestRound & tourney.locked & currUser.id === tourney.owner & bracket.list.length === 2 & tourney.champion === null ?
        <>
          <p>Select Champion:</p>
          <SelectChampion handleEdit={handleEdit} players={sortedUsers} tourney={tourney} />
        </>
        :
        null
      }
    </div>
  );
};

export default DisplayRound;
