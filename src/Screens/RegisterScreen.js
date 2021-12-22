import Axios from 'axios'; 
import React, { useEffect, useState } from 'react'
import config from '../config';
import {Link} from 'react-router-dom'
const RegisterScreen=(props)=>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleClick =(e)=>{
        e.preventDefault();
        Axios.post(`${config.SERVER_URI}/api/register`,{
            firstname: firstName,
            lastName: lastName,
            password: password,
            email: email 
        }).then(response=>{
            console.log(response.data)
        }).catch(err=>{
            console.log(err);
        })

        props.history.push('/login')
    }
   function validateForm() {
      return email.length > 0 && password.length > 0 &&lastName.length > 0 && firstName.length > 0;
    } 
    return (
        <form className="register-screen">
        <h3>Sign Up</h3>

        <div className="form-group">
            <label>First name</label>
            <input type="text" className="form-control" placeholder="First name" onChange={(e)=>setFirstName(e.target.value)}/>
        </div>

        <div className="form-group">
            <label>Last name</label>
            <input type="text" className="form-control" placeholder="Last name" onChange={(e)=>setLastName(e.target.value)}/>
        </div>

        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>

        <button onClick={(e)=>handleClick(e)} type="submit" className="btn btn-primary btn-block" disabled={!validateForm()}>Sign Up</button>
        <p className="forgot-password text-right">
            Already registered? <Link to="/login">Sign In</Link>
        </p>
    </form>

    )
}
export default RegisterScreen;