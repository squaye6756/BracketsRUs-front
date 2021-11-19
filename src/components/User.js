import {useState, useEffect} from 'react';
import axios from 'axios';
import MakeTourney from './MakeTourney.js';
import TourneyList from './TourneyList.js';

const User = ({currUser, userList, getTournaments}) => {
    const [showCreate, setShowCreate] = useState(false);


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
            <MakeTourney currUser={currUser} getTournaments={getTournaments}/>
            }
        </>
    )
}

export default User;
