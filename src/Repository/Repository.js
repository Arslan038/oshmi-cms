import axios from 'axios';

// Get Base URL
const baseURL = "https://oshmi.herokuapp.com/";

// Check If Token Exists
const isTokenExists = JSON.parse(localStorage.getItem("oshmiToken"))
let token = null
if(isTokenExists) {
  token = isTokenExists.token
}
    
export default axios.create({
  baseURL,
  headers: {'Content-Type' : 'application/json' , 'Authorization': `Bearer ${ token ? token:'' }`}
});
