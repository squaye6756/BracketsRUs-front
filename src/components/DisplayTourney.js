import {useState, useEffect} from 'react';
import axios from 'axios';
import DisplayBracket from './DisplayBracket'

const DisplayTourney = ({tourney, userList}) => {




    return (
        <div id={`tourney-${tourney.id}`} className='singular-tourney'>
            <hr/>
            <h1>{tourney.name}</h1>
            <h2>Game: {tourney.game}</h2>
            <p>{'Owner: '}
                {userList.map((user) => {
                    return (
                        <>
                            {user.id === tourney.owner &&
                            user.username
                            }
                        </>
                    )
                })}
            </p>
            <h2>Champion:
            {tourney.complete ? tourney.champion : 'Undecided'}
            </h2>
            <h3>{tourney.prizes}</h3>
            <p>{tourney.details}</p>
            {tourney.complete ?
            <button>Locked</button>
            :
            <button>Join</button>}
            <p>Size: {tourney.players.length}</p>
            <h4><u>Participants</u></h4>
            {userList.map((user) => {
                return (
                    <div className='participant-list'>
                        {tourney.players.includes(user.id) &&
                        <p>{user.username}</p>
                        }
                    </div>
                )
            })}
            <DisplayBracket tournamentId={tourney.id} userList={userList} />
            <hr/>
            {/*tourney.players.map((player) => {
                return(
                    <>
                        <p>{player}</p>
                    </>
                )
            })*/}
        </div>
    )
}

export default DisplayTourney;
