import React from 'react'
import './Login.css'
const Login=(props)=>{
    const{
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError}=props

    return(
        <section id="login">
            <a className="navbar-brand" href="#" id="login-company-name">K A I S</a>
            <div id="loginContainer">
                <label>User Email</label>
                <input 
                    type="text" 
                    autoFocus required value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>
                <p id="errorMsg"> {emailError}</p>
                <label>Password</label>
                <input 
                    type="password" 
                    required value={password} 
                    onChange={(e)=>setPassword(e.target.value)}/>
                <p id="errorMsg"> {passwordError}</p>
                <div id="btnContainer">
                    {hasAccount?(
                        <>
                        <button className="btn btn primary" onClick={handleLogin}>Sign in</button>
                        <p>Dont Have an Account? 
                            <span onClick={()=>{setHasAccount(!hasAccount)}}>
                                Sign Up
                            </span>
                        </p>
                        </>
                            ):(
                                <>
                                
                                <button className="btn btn primary" onClick={handleSignUp}>Sign Up</button>
                                <p>Have An Account ? 
                                    <span onClick={()=>{setHasAccount(!hasAccount)}}>
                                        Sign In
                                    </span>
                                </p>
                                </>
                            )}
                </div>
            </div>    
        </section>
    )
}
export default Login