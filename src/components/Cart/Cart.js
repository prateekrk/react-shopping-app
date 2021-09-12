import { useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import './Cart.css'
const Cart=(props)=>{
    const{setCart,value,setValue,increment,decrement,removeFromCart,cartTotal}=props
    const cartItems=(JSON.parse(localStorage.getItem('cart')||"[]"))   
    console.log(cartTotal)
    return(
        <div id="cart-container">
             
            <Card id="cart-check-out-slip">
            <Card.Title>Check Out Slip </Card.Title>
        <div id="cart-item-card">{cartItems.map((cartItem,id)=>(
        <section id="item-cards" key={id}>
            <h6>{cartItem.name}</h6>
                <div id="quantity-input">
                    <button className="quantity-input__modifier quantity-input__modifier--left" onClick={()=>decrement(id)}>
                    &mdash;
                    </button>
                    <input className="quantity-input__screen" type="text" value={cartItem.quantity}/>
                    <button className="quantity-input__modifier quantity-input__modifier--right" onClick={()=>increment(id)}>
                    &#xff0b;
                    </button>  
                    <button id="cart-item-remove-button" onClick={()=>removeFromCart(cartItem)}><i class="fa fa-trash fa-lg"></i></button>
                </div>
                <text>Rs.{cartItem.price*cartItem.quantity}</text>
        </section>
        
         ))}
         </div>         
         </Card>
         <h4>Total : Rs.{cartTotal}</h4>

        <a href="/checkOut">
         <button className="btn btn-primary"  id="cart-card-check-out-button">Check Out</button>
        </a>  
        </div>
    )
}
export default Cart