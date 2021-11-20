import {useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../components/Login.js';
import Signup from '../components/Signup.js';
import User from '../components/User.js';
import TourneyList from '../components/TourneyList.js';
import {Link} from 'react-router-dom';

const Home = ({toggleLogout, handleLogout, toggleLogin, handleLogin, toggleError,
    errorMsg, handleUserSignUp, handleToggleForm, currUser, userList,
    tournaments, getTournaments}) => {

    return (
        <div>
            {currUser.username &&
                <>
                    <Link to='/user'>User Page</Link>
                    <div>
                        <h2>Welcome, {currUser.username}</h2>
                    </div>
                </>
            }
            {toggleLogout ?
            <button onClick={handleLogout}>Logout</button>
            :
            <div>
                {toggleLogin ?
                <Login handleLogin={handleLogin} toggleError={toggleError} errorMsg={errorMsg}/>
                :
                <Signup handleUserSignUp={handleUserSignUp} toggleError={toggleError} errorMsg={errorMsg}/>
                }
                <button onClick={handleToggleForm}>{toggleLogin ? 'Need an account?' :'Already have an account?'}</button>
            </div>
            }
            {<TourneyList currUser={currUser} userList={userList} tournaments={tournaments} getTournaments={getTournaments}/>}
        </div>
    )
}

export default Home;
