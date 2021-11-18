import {useState} from 'react';

const User = ({currUser}) => {

    return (
        <>
            <h2>Welcome, {currUser.username}</h2>
        </>
    )
}

export default User;
