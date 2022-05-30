import { Alert, Box, Button, Link, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../context/userContext"
import { API } from "../config/api";
import { useMutation } from "react-query";

const Login = ({ open, onClose }) => {
  let navigate = useNavigate()
  const [openRegister, setOpen] = useState(false);
  const [state, dispatch] = useContext(UserContext)
  const [message, setMessage] = useState(null)
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const {email, password} = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  } 

  const handleSubmit = useMutation(async(e)=>{
    try{
      e.preventDefault()
      const config = {
        headers:{
          "Content-type": "application/json",
        },
      }
      const body = JSON.stringify(form)
      const response = await API.post("/login", body, config)
      console.log(response);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data
        })
      }
      if (response.data.data.status === "admin") {
        navigate("/transaction")
      }else{
        navigate("/pay")
      }
    }catch(error){
      const alert =(
        <Alert>Gagal</Alert>
      )
      setMessage(alert)
      console.log(error);
    }
  })
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          backgroundColor: "#161616",
          maxWidth: "416px",
          maxHeight: "408px",
          borderRadius: "10px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          className="mt-4"
          sx={{
            color: "white",
            width: "95px",
            height: "49px",
            fontWeight: "700",
            fontSize: "36px",
            marginLeft: 2,
          }}
        >
          Login
        </Typography>
        {message && message}
        <form onSubmit={(e)=> handleSubmit.mutate(e)} className="card-body mt-3 d-grid" id="modal-modal-description">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            className="form-control text-light mb-3"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            style={{
              width: "350px",
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <input
            type="password"
            id="inputPassword5"
            name="password"
            onChange={handleChange}
            value={password}
            className="form-control text-light mb-4"
            aria-describedby="passwordHelpBlock"
            placeholder="Password"
            style={{
              width: "350px",
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <button
            className="btn btn-danger "
            type="submit"
            style={{ backgroundColor: "#EE4622" }}
          >
            Login
          </button>
          <Typography
            className="mt-3 mb-3"
            style={{
              fontWeight: 400,
              fontSize: "18px",
              color: "#B1B1B1",
              textAlign: "center",
            }}
          >
            Don't have an account ? Klik 
            <Link
              href="#"
              onClick={() => setOpen(true) && onClose(onClose)}
              underline="none"
              style={{
                fontWeight: 400,
                fontSize: "18px",
                color: "#fff",
                textTransform: "none",
              }}
            > Here
            </Link>
          </Typography>
        </form>
        <Register open={openRegister} onClose={()=> setOpen(false)}/>
      </Box>
    </Modal>
  );
};

export default Login;
