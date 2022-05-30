import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import Login from "./Login";
import Register from "./Register";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Music from "../assets/Music.png";
import Artis from "../assets/Add.png";
import Loguot from "../assets/logout.png";
import Bill from "../assets/bill.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/auth";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const [state, dispatch] = useContext(UserContext);
  const [isLoggin, setIsLogin] = useState(false);
  console.log(isLoggin);

  useEffect(() => {
    if (state.isLogin === true) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (state.user.status === "admin") {
      setIsAdmin(true);
    }
  });

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const [openLogin, setOpen] = useState(false);
  const [openRegister, setRegister] = useState(false);
  let navigate = useNavigate();
  const home = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "transparent" }}>
        <Toolbar>
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "30px", height: "29px" }}
            />
          </Link>
          <Typography
            component="div"
            onClick={home}
            style={{ cursor: "pointer" }}
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              fontSize: "18px",
              alignItems: "center",
              marginLeft: 1,
            }}
          >
            DUMB<span style={{ color: "#EE4622" }}>SOUND</span>
          </Typography>
          {isLoggin ? (
            <div class="dropdown">
              <Avatar
                class="btn  dropdown rounded-circle d-flex justify-content-center align-items-center"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: "#F58033",
                  cursor: "pointer",
                  width: "50px",
                  height: "50px",
                }}
              >
                <AccountCircleIcon style={{ width: "30px", height: "30px" }} />
              </Avatar>
              {isAdmin ? (
                <ul
                  class="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link class="dropdown-item" to="/transaction">
                      <img className="me-2" src={Bill} />
                      Transaction
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/add-music">
                      <img className="me-2" src={Music} />
                      Add Music
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/add-artis">
                      <img className="me-2" src={Artis} />
                      Add Artis
                    </Link>
                  </li>
                  <li>
                    <div
                      style={{ cursor: "pointer" }}
                      class="dropdown-item"
                      onClick={logout}
                    >
                      <img className="me-2" src={Loguot} />
                      Logout
                    </div>
                  </li>
                </ul>
              ) : (
                <ul
                  class="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link class="dropdown-item" to="/pay">
                      <img className="me-2" src={Bill} />
                      Pay
                    </Link>
                  </li>
                  <li>
                    <div
                      style={{ cursor: "pointer" }}
                      class="dropdown-item"
                      onClick={logout}
                    >
                      <img className="me-2" src={Loguot} />
                      Logout
                    </div>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Button
                onClick={() => setOpen(true)}
                variant="contained"
                style={{
                  width: "100px",
                  height: "30px",
                  color: "#fff",
                  backgroundColor: "black",
                  boxSizing: "border-box",
                  border: "1px solid #fff",
                  textTransform: "none",
                  marginRight: "10px",
                  boxShadow: "none",
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => setRegister(true)}
                variant="contained"
                style={{
                  width: "100px",
                  height: "30px",
                  color: "#fff",
                  backgroundColor: "#EE4622",
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Login open={openLogin} onClose={() => setOpen(false)} />
      <Register open={openRegister} onClose={() => setRegister(false)} />
    </Box>
  );
};
export default Navbar;
