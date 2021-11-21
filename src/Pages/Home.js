import Login from '../components/Login.js';
import Signup from '../components/Signup.js';
import TourneyList from '../components/TourneyList.js';

import Sidebar from '../components/Sidebar.js';

const Home = ({toggleLogout, handleLogout, toggleLogin, handleLogin, toggleError, errorMsg, handleUserSignUp, handleToggleForm, currUser, tournaments, getTournaments}) => {

    return (
        <div>
          <TourneyList currUser={currUser} tournaments={tournaments} getTournaments={getTournaments}/>
      </div>
    )
}

export default Home;
