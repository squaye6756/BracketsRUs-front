import DisplayRound from './DisplayRound'
import CreateFirstRoundBracket from './CreateFirstRoundBracket'

const DisplayBrackets = ({ tourney, userList, currUser, brackets, getBrackets, handleEdit }) => {

  return (
      <div className="bracket">
        {brackets[0] ?
          <>
          <h3><u>Brackets</u></h3>
          {brackets.map((bracket, index) => {
            return (
              <div key={index}>
              {index === brackets.length - 1 ?
                <DisplayRound tourney={tourney} currUser={currUser} bracket={bracket} userList={userList} key={bracket.id} getBrackets={getBrackets} handleEdit={handleEdit} isLatestRound={true}/>
                :
                <DisplayRound tourney={tourney} currUser={currUser} bracket={bracket} userList={userList} key={bracket.id} getBrackets={getBrackets} handleEdit={handleEdit} isLatestRound={false}/>
              }
              </div>
            )
          })}
          </>
        :
          <>
            <h3>No Brackets Yet</h3>
            {tourney.locked & !brackets[0] & currUser.id === tourney.owner & tourney.players?.length > 2 ?
              <CreateFirstRoundBracket
                players={tourney.players}
                tournamentId={tourney.id}
                getBrackets={getBrackets}
              />
              :
              null
            }
          </>
        }
      </div>
  );
};

export default DisplayBrackets;
