import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
// import { InputAdornment } from "@mui/material";
// import { MarkEmailRead } from "@mui/icons-material";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
// import { InputAdornment, IconButton, SearchIcon } from "@mui/icons-material";

console.log(localStorage.getItem("role"));
const Login = ({ setLoginUser }) => {
  const history = useHistory();
  // const handleClick = () => {
  //   history.push("./register");
  // };

  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    //   console.log(user);
    //   // setFormValues({ ...formValues, [name]: value });
    //   // console.log(formValues);
  };

  const login = () => {
    console.log("Login");
    axios.post("http://localhost:8080/login", user).then((res) => {
      console.log(res.data);
      if (res.data.message === "login success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.data.role);
        localStorage.setItem("id", res.data.data.id);
        console.log(
          localStorage.getItem("token"),
          localStorage.getItem("role")
        );
        window.location = "/Sidebar";
      }

      // setLoginUser(res.data.user);
      history.push("/login");
    });
  };

  const initialValues = { email: "", password: "" };
  const [user, setUser] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // const handleChange = (e) => {
  //   // console.log(e.target);
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  //   console.log(formValues);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
    }
  });

  const validate = (user) => {
    const errors = {};
    const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
    const validEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    if (!user.email) {
      errors.email = "email is required!";
    } else if (!validEmail.test(user.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!user.password) {
      errors.password = "password is required!";
    } else if (user.password.length < 4) {
      errors.password = "password must be more than 4 characters";
    } else if (user.password.length > 20) {
      errors.password = "password cannot more than 20 characters";
    } else if (!validPassword.test(user.password)) {
      errors.password = "This is not a valid password format!";
    } else {
      errors.password = "";
    }
    return errors;
  };

  return (
    <div>
      {/* <form action="" className="loginbox" onSubmit={handleSubmit}>
        <div className="login">
          <h1 className="loginheading"> Login</h1>
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="Enter your Email"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MarkEmailRead
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                </InputAdornment>
              ),
            }}
          ></input>
          <div className="errormessage">{formErrors.email}</div>

          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Enter your Password"
            onChange={handleChange}
          ></input>
          <div className="errormessage">{formErrors.email}</div>

          <Link to="/email-send" style={{ textDecoration: "none" }}>
            <p className="forgot-password">
              <b>Forgot Password ?</b>
            </p>
          </Link>

          <div className="button" onClick={login}>
            Login
          </div>

          <div style={{ color: "black" }}>or</div>
          <div className="button" onClick={handleClick}>
            Register
          </div>
        </div>
      </form> */}
      <form action="" onSubmit={handleSubmit}>
        <div className="p-4 background-radial-gradient overflow-hidden">
          <MDBContainer
            fluid
            className="p-4 background-radial-gradient overflow-hidden"
          >
            <MDBRow>
              <MDBCol
                md="6"
                className="text-center text-md-start d-flex flex-column justify-content-center"
              >
                <h1
                  className="my-5 display-3 fw-bold ls-tight px-3"
                  style={{ color: "hsl(218, 81%, 95%)" }}
                >
                  The best offer <br />
                  <span style={{ color: "hsl(218, 81%, 75%)" }}>
                    for your business
                  </span>
                </h1>

                <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </MDBCol>

              <MDBCol md="5" className="position-relative">
                <div
                  id="radius-shape-1"
                  className="position-absolute rounded-circle shadow-5-strong"
                ></div>
                <div
                  id="radius-shape-2"
                  className="position-absolute shadow-5-strong"
                ></div>

                <MDBCard className="my-5 bg-glass cardhover">
                  <MDBCardBody className="p-5">
                    <h2 className="fw-bold mb-2 text-uppercase loginheading">
                      Login
                    </h2>
                    <p className="text-black-50 mb-5 text-center">
                      Please enter your login and password!
                    </p>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email"
                      id="form3"
                      type="email"
                      name="email"
                      value={user.email}
                      placeholder="Enter your Email"
                      onChange={handleChange}
                    />
                    <div className="errormessage">{formErrors.email}</div>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Password"
                      id="form4"
                      type="password"
                      name="password"
                      value={user.password}
                      placeholder="Enter your Password"
                      onChange={handleChange}
                    />
                    <div className="errormessage">{formErrors.password}</div>

                    <div className="d-flex justify-content-between mx-4 mb-4">
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id="flexCheckDefault"
                        label="Check me out"
                      />
                      <Link to="/email-send" style={{ textDecoration: "none" }}>
                        <p className="forgot-password">
                          <b>Forgot Password ?</b>
                        </p>
                      </Link>
                    </div>

                    <MDBBtn className="w-100 mb-4" size="md" onClick={login}>
                      Login
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </form>
    </div>
  );
};
export default Login;

