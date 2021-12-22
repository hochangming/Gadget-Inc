// import React from "react";
// import ReactDOM from "react-dom";
// import scriptLoader from "react-async-script-loader"; 
// import Spinner from "./Spinner"; 
// import dotenv from "dotenv"; 
// dotenv.config();
// const CLIENT = {
//   sandbox: process.env.REACT_APP_PAYPAL_API_KEY,
//   production: process.env.REACT_APP_PAYPAL_API_KEY
// }; 
// const CLIENT_ID =
//    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

// let PayPalButton = null;

// class PaypalButton extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       showButtons: false,
//       loading: true,
//       paid: false,
//       cartItems: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
//     };

//     window.React = React;
//     window.ReactDOM = ReactDOM;
//   }

//   componentDidMount() {
//     const { isScriptLoaded, isScriptLoadSucceed } = this.props;

//     if (isScriptLoaded && isScriptLoadSucceed) {
//       PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
//       this.setState({ loading: false, showButtons: true });
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

//     const scriptJustLoaded =
//       !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

//     if (scriptJustLoaded) {
//       if (isScriptLoadSucceed) {
//         PayPalButton = window.paypal.Buttons.driver("react", {
//           React,
//           ReactDOM
//         });
//         this.setState({ loading: false, showButtons: true });
//       }
//     }
//   }
//   createOrder = (data, actions) => {
//     console.log(data);
//     return actions.order.create({
//       purchase_units: [
//         {
//           description: +"Mercedes G-Wagon",
//           amount: {
//             currency_code: "USD",
//             value: data
//           }
//         }
//       ]
//     });
//   };

//   onApprove = (data, actions) => {
//     actions.order.capture().then(details => {
//       const paymentData = {
//         payerID: data.payerID,
//         orderID: data.orderID
//       };
//       console.log("Payment Approved: ", paymentData);
//       this.setState({ showButtons: false, paid: true });
//     });
//   };

//   render() {
//     const { showButtons, loading, paid } = this.state;

//     return (
//       <div className="main-container">
//         {loading && <Spinner />}

//         {showButtons && (
//           <div>
//             <div> 
//               <h3><b> Total <span   style={{ color: 'black' }} > ${this.state.cartItems.reduce((a,c)=> a + c.count * c.price, 0)}</span></b></h3>
//             </div>

//             <PayPalButton
//               createOrder={(data, actions) => this.createOrder(this.state.cartItems.reduce((a,c)=> a + c.count * c.price, 0), actions)}
//               onApprove={(data, actions) => this.onApprove(data, actions)}
//             />
//           </div>
//         )}

//         {paid && (
//           <div className="main"> 
//             <h2>
//               Order confirmed. Item will be shipped to you in a couple of days.{" "}
//               <span role="img" aria-label="emoji">
//                 {" "}
//                 😉
//               </span>
//             </h2>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);


// // import React, { Component, useState } from 'react'
// // import { connect } from 'react-redux'
// // import { Link } from 'react-router-dom'

// // const ShippingScreen=(props)=>{
// //     const [cartItem, setCartItem] = useState(localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [])
// //       return (
// //          <div className="row">
// //   <div class="col-75">
// //     <div class="container">
// //       <form action="/action_page.php">

// //         <div class="row">
// //           <div class="col-50">
// //             <h3>Billing Address</h3>
// //             <label for="fname"><i class="fa fa-user"></i> Full Name</label>
// //             <input type="text" id="fname" name="firstname" placeholder="John M. Doe"></input>
// //             <label for="email"><i class="fa fa-envelope"></i> Email</label>
// //             <input type="text" id="email" name="email" placeholder="john@example.com"></input>
// //             <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
// //             <input type="text" id="adr" name="address" placeholder="542 W. 15th Street"></input>
// //             <label for="city"><i class="fa fa-institution"></i> City</label>
// //             <input type="text" id="city" name="city" placeholder="New York"></input>

// //             <div class="row">
// //               <div class="col-50">
// //                 <label for="state">State</label>
// //                 <input type="text" id="state" name="state" placeholder="NY"></input>
// //               </div>
// //               <div class="col-50">
// //                 <label for="zip">Zip</label>
// //                 <input type="text" id="zip" name="zip" placeholder="10001"></input>
// //               </div>
// //             </div>
// //           </div>

// //           <div class="col-50">
// //             <h3>Payment</h3>
// //             <label for="fname">Accepted Cards</label>
// //             <div class="icon-container">
// //               <i class="fa fa-cc-visa"  ></i>
// //               <i class="fa fa-cc-amex" ></i>
// //               <i class="fa fa-cc-mastercard" ></i>
// //               <i class="fa fa-cc-discover"  ></i>
// //             </div>
// //             <label for="cname">Name on Card</label>
// //             <input type="text" id="cname" name="cardname" placeholder="John More Doe"></input>
// //             <label for="ccnum">Credit card number</label>
// //             <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"></input>
// //             <label for="expmonth">Exp Month</label>
// //             <input type="text" id="expmonth" name="expmonth" placeholder="September"></input>

// //             <div class="row">
// //               <div class="col-50">
// //                 <label for="expyear">Exp Year</label>
// //                 <input type="text" id="expyear" name="expyear" placeholder="2018"></input>
// //               </div>
// //               <div class="col-50">
// //                 <label for="cvv">CVV</label>
// //                 <input type="text" id="cvv" name="cvv" placeholder="352"></input>
// //               </div>
// //             </div>
// //           </div>

// //         </div>
// //         <label>
// //           <input type="checkbox" checked="checked" name="sameadr"></input> Shipping address same as billing
// //         </label>
// //         <input type="submit" value="Confirm Purchase" class="btnn"></input>
// //       </form>
// //     </div>
// //   </div>

// //   <div class="col-25">
// //     <div class="container1">
// //       <h4>Cart
// //         <span class="price" style={{ color: 'black' }} >
// //           <i class="fa fa-shopping-cart"></i>
// //           <b>4</b>
// //         </span>
// //       </h4>
// //       {cartItem.map(item=>{
// //          return <p><Link to= { '/'+item.id} style={{ color: 'black' }}> {item.title}</Link> <span class="price">{item.price}</span></p>
// //       })}
      
// //     <p>Total <span class="price" style={{ color: 'black' }} ><b>{cartItem.reduce((a,c)=> a + c.count * c.price, 0)}</b></span></p>
 
// //     </div>
// //   </div>
// // </div> 
// //     )
// // }

// // export default ShippingScreen;
 