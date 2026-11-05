import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("loggedInUser");

 return !isAuthenticated?  children :<Navigate to="/home" replace={true} />;


};

export default PublicRoute;
