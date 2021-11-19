import { useState, useEffect } from 'react';

const DisplayRound = ({bracket, userList}) => {
  const [sortedUsers, setSortedUsers] = useState([]);

  const sortUserList = () => {
    const tempSortedUsers = [];
    for (const userId of bracket.list) {
      const player = userList.filter(user => user.id == userId);
      tempSortedUsers.push(player)
    }
    setSortedUsers(tempSortedUsers);
  };

  useEffect(() => {
    console.log(bracket.list)
    console.log('Round, users:', userList)
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
