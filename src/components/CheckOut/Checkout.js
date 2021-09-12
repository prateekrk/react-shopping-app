import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import fire from '../../Firebase'
import usePost from '../../services/usePost'
import './Checkout.css'

const Checkout=(props)=>{
    const{cartTotal,cart,city,address,setCity,setAddress,pincode,setPincode,handleRedirect}=props
    const history=useHistory()
   
    const [order,setOrder]=React.useState({
        customerEmail:fire.auth().currentUser.email,
        customerAddress:address+", "+city+", "+pincode,
        items:cart,
      })
      order.items.forEach(element => {
          delete element.id
          delete element.name
          delete element.description
          delete element.category
          delete element.price
      });
      const adr=(address+" "+city+" "+pincode)
      order.customerAddress=adr
      console.log(order)
      const placeOrder=()=>{
        fetch('http://localhost:8082/orders/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        })
        .then((res) => {
            res.json()
            history.push("/")
        })
        .catch((err) => {localStorage.setItem('err',err.message)
        alert(err.message)})
      }  
      
    return(
        <section id="check-out-container">
            <h2>Order Summary And Check Out</h2>
            <div class="row">
            <div class="col-75">
                <div class="container">
                <form >
                
                    <div class="row">
                    <div class="col-50">
                        <h3>Billing Address</h3>
                        <label htmlFor="fname"><i class="fa fa-user"></i> Full Name</label>
                        <input type="text" id="fname" name="firstname" placeholder="Barney Stinson"  />
                        <label htmlFor="email"><i class="fa fa-envelope"></i> Email</label>
                        <input type="text" id="email" name="email" placeholder={fire.auth().currentUser.email} readOnly="true"/>
                        <label htmlFor="adr"><i class="fa fa-address-card-o"></i> Address</label>
                        <input type="text" id="address" name="address" placeholder="2nd Street Hoysalanagar,Rammurthy Nagar" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                        <label htmlFor="pincode"><i class="fa fa-map-pin" aria-hidden="true"></i> Pincode</label>
                        <input type="text" id="pincode" name="pincode" placeholder="560016" onChange={(e)=>setPincode(e.target.value)} value={pincode}/>
                        <label htmlFor="city"><i class="fa fa-institution"></i> City</label>
                        <input type="text" id="city" name="city" placeholder="Bengaluru" onChange={(e)=>setCity(e.target.value)} value={city}/>
                    </div>

                    <div class="col-50">
                        <h3>Payment</h3>
                        <label htmlFor="fname">Accepted Cards</label>
                        <div class="icon-container">
                        <i class="fa fa-cc-visa"></i>
                        <i class="faa fa-cc-amazon-pay"></i>
                        <i class='fab fa-amazon-pay'></i>
                        
                    </div>
                        <label htmlFor="cname">Name on Card</label>
                        <input type="text" id="cname" name="cardname" placeholder="John More Doe"/>
                        <label htmlFor="ccnum">Credit card number</label>
                        <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
                        <label htmlFor="expmonth">Exp Month</label>
                        <input type="text" id="expmonth" name="expmonth" placeholder="September"/>
                        <div class="row">
                        <div class="col-50">
                            <label htmlFor="expyear">Exp Year</label>
                            <input type="text" id="expyear" name="expyear" placeholder="2018"/>
                        </div>
                        <div class="col-50">
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" placeholder="352"/>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                    
                    
                    <button class="btn btn-primary" onClick={()=>placeOrder('/')}>Continue to checkout</button>
                </form>
                </div>
            </div>
            <div class="col-25">
                <div class="container">
                <h4>Cart <span class="price" ><i class="fa fa-shopping-cart"></i> <b>{cart.length}</b></span></h4>
                {cart.map((cartItem,id)=>(
                    <p>
                    <a href="#">{cartItem.name}</a> <span class="price">Rs.{cartItem.price}</span>
                </p>
                ))}
                
                <hr/>
                <p>Total <span class="price"><b>Rs. {cartTotal}</b></span></p>
                </div>
            </div>
            </div>
        </section>
    )
}
export default Checkout