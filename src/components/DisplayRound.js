import { useState, useEffect } from 'react';

const DisplayRound = ({bracket, userList}) => {
  const [sortedUsers, setSortedUsers] = useState([]);

  const sortUserList = () => {
    const tempSortedUsers = [];
    for (const userId of bracket.list) {
      const player = userList.filter(user => user.id === userId)[0];
      tempSortedUsers.push(player)
    }
    setSortedUsers(tempSortedUsers);
  };

  useEffect(() => {
    sortUserList();
  }, []);

  return (
    <>
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
    </>
  )
};

export default DisplayRound;
