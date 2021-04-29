import axios from 'axios';
import config from '../../config.js'

const baseURL = "https://oshmi.herokuapp.com/";
// const baseURL = "http://127.0.0.1:3000/";

// Check If Token Exists
let token = config.getToken();


export default axios.create({
  baseURL,
  headers: { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${ token ? token:'' }`}
});
