import MakeTourney from '../components/MakeTourney.js';
import Participation from '../components/Participation.js';
import Owned from '../components/Owned.js';
import {useNavigate, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

const LoggedInUser = ({currUser, tournaments, getTournaments}) => {
    const [showCreate, setShowCreate] = useState(false);
    const [showParticipation, setShowParticipation] = useState(false);
    const [showOwned, setShowOwned] = useState(false);

    const toggleCreateTourney = (event) => {
        setShowCreate(!showCreate);
    }

    const toggleParticipation = (event) => {
        setShowParticipation(!showParticipation);
    }

    const toggleOwned = (event) => {
        setShowOwned(!showOwned);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!currUser?.username) {
            navigate('/');
        }
    }, [currUser, navigate]);

    return (
        <>
            <Link to='/'>Home Page</Link>
            {currUser?.username &&
                <>
                    <h2>Welcome, {currUser.username}</h2>
                    <button onClick={toggleCreateTourney}>
                    {showCreate ? 'Cancel' : 'Add Tourney'}
                    </button>
                    <button onClick={toggleParticipation}>
                    {showParticipation ? 'Hide Participation' : 'Show Participation'}
                    </button>
                    <button onClick={toggleOwned}>
                    {showOwned ? 'Hide Your Tournaments' : 'Show Your Tournaments'}
                    </button>
                    {showCreate &&
                        <MakeTourney currUser={currUser} getTournaments={getTournaments}/>
                    }
                    {showParticipation &&
                        <Participation currUser={currUser} tournaments={tournaments}/>
                    }
                    {showOwned &&
                        <Owned currUser={currUser} tournaments={tournaments} getTournaments={getTournaments}/>
                    }
                </>
            }
        </>
    )
}

export default LoggedInUser;
