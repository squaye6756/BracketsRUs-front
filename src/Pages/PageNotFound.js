import {Link, useLocation} from 'react-router-dom';

const PageNotFound = () => {
  const {pathname} = useLocation();

  return (
    <>
      <h2>Page Not Found</h2>
      <h3>Sorry, but https://brackets-r-us.herokuapp.com{pathname} does not exist.</h3>
      <h4>Go <Link to='/'>Home</Link></h4>
    </>
  );
};

export default PageNotFound;
