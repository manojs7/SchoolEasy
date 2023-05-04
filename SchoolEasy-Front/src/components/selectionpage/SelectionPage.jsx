import React from "react";
import { Link } from "react-router-dom";
import "./selectionpage.css";
// import LoginIcon from "@mui/icons-material";
import { Login } from "@mui/icons-material";
// import backg from "public/assets/backg.jpg";

// const styleForButton = {
//   fontsize: "2.5em",
// };

export default function SelectionPage() {
  return (
    <div
      className="backimg"
      style={{
        height: "100%",
        width: "100%",
        backgroundImage:
          'url("http://www.agrasenvidyamandir.ac.in/images/bg/school.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <div
        style={{
          backgroundColor: "white",
          height: "50%",
          width: "55%",
          marginTop: "200px",
          marginLeft: "350px",
        }}
      > */}
      <div
        className="split left"
        style={{
          backgroundColor: "white",
          height: "50%",
          width: "55%",
          marginTop: "40%",
          marginLeft: "30%",
        }}
      >
        <div className="centered">
          <img src="/assets/login3.png" alt="React Image" />
        </div>
      </div>

      <div className="split right">
        <div className="centered">
          <h1 className="text"> Student Management System </h1>
          <div>
            <Link to="/login" className="link">
              <button className="loginbutton">
                {" "}
                <b> Login </b>
                <Login className="loginicon" sx={{ fontSize: "40px" }} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
