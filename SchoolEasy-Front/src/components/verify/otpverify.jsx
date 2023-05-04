import React, { useState, useEffect } from "react";
import "./otpverify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

export default function OTPVerifyPage() {
  const items = { ...localStorage };
  const email = items.email_reset;
  console.log(email);
  const [inputField, setInputField] = useState({
    otp: "",
    password: "",
    cpassword: "",
  });

  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const SubmitButton = async () => {
    let url = "http://localhost:8080/change-password";
    let options = {
      method: "POST",
      url: url,
      headers: {},
      data: { email, inputField },
    };
    try {
      let response = await axios(options);
      console.log(response);
      if (response.data.statusText === "success") {
        console.log("login successfully");
        localStorage.setItem("token", response.data.token);
        window.location.href = "/login";
      } else {
        console.log(response.data.message);
      }
    } catch (e) {
      console.error("something went wrong !");
    }
  };

  const initialValues = { otp: "", password: "", cpassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      formErrors.otp === "" &&
      formErrors.password === "" &&
      formErrors.cpassword === ""
    ) {
      setIsSubmit(true);
      SubmitButton();
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  });

  const validate = (values) => {
    const errors = {};
    const validPassword = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,16}$"
    );
    if (!values.otp) {
      errors.otp = "otp is required";
    } else if (values.otp.length < 4) {
      errors.otp = "otp should be 4 characters";
    } else {
      errors.otp = "";
    }

    if (!values.password) {
      errors.password = "password is required!";
    } else if (values.password.length < 4) {
      errors.password = "password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "password cannot more than 10 characters";
    } else if (!validPassword.test(values.password)) {
      errors.password = "This is not a valid password format!";
    } else {
      errors.password = "";
    }

    if (!values.cpassword) {
      errors.cpassword = "confirm password is required";
    } else if (values.password !== values.cpassword) {
      errors.cpassword = "confirm password does not match";
    } else {
      errors.cpassword = "";
    }
    return errors;
  };

  // const [OTP, setOtp] = useState("");
  // const [email, setEmail] = useState("");
  // const handleChange = (e) => {
  //   setOtp(1347);
  // };

  // const otpverify = async () => {
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: "http://localhost:8080/change-password",
  //       data: {
  //         otp: OTP,
  //         email: email,
  //       },
  //     });
  //   } catch (error) {
  //     console.log("otp is not verify", error);
  //   }
  // };

  return (
    <div>
      <form className="otp" style={{ padding: "38px" }}>
        <h3 className="otpheading"> Set New Password</h3>

        <MDBInput
          wrapperClass="mb-4"
          className="input"
          label="OTP"
          id="form3"
          type="text"
          name="otp"
          value={formValues.otp}
          placeholder="Enter your OTP"
          maxLength={4}
          onChange={inputHandler}
        />
        <div className="errormessage">{formErrors.otp}</div>
        {/* <input
          type="text"
          name="otp"
          placeholder="Enter your OTP"
          maxLength={4}
          onChange={inputHandler}
          value={formValues.otp}
        ></input> */}
        <MDBInput
          wrapperClass="mb-4"
          className="input"
          label="Password"
          id="form3"
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={formValues.password}
          onChange={inputHandler}
        />
        <div className="errormessage">{formErrors.password}</div>
        {/* <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={formValues.password}
          onChange={inputHandler}
        ></input> */}
        <MDBInput
          wrapperClass="mb-4"
          className="input"
          label="Confirm Password"
          id="form3"
          type="password"
          name="cpassword"
          placeholder="Enter your confirm Password"
          value={formValues.cpassword}
          onChange={inputHandler}
        />
        {/* <input
          type="password"
          name="cpassword"
          placeholder="Enter your confirm Password"
          value={formValues.cpassword}
          onChange={inputHandler}
        ></input> */}
        <div className="errormessage">{formErrors.cpassword}</div>
        <input
          type="hidden"
          name="email"
          value={email}
          onChange={inputHandler}
        ></input>

        <div className="d-grid gap-3 d-md-block" style={{ marginLeft: "33%" }}>
          <MDBBtn onClick={handleSubmit}>Send OTP</MDBBtn>
          <Link to="/email-send" className="link">
            <MDBBtn style={{ backgroundColor: "red", marginLeft: "20px" }}>
              Back
            </MDBBtn>
          </Link>
        </div>
      </form>
    </div>
  );
}
