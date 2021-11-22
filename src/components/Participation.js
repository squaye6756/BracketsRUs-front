import {Link} from 'react-router-dom';
import '../views/participating.css';

const Participation = ({currUser, tournaments}) => {
    return (
        <>
            {currUser.username &&
              <>
                <h1 className='partic-h1'>Participating in:</h1>
                <hr/>
                <div className='tourneyList'>
                  {tournaments.map((tourney) => {
                    return(
                      <>
                        {tourney.players.includes(currUser.id) &&
                          <div className='participating-single-tourney' key={`participating-${tourney.id}`}>
                              <h2>Name: {tourney.name}</h2>
                              <h3>Game: {tourney.game}</h3>
                              <h3>Details: {tourney.details}</h3>
                              <h3>Prize: {tourney.prizes}</h3>
                              <h3>Limit: {tourney.limit}</h3>
                              <Link to={`/tournament/${tourney.id}`}>See Details</Link>
                          </div>
                        }
                      </>
                    )
                  })}
                </div>
              </>
            }
        </>
    )
}

export default Participation;
