import axios from 'axios';

// Get Base URL
const baseURL = "https://oshmi.herokuapp.com/";

// Check If Token Exists
const token = JSON.parse(localStorage.getItem("oshmi-token"))
    
export default axios.create({
  baseURL,
  headers: {'Content-Type' : 'application/json' , 'Authorization': `Bearer ${ token ? token:'' }`}
});
