import {Link} from 'react-router-dom';
import '../views/header.css';

const Header = ({currUser, handleToggle}) => {
  return(
    <div className="header">
    <div className="header-content">
      <div className="hamburger-icon" onClick={handleToggle}>
        <div className="lines"></div>
        <div className="lines"></div>
        <div className="lines"></div>
      </div>
      <h2 id='bracketsrus'>Brackets-R-Us</h2>
    </div>
    </div>
  )
}

export default Header;
