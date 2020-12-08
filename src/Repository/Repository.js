import axios from 'axios';

// Get Base URL
const baseURL = "http://localhost:3000/";

// Check If Token Exists
const isTokenExists = JSON.parse(localStorage.getItem("oshmiToken"))
let token = null
if(isTokenExists) {
  token = isTokenExists.token
}
    
export default axios.create({
  baseURL,
  // headers: { 'Content-Type' : 'multipart/form-data', 'Accept': '*/*', 'Authorization': `Bearer ${ token ? token:'' }`}
});
