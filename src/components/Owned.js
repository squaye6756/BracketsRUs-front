import {useState, useEffect} from 'react';
import axios from 'axios';
import Edit from '../components/Edit.js';

const Owned = ({currUser, tournaments, getTournaments}) => {

    const handleEdit = (editTourney) => {
        console.log(editTourney)
        axios.put('https://bracketsrus.herokuapp.com/api/tournaments/' + editTourney.id, editTourney)
        .then((response) => {
            console.log(response)
            getTournaments()
        })
    }

    const handleDeleteTourney = (event) => {
        axios.delete(`https://bracketsrus.herokuapp.com/api/tournaments/${event.target.value}`)
        .then((response) => {
            getTournaments()
        });
    }

    useEffect(() => {
        getTournaments()
    }, []);

    return (
        <>
            {
                tournaments.map((tourney) => {
                    return (
                        <>
                            {currUser.id === tourney.owner &&
                                <div className='owned-single-tourney' key={`owned-${tourney.id}`}>
                                    <h2>{tourney.name}</h2>
                                    <h3>{tourney.details}</h3>
                                    <h3>{tourney.game}</h3>
                                    <h3>{tourney.prizes}</h3>
                                    <h3>{tourney.limit}</h3>
                                    <Edit handleEdit={handleEdit} tourney={tourney} getTournaments={getTournaments} tournaments={tournaments} handleDeleteTourney={handleDeleteTourney}/>
                                </div>
                            }
                        </>
                    )
                })
            }
        </>
    )
}

export default Owned;
