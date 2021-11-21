import Login from '../components/Login.js';
import Signup from '../components/Signup.js';
import Header from '../components/Header.js';
import {useState, useEffect} from 'react';
import '../views/sidebar.css';
import {Link} from 'react-router-dom';

const Sidebar = ({toggleLogout, handleLogout, toggleLogin, handleLogin, toggleError, errorMsg, handleUserSignUp, handleToggleForm, currUser, tournaments, getTournaments}) => {

  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleToggle = () => {
    if (isCollapsed) {
      setIsCollapsed(false)
      return
    }
    setIsCollapsed(true);
  }

  useEffect(() => {
      document.body.classList.toggle('move-body', isCollapsed)
    }, [isCollapsed])

  return(
    <div>
      <Header handleToggle={handleToggle}/>
      <div className={isCollapsed ? "sidebar" : "collapsed"}>
          <div className="sidebar-content">
          {currUser.username &&
              <>
                <div>
                  <h2>Welcome, {currUser.username}</h2>
                </div>
                <Link className="link" to='/user'>User Page</Link>
                <br />
                <Link className="link" to='/'>Home Page</Link>
                <br />
                <br />
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
          </div>
        </div>
    </div>
  )
}

export default Sidebar;
