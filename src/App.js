import logo from './logo.svg';
import './App.css';
import { useState,useEffect, Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import fire from './Firebase';
import Login from './components/Login/Login';
import {BrowserRouter as Router,Route,Switch, useHistory} from 'react-router-dom';
import Account from './components/Account/Account';
import { Card, ToastBody } from 'react-bootstrap';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckOut/Checkout';
import React from 'react';

function App() {
  const[category,setCategory]=useState('Categories')
  const[user,setUser]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[emailError,setEmailError]=useState('')
  const[authError,setAuthError]=useState('')
  const[passwordError,setPasswordError]=useState('')
  const[hasAccount,setHasAccount]=useState(true)
  const[cart,setCart]=useState(JSON.parse(localStorage.getItem('cart')||"[]"))
  const[cartTotal,setCartTotal]=useState(0)
  const[isSignedIn,setIsSignedIn]=useState(false)
  const [show, setShow] = useState(false);
  const history=useHistory()
  const[finalAddress,setFinalAddress]=React.useState({
    fname:"",
    address: "",
    email:"",
    pincode: "",
    city:"",
  })
  const[address,setAddress]=useState('')
  const[city,setCity]=useState('')
  const[pincode,setPincode]=useState('')
 
  const handleRedirect=(path)=>{
    history.push(path)
  }
  const increment=(id)=> {
    cart[id].quantity++;
    console.log(cart)
    setCart([...cart])
    localStorage.setItem('cart',JSON.stringify(cart))

  }
  
  const placeOrder=(path,order)=>{
    fetch('http://localhost:8082/orders/post', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    })
    .then((res) => res.json())
    .catch((err) => localStorage.setItem('err',err.message))
    history.push({pathname:path})
  }  
  
  const decrement=(id)=> {
    if(cart[id].quantity>1){
    cart[id].quantity--
    setCart([...cart])
    }
    localStorage.setItem('cart',JSON.stringify(cart))

  }
  const handleChangeEvent=(event)=>{
    const value=event.target.value
    setFinalAddress({...finalAddress,[event.target.value]:value})
    console.log(finalAddress)
    localStorage.setItem('address',JSON.stringify(finalAddress))

  }
  const handleDropdownSelect=(e)=>{
    setCategory(e)
  }
  const clearInputs=()=>{
    setEmail('')
    setPassword('')
  }

  const clearError=()=>{
    setPasswordError('')
    setEmailError('')
    setAuthError('')
  }



  const addToCart=(item)=>{
    console.log(item)
    item.quantity=1;
    const index=cart.findIndex(i=>i.productCode===item.productCode)
    if(index!==-1){
      cart[index].quantity++;
    }
    else{
      setCart([...cart,item]) 
    }
    console.log(cart)  
    localStorage.setItem('cart',JSON.stringify(cart))
  }

  const removeFromCart=(item)=>{
    let copy=[...cart];
    copy=copy.filter((cartItem) => cartItem.productCode !== item.productCode);
    setCart(copy);
    localStorage.removeItem('cart')
    localStorage.setItem('cart',JSON.stringify(copy))
  }

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price*cart[i].quantity;
    }
    setCartTotal(totalVal);
  };

  const handleLogin=()=>{
    clearError()
    fire
    .auth()
    .signInWithEmailAndPassword(email,password)
    .catch((err)=>{
      switch(err.code){
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setEmailError(err.message)
          break;
        case 'auth/wrong-password':
          setPasswordError(err.message)
          break;  

      }
    })
  }

  const handleSignUp=()=>{
    clearError()
    fire
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .catch((err)=>{
      switch(err.code){
        case 'auth/email-already-in-use':
        case 'auth/inavlid-email':
          setEmailError(err.message)
          break;
        case 'auth/weak-password':
          setPasswordError(err.message)
          break;  

      }
    })
  }

  const handleLogout=()=>{
    fire.auth().signOut()
    localStorage.removeItem('user')
    localStorage.setItem('isSignedIn',false)
  }

  const authListener=()=>{
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        clearInputs();
        
        setUser(user) 
        if(user==null){
          localStorage.setItem('isSignedIn',false)
        }
        else{
          localStorage.setItem('isSignedIn',true)
        }
      }
      else{
        setUser("")
        localStorage.setItem('isSignedIn',false)
      }
    })
  }
  

  useEffect(()=>{
    authListener()
  },[])

  useEffect(() => {
    total();
  }, [cart]);

  if(!user){
    return (
    <div className="App">       
    <Login 
     email={email} 
     setEmail={setEmail} 
     password={password} 
     setPassword={setPassword}
     handleLogin={handleLogin}
     handleSignUp={handleSignUp}
     hasAccount={hasAccount}
     setHasAccount={setHasAccount}
     emailError={emailError}
     passwordError={passwordError}
     />
     </div>
     )
  }
  
  return(
    <div className="App">
       
      <Router>
        <NavBar handleDropdownSelect={handleDropdownSelect} category={category}></NavBar>
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home category={category} 
              setCategory={setCategory} 
              addToCart={addToCart} setCart={setCart} 
              increment={increment}
              decrement={decrement}/>
          </Route>
          <Route path="/account">
            <Account handleLogout={handleLogout} />
          </Route>
          <Route path="/cart">
            <Cart cartItems={cart} 
              setCart={setCart}  
              increment={increment} 
              decrement={decrement}
              removeFromCart={removeFromCart}
              cartTotal={cartTotal}
              ></Cart>
          </Route>
          <Route  path="/checkOut">
            <Checkout 
              cartTotal={cartTotal} 
              cart={cart} 
              city={city}
              address={address}
              setAddress={setAddress}
              setCity={setCity}
              pincode={pincode}
              setPincode={setPincode}
              
              />

            
          </Route>
        </Switch>
        </div>
      </Router>
   </div>
  )
}

export default App;
