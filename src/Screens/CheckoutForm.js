import React, { Component,useState } from "react";
// import PaypalButtons from "./PaypalButtons"; 
import Spinner from "./Spinner"; 

class CheckoutForm extends Component {
   state = {
    showPaypal: false,
    cartItems: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    loaded: false
  }; 
  
  showPaypalButtons = () => {
    console.log(JSON.parse(localStorage.getItem('cartItems'))) 
    this.setState({ showPaypal: true });
  };
   render() {
      return (
        <div>
          {(this.state.loaded)?<div> <Spinner /></div> :
            <div className="main1">
              <div className="main-1-border">
              <h5><b>Confirm Purchase</b></h5>
                  {this.state.cartItems.map(item=>{
                  return <div>
                              <h5>
                              <img className="all-image" src={item.image} alt={item.image}/>
                                  
                                  <b>${item.price}</b>
                                  {' '}
                                  Qty: <b>{item.count}</b>
                              </h5>
                          </div>
                  })} 
              </div>
              <div className="main2">
                  <h5><b> Total <span style={{ color: 'black' }} > ${this.state.cartItems.reduce((a,c)=> a + c.count * c.price, 0)}</span>
                  </b> <b style={{color: 'red'}}></b></h5>
                  <button type="submit" className="btn btn-primary btn-xl" onClick={this.showPaypalButtons}> Click here to pay </button>
              </div>
          </div>}
        </div>
      );
    }
  }

export default CheckoutForm;
