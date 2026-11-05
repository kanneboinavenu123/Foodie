import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProtectedRoute = ({ children }) => {

       const isAuthenticated = !!localStorage.getItem("loggedInUser");

 return isAuthenticated?  <>  <Header />{children} <Footer /></> :<Navigate to="/" replace />;


};

export default ProtectedRoute;
