import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home.js';
import LoggedInUser from './Pages/LoggedInUser.js';
import DisplayTourney from './Pages/DisplayTourney.js';
import PageNotFound from './Pages/PageNotFound.js';
import Sidebar from './components/Sidebar.js';

const App = () => {
    const [toggleLogin, setToggleLogin] = useState(true);
    const [toggleError, setToggleError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [toggleLogout, setToggleLogout] = useState(false);
    const [currUser, setCurrUser] = useState({});
    let [tournaments, setTournaments] = useState([]);

    const getTournaments = () => {
        axios
        .get('https://bracketsrus.herokuapp.com/api/tournaments')
        .then((response) => {
            setTournaments(response.data);
        })
    };

    const handleUserSignUp = (newUser) => {
        axios.post('https://bracketsrus.herokuapp.com/api/users', newUser)
        .then((response) => {
            if (response.data.username) {
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
    };

    const handleLogin = (userObj) => {
        // console.log(userObj);
        axios.put('https://bracketsrus.herokuapp.com/api/users/login', userObj)
        .then((response) => {
            if (response.data.username) { //only shows up upon successful login
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
    };

    const handleLogout = () => {
        setCurrUser({});
        handleToggleLogout();
    };

    const handleToggleLogout = () => {
        setToggleError(false);
        if (toggleLogout) {
            setToggleLogout(false);
        } else {
            setToggleLogout(true);
        }
    };

    const handleToggleForm = () => {
        setToggleError(false);
        if (toggleLogin) {
            setToggleLogin(false);
        } else {
            setToggleLogin(true);
        }
    };

    const handleEdit = (editTourney) => {
      axios.put('https://bracketsrus.herokuapp.com/api/tournaments/' + editTourney.id, editTourney)
      .then((response) => {
        getTournaments();
      });
    };

    useEffect(() => {
        getTournaments();
    }, []);

    return (
        <BrowserRouter>
        <Sidebar handleUserSignUp={handleUserSignUp}
        handleLogin={handleLogin} handleLogout={handleLogout}
        handleToggleLogout={handleToggleLogout} handleToggleForm={handleToggleForm} toggleLogin={toggleLogin} toggleError={toggleError}
        errorMsg={errorMsg} toggleLogout={toggleLogout} currUser={currUser}/>
            <Routes>
                <Route path='/' element={<Home getTournaments={getTournaments} currUser={currUser} tournaments={tournaments}/>}
                exact />
                <Route path='/user' element={<LoggedInUser getTournaments={getTournaments} tournaments={tournaments} currUser={currUser} handleEdit={handleEdit} />}/>
                <Route path='/tournament/:id' element={<DisplayTourney tournaments={tournaments} getTournaments={getTournaments} currUser={currUser} handleEdit={handleEdit} />}/>
                <Route path='*' element={<PageNotFound />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
