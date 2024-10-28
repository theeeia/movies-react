import { Navigate } from 'react-router-dom';

const Reroute = () => {
    return <Navigate to="/movies/now-playing" replace />;
};

export default Reroute;