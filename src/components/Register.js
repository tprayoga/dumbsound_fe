import React, { useState } from "react";
import { Alert, Box, Button, Link, Modal, Typography } from "@mui/material";
import { useMutation } from 'react-query';
import { API } from "../config/api" 

import Login from "./Login"

const Register = ({ onClose, open }) => {
    const [openLogin, setOpen] = useState(false)
    const handleClose = ()=>{
        setOpen(true)
    }
    const [form, setForm] = useState({
      fullName:"",
      email:"",
      password:""
    })

    const {fullName, email, password} = form

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      })
    }

    const handleSubmit = useMutation(async(e)=>{
      try{
        e.preventDefault()

        const config = {
          headers : {
            'Content-type': 'application/json',
          }
        }
        const body = JSON.stringify(form)

        const response = await API.post("/register", body, config)
        console.log(response);

        if (response.data.status === "Success") {
          const alert = (
            <Alert>Register Berhasil</Alert>
          )
          setMessage(alert)
          setForm({
            fullName : "",
            email : "",
            password : ""
          })
        }else{
          const alert = (
            <Alert>Register Gagal</Alert>
          )
          setMessage(alert)
        }
      }catch(error){
        const alert = (
          <Alert>
            Gagal
          </Alert>
        )
        setMessage(alert)
        console.log(error);
      }
    })

    const [message, setMessage] = useState(null);
  return (
    <div>
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
          Register
        </Typography>
        {message && message}
        <form onSubmit={(e)=> handleSubmit.mutate(e)} className="card-body mt-3 d-grid" id="modal-modal-description">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
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
            name="password"
            value={password}
            onChange={handleChange}
            id="inputPassword5"
            className="form-control text-light mb-3"
            aria-describedby="passwordHelpBlock"
            placeholder="Password"
            style={{
              width: "350px",
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            className="form-control text-light mb-3"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Full Name"
            style={{
              width: "350px",
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <select className="form-select text-light mb-3" aria-label="Default select example" style={{
              width: "350px",
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}>
            <option className="text-dark" selected>Gender</option>
            <option className="text-dark" value="1">Male</option>
            <option className="text-dark" value="2">Female</option>
          </select>
          <input
            type="text"
            className="form-control text-light mb-3"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Phone"
            style={{
              width: "350px",
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <input
            type="text"
            className="form-control text-light mb-4"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Address"
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
            Register
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
            Already have an account ? Klik{" "}
            <Link
              href="#"
              onClick={handleClose}
              underline="none"
              style={{
                fontWeight: 400,
                fontSize: "18px",
                color: "#fff",
                textTransform: "none",
              }}
            >
              Here
            </Link>
          </Typography>
        </form>
        <Login open={openLogin} onClose={()=> setOpen(false)}/>
      </Box>
    </Modal>
    </div>
  );
};

export default Register;
