import {useState} from 'react';

const MakeTourney = ({currUser, handleCreateTourney}) => {
    const blankTourney = {
        name: "",
        game: "",
        limit: 16,
        details: "",
        prizes: "",
        owner: currUser.id,
    }

    const [tourney, setTourney] = useState(blankTourney);

    const handleChange = (event) => {
        setTourney({...tourney, [event.target.name]:event.target.value})
    }

    const submitNewTourney = (event) => {
        event.preventDefault();
        handleCreateTourney(tourney);
        setTourney(blankTourney)
    }

    return (
        <>
            <h1>Create Tournament</h1>
            <form onSubmit={submitNewTourney}>
                <label htmlFor='name'>Name: </label>
                <input type='text' name='name' onChange={handleChange} value={tourney.name}/>
                <label htmlFor='game'>Game: </label>
                <input type='text' name='game' onChange={handleChange} value={tourney.game}/>
                <label htmlFor='limit'>Size Limit: </label>
                <input type='number' name='limit' min='0' max='16' onChange={handleChange} value={tourney.limit}/>
                <label htmlFor='details'>Details: </label>
                <input type='textarea' name='details' onChange={handleChange} value={tourney.details}/>
                <label htmlFor='prizes'>Prizes: </label>
                <input type='text' name='prizes' onChange={handleChange} value={tourney.prizes}/>
                <input type='submit'/>
            </form>
        </>
    )
}

export default MakeTourney;
