import React from "react";
import { Link,useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate()
  const handleClick=()=>{
      navigate('/about')
  }

  return (
    <section className="hero">
      <h2>Delicious food delivered to you</h2>
      <p>Order now and enjoy tasty meals at home</p>
      <Link to='/orders'><button className="order-btn">Order Now</button></Link>
       <button onClick={handleClick} className="about" >About the Founder of thid website</button>
    </section>
  );
}

export default HomePage;
