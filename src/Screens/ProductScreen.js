import React, { useEffect, useState } from 'react';
import Axios from 'axios'; 
import config from '../config';
import Spinner from "./Spinner"; 

const ProductScreen =(props)=>{
    const [productImg, setProductImg] = useState();
    const [productDesc, setProductDesc] = useState();
    const [items, setItems] = useState([]);
    const [itemsId, setItemsId]= useState([]);
    const [loaded, setLoaded] = useState(false);  

    const [cartItems, setCartItems]=useState(localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): []);
    useEffect(() => {
         
        Axios.get(`${config.SERVER_URI}/api`).then(response=>{
            setLoaded(true);
            console.log(response.data[props.match.params.id-1].desc);
            setItems(response.data);
            setItemsId(response.data[props.match.params.id-1]);
            setProductImg(response.data[props.match.params.id-1].image);
            setProductDesc(response.data[props.match.params.id-1].desc)
            

        }).catch(err=>{
            console.log(err);
        })

        return () => { 
        }
    }, [])

     const handleClick = (product)=>{
         let cartItemsClone = cartItems;
         let existedItem = false; 
         cartItemsClone.forEach(item=>{
             if(item.id === product.id){
                 item.count++;
                 existedItem=true;
             }
         })
        if(existedItem==false){ 
            setCartItems(cartItemsClone.push({...product, count: 1}));
        } 
            localStorage.setItem('cartItems', JSON.stringify(cartItems));  
            props.history.push('/cart'); 
    }
    return ( 
        <div> 
        { !loaded?<div> <Spinner /></div> :  
            <div className="product-details"> 
                <div className="product-image">
                    <img className="all-image" src= {productImg} ></img>

                </div>
                <div className="product-detail">
                    Description: {productDesc}
                        
                </div>
                <div className="product-action">
                    <button onClick={()=>{handleClick(itemsId)}}>Add to cart</button>

            </div>
        </div>}
    </div>
    )
}
export default ProductScreen;