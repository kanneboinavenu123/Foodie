import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Header() {
  const [isOpen,setIsOpen]=useState(false);
  const { cartCount } = useCart();



  return (
    <header className="header">
      <h1 className="logo">Foodie</h1>
      <nav>
        <div className={`menu-icon`}>
        {isOpen ?  <FaTimes onClick={()=>setIsOpen(!isOpen)} />:<FaBars onClick={()=>setIsOpen(!isOpen)}/>  }
      </div>
          {isOpen?
        <ul className={'nav-links'} >
          <li><Link to="/home" onClick={()=>setIsOpen(false)}>Home</Link></li>
          <li><Link to="/foodItems" onClick={()=>setIsOpen(false)}>Food Items</Link></li>
          <li><Link to="/orders" onClick={()=>setIsOpen(false)}>Orders</Link></li>
          <li><Link to="/cart" onClick={()=>setIsOpen(false)}>🛒 <span className="badge">{cartCount}</span></Link></li>
          <li><Link to="/logout" onClick={()=>setIsOpen(false)}>Logout</Link></li>
          <li><Link to="/contact" onClick={()=>setIsOpen(false)}>Contact</Link></li>
        </ul>
          :""}
           <ul className={'nav-links desktop'} >
          <li><Link to="/home" onClick={()=>setIsOpen(false)}>Home</Link></li>
          <li><Link to="/foodItems" onClick={()=>setIsOpen(false)}>Food Items</Link></li>
          <li><Link to="/orders" onClick={()=>setIsOpen(false)}>Orders</Link></li>
          <li><Link to="/cart" onClick={()=>setIsOpen(false)}>🛒 <span className="badge">{cartCount}</span></Link></li>
          <li><Link to="/logout" onClick={()=>setIsOpen(false)}>Logout</Link></li>
          <li><Link to="/contact" onClick={()=>setIsOpen(false)}>Contact</Link></li>
        </ul>

      </nav>
    </header>
  );
}

export default Header;
