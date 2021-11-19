import {useState, useEffect} from 'react';
import axios from 'axios';
import DisplayBracket from './DisplayBracket'

const DisplayTourney = ({ tourney, userList, currUser, getTournaments }) => {
    const [joinMessage, setJoinMessage] = useState('');
    const [toggleJoinMessage, setToggleJoinMessage] = useState(false);

    const handleJoin = () => {
      const joinObj = {
        "userId": currUser.id,
        "tournamentId": tourney.id
      };
      axios
        .put('https://bracketsrus.herokuapp.com/api/tournaments/join', joinObj)
        .then((response) => {
          if (response.data.added) {
            setJoinMessage(`You've been added!`);
          } else {
            setJoinMessage(`Sorry, tourney full`);
          }
          handleToggleJoinMessage();
          getTournaments();
        });
    };

     const handleToggleJoinMessage = () => {
       setToggleJoinMessage(!toggleJoinMessage);
     };

    return (
        <div id={`tourney-${tourney.id}`} className='singular-tourney'>
            <hr/>
            <h1>{tourney.name}</h1>
            <h2>Game: {tourney.game}</h2>
            <p>{'Owner: '}
                {userList.map((user) => {
                    return (
                        <>
                            {user.id === tourney.owner &&
                            user.username
                            }
                        </>
                    )
                })}
            </p>
            <h2>Champion:
            {tourney.complete ? tourney.champion : 'Undecided'}
            </h2>
            <h3>{tourney.prizes}</h3>
            <p>{tourney.details}</p>
            {toggleJoinMessage &&
              <p>{joinMessage}</p>
            }
            {tourney.players.includes(currUser.id) ?
              null
              :
              tourney.complete ?
              <button>Locked</button>
              :
                currUser.username ?
                <button onClick={handleJoin}>Join</button>
                :
                  <button>You must be logged in to join</button>
            }
            <p>Size: {tourney.players.length}</p>
            <h4><u>Participants</u></h4>
            {userList.map((user) => {
                return (
                    <div className='participant-list'>
                        {tourney.players.includes(user.id) &&
                        <p>{user.username}</p>
                        }
                    </div>
                )
            })}
            <DisplayBracket tournamentId={tourney.id} userList={userList} />
            <hr/>
            {/*tourney.players.map((player) => {
                return(
                    <>
                        <p>{player}</p>
                    </>
                )
            })*/}
        </div>
    );
};

export default DisplayTourney;