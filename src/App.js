import React, { useEffect, useState } from 'react'; 
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import UserScreen from './Screens/UserScreen'; 
import {FaShoppingCart, FaHome} from "react-icons/fa"
import CheckoutForm from './Screens/CheckoutForm';

 const open = () => {
  document.querySelector(".sidebarcon").classList.add("openSidebar");
}
const close = () =>{
  document.querySelector(".sidebarcon").classList.remove("openSidebar");
}
 
function App() {
  const [state, setstate] = useState(localStorage.getItem('loginState') ? JSON.parse(localStorage.getItem('loginState')).emailAddress : ''); 
  useEffect(() => {
    // setstate(localStorage.getItem('loginState') ? JSON.parse(localStorage.getItem('loginState')).emailAddress : '')
     return () => { 
    }
  }, [])

   return (
    <BrowserRouter>
      <div class="wrapper">
          <header>
            <div> 
            <button className="sidebarbtn" onClick={open}>
              &#9776;</button>
            <Link className = "homebutton"to="/">Home<FaHome/></Link> 
            </div>
          <h1>Gadget Inc</h1>
          <div> 
          {localStorage.getItem('loginState') ? 
          (<Link to="/user" >{state}</Link>): 
          <Link to="/login">Log In</Link>
          }
          
          <Link to="/cart">Cart<FaShoppingCart/></Link> 
          </div>
           </header>
          <aside className="sidebarcon">
            <h3 className = "header3">Shop By Category</h3>
            <ul className="sidebarcon-menu">
              <button className="button-close"
                onClick={close}>Close &times;</button>
              <li><Link to="/category/Mobile Phones"  onClick={() =>localStorage.setItem('Category', JSON.stringify('Mobile Phones'))}>Mobile Phones</Link></li>
              <li><Link to="/category/Tablets" onClick={() =>localStorage.setItem('Category', JSON.stringify('Tablets'))}>Tablets</Link></li>
            </ul>
          </aside>
          <main>
          <Switch> 
          <Route path="/checkout" component={CheckoutForm}></Route>
          <Route path ="/user" component={UserScreen}></Route>  
          <Route path ="/register" component={RegisterScreen}></Route> 
          <Route path ="/login" component={LoginScreen}></Route>
          <Route path ="/cart" component={CartScreen}></Route>   
          <Route exact path ="/:id" component={ProductScreen}></Route> 
          <Route exact path ="/category/:id" component={HomeScreen}></Route> 
          <Route exact path ="/" component={HomeScreen}></Route>
          </Switch>
          </main>
          
          <footer> &copy;GadgetInc2020
          </footer>
      </div>
</BrowserRouter>
  );
}

export default App;
