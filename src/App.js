import {useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import User from './components/User.js';
import TourneyList from './components/TourneyList.js'

const App = () => {
    const [toggleLogin, setToggleLogin] = useState(true);
    const [toggleError, setToggleError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggleLogout, setToggleLogout] = useState(false);
    const [currUser, setCurrUser] = useState({});
    const [userList, setUserList] = useState([]);
    let [tournaments, setTournaments] = useState([])

    const getTournaments = () => {
        axios
        .get('https://bracketsrus.herokuapp.com/api/tournaments')
        .then((response) => {
            setTournaments(response.data)
        })
    }

    const handleUserSignUp = (newUser) => {
        axios.post('https://bracketsrus.herokuapp.com/api/users', newUser)
        .then((response) => {
            if (response.data.username) {
                console.log(response);
                setToggleError(false);
                setErrorMsg('');
                setCurrUser(response.data);
                handleToggleLogout();
            } else {
                console.log('signup error\n', response.data);
                setErrorMsg(response.data);
                setToggleError(true);
            }
        });
    }

    const handleLogin = (userObj) => {
        console.log(userObj);
        axios.put('https://bracketsrus.herokuapp.com/api/users/login', userObj)
        .then((response) => {
            if (response.data.username) { //only shows up upon successful login
                console.log(response);
                setToggleError(false);
                setErrorMsg('');
                setCurrUser(response.data);
                handleToggleLogout();
            } else {
                console.log('error', response);
                setToggleError(true);
                setErrorMsg(response.data.error);
            }
        })
    }

    const handleLogout = () => {
        setCurrUser({});
        handleToggleLogout();
    }

    const handleToggleLogout = () => {
        setToggleError(false);
        if (toggleLogout) {
            setToggleLogout(false);
        } else {
            setToggleLogout(true);
        }
    }

    const handleToggleForm = () => {
        setToggleError(false);
        if (toggleLogin) {
            setToggleLogin(false);
        } else {
            setToggleLogin(true);
        }
    }

    const getUsers = () => {
        axios.get('https://bracketsrus.herokuapp.com/api/users')
        .then((response) => {
            setUserList(response.data);
        });
    }

    useEffect(() => {
        getUsers();
        getTournaments();
    }, []);

    return (
        <>
            <div>
                {toggleLogout ?
                <>
                <button onClick={handleLogout}>Logout</button>
                <User currUser={currUser} userList={userList} getTournaments={getTournaments}/>
                </>
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
        </>
    )
}

export default App;
