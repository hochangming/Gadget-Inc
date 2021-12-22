import Axios from "axios";
import config from "./config";
import Cookie from 'js-cookie'
// Axios.get(`${config.SERVER_URI}/api`).then(response=>{
//   console.log(response.data); 
//   localStorage.setItem('dataproducts',JSON.stringify(response.data));
//   console.log(JSON.parse(localStorage.getItem('dataproducts')));
// }).catch(err=>{
//   console.log(err);
// })
 
const initState = {
  // items: JSON.parse(localStorage.getItem('dataproducts')), 
  items: Cookie.getJSON('dataproducts'),
  addedItems:[],
  total: 0

}
  export default initState;