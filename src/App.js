import React, { useContext, useEffect } from "react";
import Routers from "./route/Routers";
import {setAuthToken, API} from "./config/api"
import {UserContext, userContext} from "./context/userContext"
import { useNavigate } from "react-router-dom";
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  useEffect(()=>{
    if (state.isLogin === false) {
    navigate("/")  
    } else {
      if (state.user.status === "admin") {
        navigate("/transaction")
      } else if (state.user.status === "customers") {
        navigate("/")
      }
    }
  },[state])

  const checkUser = async () => {
    try{
      const response = await API.get("/check-auth")
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR"
        })
      }

      let payload = response.data.data.user
      payload.token = localStorage.token

      dispatch({
        type: "USER_SUCCESS",
        payload,
      })
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    checkUser()
  },[])

  return (
    <div> 
      <Routers/>
    </div>
  );
}

export default App;
