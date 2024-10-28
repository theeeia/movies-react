import { Navigate } from 'react-router-dom';

const Reroute = () => {
    console.log("reroute")
    return <Navigate to="/movies/now-playing" replace />;
};

export default Reroute;