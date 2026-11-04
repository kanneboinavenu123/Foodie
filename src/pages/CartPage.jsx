
import React from "react";
import { useCart } from "../context/CartContext";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const style = {
    position: 'absolute',
    top: '15%',
    left: '35%',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: '1px 2px 3px gray',
    p: 4,
};


function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, setCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [open, setOpen] = React.useState(false);
    const handleSubmit = () => setOpen(true);
    const handleClick = () => {
        setOpen(false);
        navigate('/orders')
    }
    const handleRemove = () => {
        setCart([])
        navigate('/home')
    }
    const amount = { total };
    const upiUrl = `upi://pay?pa=kanneboinavenu123@ibl&pn=KanneboinaVenu&am=${amount.total}&cu=INR&tn=FoodOrder`;



    return (
        <section className="cart-page">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
            <ul className="cart-list">
                {cart.map((item) => (
                    <li key={item.id} className="cart-item">

                    <div className="cart-item-details">
                        <div><img src={item.img} alt={item.name} className="cart-item-image" /></div>
                        <div><h4>{item.name}</h4>
                        <p>₹{item.price} × {item.quantity}</p>
                        <p><strong>Total:</strong> ₹{item.price * item.quantity}</p>

                        <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        >
                        Remove One
                                </button>
                    </div>
                    </div>
                    </li>
                ))}
            </ul>
                    <h3>Total: ₹{total}</h3>
                    <button className="order-btn" onClick={handleSubmit}>Proceed to Checkout</button>
                    <Modal
                        open={open}

                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                              <button className="order-btn" onClick={handleClick} >continue odering</button>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Else Please Confirm Your Payment By Scanning Below QR Code !..
                            </Typography>
                            <QRCode
                                className="qrcode"
                                value={upiUrl}
                                size={200}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H" />
                                <h2 style={{color:'blue'}}>₹pay:- {total}</h2>
                        <div style={{display:'flex',justifyContent:'end'}}><button className="order-btn" onClick={handleRemove}>Done</button></div>
                        </Box>
                    </Modal>
                </>
            )}
        </section>
    );
}

export default CartPage;