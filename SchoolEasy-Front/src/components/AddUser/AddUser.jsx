import React, { useState } from "react";
import axios from "axios";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import validator from "../Validator";
import classes from "./adduser.module.css";

const Container = styled(FormGroup)`
  ${"" /* border: 2px solid red; */}
  ${"" /* width: 300%; */}
  ${"" /* margin: 3% auto 0 auto; */}
  & > div {
    margin-top: 20px;
  }
`;

const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
  rollNo: "",
  dob: "",
};

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const [error, setError] = useState();
  const [usernameerror, setusernameError] = useState();
  const [emailerror, setemailError] = useState();
  const [phoneerror, setphoneError] = useState();
  const [gendererror, setgenderError] = useState();
  const [passworderror, setpasswordError] = useState();
  const [rollnoerror, setrollnoError] = useState();
  const [dateerror, setdateError] = useState();

  const onnameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log();
    setError(
      validator({ minLength: 5, maxLength: 15, required: true }, e.target.value)
    );
  };

  const onusernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log();
    setusernameError(
      validator({ minLength: 4, maxLength: 10, required: true }, e.target.value)
    );
  };

  const onemailChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log();
    setemailError(validator({ email: true, required: true }, e.target.value));
  };

  const onphoneChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log();
    setphoneError(
      validator(
        { isnum: true, required: true, minLength: 10, maxLength: 10 },
        e.target.value
      )
    );
  };

  const ongenderChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log();
    setgenderError(validator({ required: true }, e.target.value));
  };

  const onpasswordChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log();
    setpasswordError(
      validator(
        { required: true, minvalue: 8, maxValue: 16, password: true },
        e.target.value
      )
    );
  };

  const onrollChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log();
    setrollnoError(
      validator(
        { isnum: true, required: true, minvalue: 2, maxValue: 3 },
        e.target.value
      )
    );
  };

  const ondateChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setdateError(validator({ required: true }, e.target.value));
  };

  const addstudent = () => {
    setError(
      validator({ minLength: 5, maxLength: 15, required: true }, user.name)
    );

    setusernameError(
      validator({ minLength: 4, maxLength: 10, required: true }, user.username)
    );

    setemailError(validator({ email: true, required: true }, user.email));

    setphoneError(
      validator(
        { isnum: true, required: true, minLength: 10, maxLength: 10 },
        user.phone
      )
    );

    setgenderError(validator({ required: true }, user.gender));

    setpasswordError(
      validator(
        { required: true, minvalue: 8, maxValue: 16, password: true },
        user.password
      )
    );

    setrollnoError(
      validator(
        { isnum: true, required: true, minvalue: 2, maxValue: 3 },
        user.rollNo
      )
    );

    setdateError(validator({ required: true }, user.dob));

    const { name, username, email, phone, gender, password, rollno, dob } =
      user;
    if (
      name &&
      username &&
      email &&
      phone &&
      gender &&
      password &&
      rollno &&
      dob
    ) {
      axios
        .post("http://localhost:8080/addstudent", user)
        .then((res) => console.log(res));
      // alert("Add Student Success ")
      window.location.href = "/AllUsers";
    } else {
      alert("Please enter the values");
    }
  };

  return (
    <main className="container col-md-12" style={{ marginLeft: "31.5rem" }}>
      <Container
        className="adduser text-center"
        style={{
          marginTop: "75px",
          textAlign: "center",
          color: "darkblue",
        }}
      >
        <Typography
          variant="h4"
          style={{ fontFamily: "math", textDecoration: "underline" }}
        >
          Add User
        </Typography>
        <FormControl style={{ fontFamily: "math" }}>
          <InputLabel>Name</InputLabel>
          <Input onChange={(e) => onnameChange(e)} name="name" />
          {Error !== "" && (
            <p
              className={`${classes.label} ${
                error === "valid" && classes.valid
              } ${error && error !== "valid" && classes.invalid} `}
            >
              {error}
            </p>
          )}
        </FormControl>
        <FormControl>
          <InputLabel>Username</InputLabel>
          <Input onChange={(e) => onusernameChange(e)} name="username" />
          {Error !== "" && (
            <p
              className={`${classes.label} ${
                error === "valid" && classes.valid
              } ${error && error !== "valid" && classes.invalid} `}
            >
              {usernameerror}
            </p>
          )}
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input onChange={(e) => onemailChange(e)} name="email" />
          {Error !== "" && (
            <p
              className={`${classes.label} ${
                error === "valid" && classes.valid
              } ${error && error !== "valid" && classes.invalid} `}
            >
              {emailerror}
            </p>
          )}
        </FormControl>
        <FormControl>
          <InputLabel>Phone</InputLabel>
          <Input onChange={(e) => onphoneChange(e)} name="phone" />
          {Error !== "" && (
            <p
              className={`${classes.label} ${
                error === "valid" && classes.valid
              } ${error && error !== "valid" && classes.invalid} `}
            >
              {phoneerror}
            </p>
          )}
        </FormControl>
        <FormControl>
          <InputLabel>Gender</InputLabel>
          <Input onChange={(e) => ongenderChange(e)} name="gender" />
          {Error !== "" && (
            <p
              className={`${classes.label} ${
                error === "valid" && classes.valid
              } ${error && error !== "valid" && classes.invalid} `}
            >
              {gendererror}
            </p>
          )}
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input onChange={(e) => onpasswordChange(e)} name="password" />
          {Error !== "" && (
            <p
              className={`${classes.label} ${
                error === "valid" && classes.valid
              } ${error && error !== "valid" && classes.invalid} `}
            >
              {passworderror}
            </p>
          )}
        </FormControl>
        <FormControl>
          <InputLabel>Roll No.</InputLabel>
          <Input onChange={(e) => onrollChange(e)} name="rollNo" />
          {Error !== "" && (
            <p
              className={`${classes.label} ${
                error === "valid" && classes.valid
              } ${error && error !== "valid" && classes.invalid} `}
            >
              {rollnoerror}
            </p>
          )}
        </FormControl>
        <FormControl>
          <InputLabel>Date of Birth</InputLabel>
          <Input onChange={(e) => ondateChange(e)} name="dob" type="date" />
          {Error !== "" && (
            <p
              className={`${classes.label} ${
                error === "valid" && classes.valid
              } ${error && error !== "valid" && classes.invalid} `}
            >
              {dateerror}
            </p>
          )}
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={addstudent}>
            Add User
          </Button>
        </FormControl>
      </Container>
    </main>
  );
};

export default AddUser;
