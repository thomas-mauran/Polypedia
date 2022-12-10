import decode from "jwt-decode";
import axios from "axios";



const baseUrl = process.env.VUE_APP_API_URL;

export async function login(email, password) {
  const url = `${baseUrl}/user/login`;

  if (email === "" || password === "") {
    return [false, "You need to fill in all the gaps"];
  } else {
    try {
      let res = await axios({
        url: url,
        method: "POST",

        // headers: { "Content-Type": "application/json; charset=UTF-8" },
        data: {
          email: email,
          password: password,
        },
      });

      if (res.status === 200) {
        setAuthToken(res.data.token)
        setUserId(res.data.id)
        return [true];
      }
    } catch (error) {
      return [false, error.response.data.error];
    }
  }
}

export function setAuthToken(token){
    axios.defaults.headers.common['Authorization'] = `x-acces-token: ${token}`
    localStorage.setItem('AUTH_TOKEN_KEY', token)
}

function setUserId(id){
  localStorage.setItem('USER_ID', id)
}

export function isLoggedIn(){
    let authToken = localStorage.getItem('AUTH_TOKEN_KEY')
    return authToken && !isTokenExpired(authToken)

}

function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}

function getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken)
    if (!token.exp) {
        return null
    }
  
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
  
    return date
}

