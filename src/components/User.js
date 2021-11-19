import {useState} from 'react';
import axios from 'axios';
import MakeTourney from './MakeTourney.js';

const User = ({currUser}) => {
    const [showCreate, setShowCreate] = useState(false);

    const handleCreateTourney = (newTourney) => {
        console.log(newTourney);
        axios.post('https://bracketsrus.herokuapp.com/api/tournaments', newTourney)
        .then((response) => {
            console.log(response);
        });
    }

    const toggleCreateTourney = (event) => {
        setShowCreate(!showCreate);
    }

    return (
        <>
            <h2>Welcome, {currUser.username}</h2>
            <button onClick={toggleCreateTourney}>
            {showCreate ? 'Cancel' : 'Add Tourney'}
            </button>
            {showCreate &&
            <MakeTourney handleCreateTourney={handleCreateTourney} currUser={currUser}/>
            }
        </>
    )
}

export default User;
