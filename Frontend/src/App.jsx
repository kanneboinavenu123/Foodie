import {lazy,Suspense} from "react"
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import "./App.css";

  const HomePage = lazy(() => import("./pages/HomePage"));
  const FoodItemsPage = lazy(() => import("./pages/FoodItemsPage"));
  const OrdersPage = lazy(() => import("./pages/OrdersPage"));
  const CartPage = lazy(() => import("./pages/CartPage"));
  const LogPage = lazy(()=> import("./pages/LogPage"))
  const ContactPage = lazy(() => import("./pages/ContactPage"));
  const LoginPage = lazy(() => import("./pages/LoginPage"));
  const SignupPage = lazy(() => import("./pages/SignUpPage"));
  const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
  const PublicRoute = lazy(() => import("./routes/PublicRoute"));
const foodItems = lazy(() => import("./food/foodItems"));
const AboutPage = lazy(() => import("./context/AboutPage"));
  const Profile = lazy(() => import("./context/Profile"));





function App() {


  return (
    <BrowserRouter>
    <Suspense fallback={<div className="loader">
      <div className="loading"></div>
      <h1>Loading...</h1></div>}>
      <CartProvider>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/foodItems" element={<ProtectedRoute><FoodItemsPage/></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrdersPage items={foodItems} /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
            <Route path="/logout" element={<ProtectedRoute><LogPage /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />



          <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />


          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>


      </CartProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
