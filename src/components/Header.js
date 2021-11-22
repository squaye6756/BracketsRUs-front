import '../views/header.css';
import {Link} from 'react-router-dom';

const Header = ({currUser, handleToggle}) => {
  return(
    <div className="header">
    <div className="header-content">
      <div className="hamburger-icon" onClick={handleToggle}>
        <div className="lines"></div>
        <div className="lines"></div>
        <div className="lines"></div>
      </div>
      <Link id='bracketsrus' to='/'>Brackets-R-Us</Link>
    </div>
    </div>
  )
}

export default Header;
