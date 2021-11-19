import { useState, useEffect } from 'react';

const DisplayRound = ({bracket, userList}) => {
  const [sortedUsers, setSortedUsers] = useState([]);

  const sortUserList = () => {
    const tempSortedUsers = [];
    for (const userId of bracket.list) {
      const player = userList.filter(user => user.id == userId)[0];
      tempSortedUsers.push(player)
    }
    console.log(bracket.list)
    console.log('Round, users:', tempSortedUsers)
    setSortedUsers(tempSortedUsers);
  };

  useEffect(() => {
    sortUserList();
  }, []);

  return (
    <>
      <h4>Round: {bracket.round}</h4>
      {sortedUsers.map(user => {
        return <p>{user.username}</p>
      })}
    </>
  )
};

export default DisplayRound;
