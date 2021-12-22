import Axios from 'axios'; 
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import config from '../config';
const LoginScreen=(props)=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    const handleSubmit=(e)=>{
        e.preventDefault();
        Axios.get(`${config.SERVER_URI}/api/login`).then(response=>{
            console.log(response.data);
            console.log(response.data.find(user => user.emailAddress == email));

        if (response.data.length > 0 && response.data.find(user => user.emailAddress == email)) {
            localStorage.setItem('loginState', JSON.stringify(response.data.find(user => user.emailAddress == email))) 
            props.history.push('/');
            window.location.reload(); 
  
        } else {
            alert("You haven't signed up. Click OK to sign up");
            props.history.push('/register')
        }
        }).catch(err=>{
            console.log(err)
        })

    }
    function validateForm() {
      return email.length > 0 && password.length > 0;
    } 
    
    return (
            <form className="Sign-in-screen" onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={!validateForm()} >Submit</button>
                <p className="forgot-password text-right">
                    Forgot <Link to="/register">password?</Link>
                </p>
            </form>
    )
}
export default LoginScreen