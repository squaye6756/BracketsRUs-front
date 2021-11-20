import {useState} from 'react';
import axios from 'axios';
import DisplayBrackets from '../components/DisplayBrackets'

const DisplayTourneyPage = ({ tourney, userList, currUser, getTournaments }) => {
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
            {userList.map((user) => {
                return (
                    <div key={`ownership?-${tourney.id}-${user.id}`}>
                        {user.id === tourney.owner &&
                        <p>{`Owner: ${user.username}`}</p>
                        }
                    </div>
                )
            })}
            <h2>Champion: {tourney.complete ? tourney.champion : 'Undecided'}
            </h2>
            <h3>{tourney.prizes}</h3>
            <p>{tourney.details}</p>
            {toggleJoinMessage &&
              <p>{joinMessage}</p>
            }
            {tourney.players.includes(currUser.id) ?
              null
              :
              tourney.complete || tourney.locked ?
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
                    <div className='participant-list' key={`partic-${tourney.id}-${user.id}`}>
                        {tourney.players.includes(user.id) &&
                        <p>{user.username}</p>
                        }
                    </div>
                )
            })}
            <DisplayBrackets tourney={tourney} tournamentId={tourney.id} userList={userList} currUser={currUser}/>
            <hr/>
        </div>
    );
};

export default DisplayTourneyPage;