// import React from "react";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBCheckbox,
//   MDBIcon,
// } from "mdb-react-ui-kit";
// import "./login.css";

// function App() {
//   return (
//     <div className="p-4 background-radial-gradient overflow-hidden">
//       <MDBContainer
//         fluid
//         className="p-4 background-radial-gradient overflow-hidden"
//       >
//         <MDBRow>
//           <MDBCol
//             md="6"
//             className="text-center text-md-start d-flex flex-column justify-content-center"
//           >
//             <h1
//               className="my-5 display-3 fw-bold ls-tight px-3"
//               style={{ color: "hsl(218, 81%, 95%)" }}
//             >
//               The best offer <br />
//               <span style={{ color: "hsl(218, 81%, 75%)" }}>
//                 for your business
//               </span>
//             </h1>

//             <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
//               itaque accusantium odio, soluta, corrupti aliquam quibusdam
//               tempora at cupiditate quis eum maiores libero veritatis? Dicta
//               facilis sint aliquid ipsum atque?
//             </p>
//           </MDBCol>

//           <MDBCol md="6" className="position-relative">
//             <div
//               id="radius-shape-1"
//               className="position-absolute rounded-circle shadow-5-strong"
//             ></div>
//             <div
//               id="radius-shape-2"
//               className="position-absolute shadow-5-strong"
//             ></div>

//             <MDBCard className="my-5 bg-glass">
//               <MDBCardBody className="p-5">
//                 <MDBRow>
//                   <MDBCol col="6">
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="First name"
//                       id="form1"
//                       type="text"
//                     />
//                   </MDBCol>

//                   <MDBCol col="6">
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="Last name"
//                       id="form2"
//                       type="text"
//                     />
//                   </MDBCol>
//                 </MDBRow>

//                 <MDBInput
//                   wrapperClass="mb-4"
//                   label="Email"
//                   id="form3"
//                   type="email"
//                 />
//                 <MDBInput
//                   wrapperClass="mb-4"
//                   label="Password"
//                   id="form4"
//                   type="password"
//                 />

//                 <div className="d-flex justify-content-center mb-4">
//                   <MDBCheckbox
//                     name="flexCheck"
//                     value=""
//                     id="flexCheckDefault"
//                     label="Subscribe to our newsletter"
//                   />
//                 </div>

//                 <MDBBtn className="w-100 mb-4" size="md">
//                   sign up
//                 </MDBBtn>

//                 <div className="text-center">
//                   <p>or sign up with:</p>

//                   <MDBBtn
//                     tag="a"
//                     color="none"
//                     className="mx-3"
//                     style={{ color: "#1266f1" }}
//                   >
//                     <MDBIcon fab icon="facebook-f" size="sm" />
//                   </MDBBtn>

//                   <MDBBtn
//                     tag="a"
//                     color="none"
//                     className="mx-3"
//                     style={{ color: "#1266f1" }}
//                   >
//                     <MDBIcon fab icon="twitter" size="sm" />
//                   </MDBBtn>

//                   <MDBBtn
//                     tag="a"
//                     color="none"
//                     className="mx-3"
//                     style={{ color: "#1266f1" }}
//                   >
//                     <MDBIcon fab icon="google" size="sm" />
//                   </MDBBtn>

//                   <MDBBtn
//                     tag="a"
//                     color="none"
//                     className="mx-3"
//                     style={{ color: "#1266f1" }}
//                   >
//                     <MDBIcon fab icon="github" size="sm" />
//                   </MDBBtn>
//                 </div>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </div>
//   );
// }

// export default App;
