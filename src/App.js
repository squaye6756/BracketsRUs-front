import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Login from './components/Login.js';
import Signup from './components/Signup.js';

const App = () => {
    const [toggleLogin, setToggleLogin] = useState(true);
    const [toggleError, setToggleError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggleLogout, setToggleLogout] = useState(false);
    const [currUser, setCurrUser] = useState({});

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
                console.log(response);
                setToggleError(true);
                setErrorMsg(response.data);
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

    return (
        <>
            <div>
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
            </div>
        </>
    )
}

export default App;
