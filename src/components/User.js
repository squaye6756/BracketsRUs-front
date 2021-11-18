import {useState} from 'react';
import axios from 'axios';
import MakeTourney from './MakeTourney.js';

const User = ({currUser}) => {

    const handleCreateTourney = (newTourney) => {
        console.log(newTourney);
        axios.post('https://bracketsrus.herokuapp.com/api/tournaments', newTourney)
        .then((response) => {
            console.log(response);
        });
    }

    return (
        <>
            <h2>Welcome, {currUser.username}</h2>
            <MakeTourney handleCreateTourney={handleCreateTourney}
            currUser={currUser}/>
        </>
    )
}

export default User;
