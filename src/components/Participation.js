

const Participation = ({currUser, tournaments}) => {
    return (
        <>
            {currUser.username &&
              <>
                <div className='tourneyList'>
                  <h1>Participating in:</h1>
                  <hr/>
                  {tournaments.map((tourney) => {
                    return(
                      <>
                        {tourney.players.includes(currUser.id) &&
                          <div className='participating-single-tourney' key={`participating-${tourney.id}`}>
                              <h2>{tourney.name}</h2>
                              <h3>{tourney.details}</h3>
                              <h3>{tourney.game}</h3>
                              <h3>{tourney.prizes}</h3>
                              <h3>{tourney.limit}</h3>
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
