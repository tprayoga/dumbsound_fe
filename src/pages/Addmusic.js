import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Attc from "../assets/interface.png"
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "@mui/material";

const Addmusic = () => {
  const [artis, setArtis] = useState([])
  const [form, setForm] = useState({
    title:"",
    year:"",
    thumbnail:"",
    attache:"",
    idArtis:""
  })

  const {title, year,thumbnail,attache, idArtis} = form
  const artist = async () => {
    const response = await API.get("/artiss")
    console.log(response.data.data.artiss);
    setArtis(response.data.data.artiss)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.id === "attache" ? e.target.files : e.target.value && e.target.id === "thumbnail"? e.target.files:e.target.value
    })
  }

  const handleSubmit = useMutation(async(e)=>{
    
    try{
      e.preventDefault();
      const config = {
        headers : {
          'Content-type': 'multipart/form-data',
        }
      }
      console.log(form);
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("year", form.year);
      formData.set("attache", form.attache[0], form.attache[0].name);
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("idArtis", form.idArtis);

      const response = await API.post("/music", formData, config)
      console.log(response);
      setForm({
        title: "",
        year: "",
        thumbnail: "",
        attache: "",
        idArtis: "",
      });



      if (response.data.status === "success") {
        const alert = (
          <Alert>Add Music Berhasil</Alert>
        )
        setMessage(alert)
      }else{
        const alert = (
          <Alert>Gagal Add Music</Alert>
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

  useEffect(() => {
    artist();
  }, []);

  const [message, setMessage] = useState(null);
  return (
    <div style={{ backgroundColor: "#161616", height: "100vh" }}>
      <div>
        <Navbar />
      </div>
      <div className="container">
      {message && message}

        <form className="mt-5 d-grid" onSubmit={(e) => handleSubmit.mutate(e)}>
        <h1 className="mb-4" style={{
            color: "white",
            fontWeight: "700",
            fontSize: "24px"}}>Add Music</h1>
          <div className="d-flex">
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="form-control text-light mb-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Title"
              style={{
                backgroundColor: " rgba(210, 210, 210, 0.25)",
                marginRight:"15px"
              }}
            ></input>
            <label className="d-flex justify-content-around"
              style={{
                backgroundColor: " rgba(210, 210, 210, 0.25)",
                height:"38px",
                padding:0,
                border: "1px solid #D2D2D2",
                borderRadius:"5px",
                width:"215px"
              }}
              for="thumbnail"
            ><div className="mt-1 text-light">Thumbnail.jpg</div><img src={Attc} alt="atc" className="mt-1" style={{height:"28px", objectFit:"cover"}}/></label>
            <input id="thumbnail" name="thumbnail" onChange={handleChange} type="file"  hidden />
          </div>
          <input
            type="text"
            name="year"
            onChange={handleChange}
            id="inputPassword5"
            className="form-control text-light mb-3"
            aria-describedby="passwordHelpBlock"
            placeholder="Year"
            style={{
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          ></input>
          <select onChange={handleChange} name="idArtis"
            className="form-select text-light mb-3"
            aria-label="Default select example"
            style={{
              backgroundColor: " rgba(210, 210, 210, 0.25)",
            }}
          >
  
            {artis.map((item)=>(
              <option className="text-dark" key={item.id} name="type" value={item.id}>{item.name}</option>
            ))}
          </select>
          <label className="d-flex justify-content-around"
              style={{
                backgroundColor: " rgba(210, 210, 210, 0.25)",
                height:"38px",
                padding:0,
                border: "1px solid #D2D2D2",
                borderRadius:"5px",
                width:"113px"
              }}
              for="attache"
            ><div className="mt-1 text-light">Attache.mp3</div></label>
            <input id="attache" name="attache" onChange={handleChange} type="file" hidden />
          <div className="text-center">
            <button
              className="btn btn-danger mt-3"
              type="submit"
              style={{ backgroundColor: "#F58033",width:"250px" }}
            >
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addmusic;
