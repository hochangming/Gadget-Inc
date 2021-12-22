import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Axios from 'axios'; 
import config from '../config';
import Cookie from 'js-cookie'
import Spinner from "./Spinner"; 

 
const HomeScreen =(props)=>{
  const [value, setValue] = useState("");
  const category = props.match.params.id ? props.match.params.id : '';
  
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false);  
  
  useEffect(() => {
    
    Axios.get(`${config.SERVER_URI}/api`).then(response=>{
      console.log(response.data);
      setItems(response.data);
      localStorage.setItem('dataproducts',JSON.stringify(response.data)); 
      setLoaded(true);
      if(localStorage.getItem('checkOutSignin')){  
          props.history.push('/cart');  
          localStorage.removeItem('checkOutSignin') 
      } 
    }).catch(err=>{
      console.log(err)
    })
    return () => {
       
    }
  }, [])
  const sortArray = type => { 
    if(type==='Highest'){
      const sorted = [...items].sort((a, b) =>parseInt(b.price)- parseInt(a.price))  
      setItems(sorted); 
    } else{
      const sorted = [...items].sort((a, b) =>parseInt(a.price)- parseInt(b.price))   
      setItems(sorted);
    } 
    
  };  
  console.log(items)
    return ( 
      <div> 
      { !loaded?<div> <Spinner /></div> :
        <section className="products">  
          <div className="md-form active-cyan active-cyan-2 mb-3 "> 
                <input class="form-control" aria-label="Search"
                type="text"
                placeholder="Search..."
                value={value}
                onChange={e => setValue(e.target.value.toLowerCase())}
            />
            <select className=" btn btn-sm btn-light dropdown-toggle dropdown-toggle-split" onChange={(e) => sortArray(e.target.value)}>  
              <option value="Lowest">Lowest</option>
              <option value="Highest">Highest</option>
            </select> 
          </div>
 
         {  
          category?
          items.filter(item =>
          { 
                  if(category){
                    if(item.category === props.match.params.id) 
                    {   console.log(typeof(props.match.params.id)) 
                        console.log(typeof( typeof(item.id)))
                      return true;  
                    }
                  } 
                  return false;
              }
              ).map(item=>{
                  return  <div class="product-card">  
                  <div class="product-image">
                    <Link to = {'/' + item.id}   > 
                      <img src= {item.image}></img> 
                      <h5>{item.title}</h5> 
                    </Link>
                  <div class="product-info"> 
                      <h6>${item.price}</h6>
                    </div>
                  </div> 
                  </div>  
              }) : items.filter(item =>
                    { 
                        if(category){
                          if(item.category === props.match.params.id) 
                          {   console.log(typeof(props.match.params.id)) 
                              console.log(typeof( typeof(item.id)))
                            return true;  
                          }
                        }
                        
                        if (!value) return true; 
                        if (item.title.toLowerCase().includes(value)|| item.title.toLowerCase().includes(value)) { 
                          return true;
                        }
                        return false;
                    }
                    ).map(item=>{
                        return  <div class="product-card">  
                        <div class="product-image">
                          <Link to = {'/' + item.id}   > 
                            <img src= {item.image}></img> 
                            <h5>{item.title}</h5> 
                          </Link>
                        <div class="product-info"> 
                            <h6>${item.price}</h6>
                          </div>
                        </div> 
                        </div>  
                    })
              
        }      
      </section>}
  </div>

    )
}

export default HomeScreen;