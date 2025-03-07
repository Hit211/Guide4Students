import { useSelector } from "react-redux"
import { Navigate } from "react-router";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated,token} = useSelector((state)=>state.auth);
    if(token) return children;
    return isAuthenticated? children : <Navigate to="/login"/>
}

export default ProtectedRoute;