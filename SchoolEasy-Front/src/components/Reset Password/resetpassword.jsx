import React, { useRef, useState, useEffect } from "react";
import "./resetpassword.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

export default function ResetPasswordPage() {
  const emailRef = useRef();
  // const [otpForm, showForm] = useState(true);
  const sendOtp = async () => {
    // e.preventdefault();
    try {
      let url = "http://localhost:8080/email-send";
      let options = {
        method: "POST",
        url: url,
        data: { email: emailRef.current.value },
      };
      let response = await axios(options);
      let record = response.data;
      if ((record.statusText = "success")) {
        console.log(record.message);
        localStorage.setItem("email_reset", emailRef.current.value);
        window.location.href = "/otp-verify";
        // showForm(false);
      } else {
        console.error(record.message);
      }
    } catch (e) {
      console.error("something went wrong", e);
    }
  };

  const initialValues = { email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (formErrors.email === "") {
      setIsSubmit(true);
      sendOtp();
    }
    // setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  });

  const validate = (values) => {
    const errors = {};
    const validEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    if (!values.email) {
      errors.email = "email is required!";
    } else if (!validEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    } else {
      errors.email = "";
    }
    return errors;
  };

  // const [email, setEmail] = useState("");
  // const handleChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const resetpassword = async () => {
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: "http://localhost:8080/email-send",
  //       data: {
  //         email: email,
  //       },
  //     });
  //     window.location = "/otp-verify/" + email;
  //   } catch (error) {
  //     console.log("error while calling gettinr user", error);
  //   }
  // };
  return (
    <main>
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <form action="" className="reset" style={{ padding: "38px" }}>
        <h3 className="resetheading"> Reset Password</h3>
        {/* <label className="labelheading">
          <b>Email:</b>
        </label> */}

        <MDBInput
          wrapperClass="mb-4"
          label="Email"
          id="form3"
          type="email"
          name="email"
          value={formValues.email}
          placeholder="Enter your Email"
          onChange={handleChange}
          ref={emailRef}
        />
        <p className="errormessage">{formErrors.email}</p>
        {/* <input
          type="text"
          name="email"
          placeholder="Enter your Email"
          value={formValues.email}
          onChange={handleChange}
          ref={emailRef}
        ></input> */}

        <div className="d-grid gap-3 d-md-block" style={{ marginLeft: "30%" }}>
          <MDBBtn onClick={handleSubmit}>Send OTP</MDBBtn>
          <Link to="/login" className="link">
            <MDBBtn style={{ backgroundColor: "red", marginLeft: "20px" }}>
              Back
            </MDBBtn>
          </Link>
        </div>
        {/* <div className="row">
          <button className="button1" onClick={handleSubmit}>
            Send otp
          </button>

          <Link to="/login" className="link">
            <button className="button2">Back</button>
          </Link>
        </div> */}
      </form>
    </main>
  );
}
