import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import DisplayBrackets from '../components/DisplayBrackets'
import Edit from '../components/Edit.js';
import '../views/tourneyDetails.css';

const DisplayTourney = ({tournaments, currUser, getTournaments, handleEdit }) => {
    const {id} = useParams();
    const [joinMessage, setJoinMessage] = useState('');
    const [toggleJoinMessage, setToggleJoinMessage] = useState(false);
    const [userList, setUserList] = useState([]);
    const [tourney, setTourney] = useState({});
    const [brackets, setBrackets] = useState([]);

    const getBrackets = () => {
      axios.get('https://bracketsrus.herokuapp.com/api/brackets')
      .then((response) => {
        const allBrackets = response.data;
        const filteredBrackets = allBrackets.filter(bracket => bracket.tournament === tourney.id);
        setBrackets(filteredBrackets);
      });
    };

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

     const getUsers = () => {
         axios.get('https://bracketsrus.herokuapp.com/api/users')
         .then((response) => {
            for (const user of response.data) {
              delete user.password;
            }
            setUserList(response.data);
         });
     }

     const handleDeleteTourney = (event) => {
         axios.delete(`https://bracketsrus.herokuapp.com/api/tournaments/${event.target.value}`)
         .then((response) => {
             getTournaments()
         });
     }

     const getTourney = () => {
         axios.get('https://bracketsrus.herokuapp.com/api/tournaments')
         .then((response) => {
             const tournament = response.data.filter((t) => t.id === parseInt(id));
             setTourney(tournament[0]);
         });
     }

     useEffect(() => {
        getTourney();
        getUsers();
     }, [tournaments]);

    useEffect(() => {
      getBrackets()
    }, [tourney])

    return (
        <>
          <div id={`tourney-${tourney.id}`} className='singular-tourney'>
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
            <h2>Champion: {tourney?.champion ?
              userList.filter((user) => user.id === tourney.champion)[0]?.username
              :
              'Undecided'}
            </h2>
            <p>Prizes: {tourney.prizes}</p>
            <p>Details: {tourney.details}</p>
            {toggleJoinMessage &&
              <p>{joinMessage}</p>
            }
            {tourney.players?.includes(currUser.id) ?
              null
              :
              tourney.complete || tourney.locked ?
              <button>Locked</button>
              :
                currUser?.username ?
                <button onClick={handleJoin}>Join</button>
                :
                  <button>You must be logged in to join</button>
            }
            <p>Size: {tourney.players?.length}/{tourney.limit}</p>
            <h3><u>Participants</u></h3>
            {tourney.players?.length === 0 &&
              <p>None yet</p>
            }
            {userList.map((user) => {
                return (
                    <div className='participant-list' key={`partic-${tourney.id}-${user.id}`}>
                        {tourney.players?.includes(user.id) &&
                        <p>{user.username}</p>
                        }
                    </div>
                )
            })}
            <DisplayBrackets tourney={tourney} tournamentId={tourney.id} userList={userList} currUser={currUser} brackets={brackets} getBrackets={getBrackets} handleEdit={handleEdit} />
            {currUser.id === tourney.owner &&
              <Edit handleEdit={handleEdit} tourney={tourney} getTournaments={getTournaments} tournaments={tournaments} handleDeleteTourney={handleDeleteTourney}/>
            }
          </div>
      </>
    );
};

export default DisplayTourney;
