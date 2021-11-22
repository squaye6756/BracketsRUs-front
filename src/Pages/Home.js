import TourneyList from '../components/TourneyList.js';

const Home = ({currUser, tournaments, getTournaments}) => {

    return (
        <div>
          <TourneyList currUser={currUser} tournaments={tournaments} getTournaments={getTournaments}/>
      </div>
    )
}

export default Home;
