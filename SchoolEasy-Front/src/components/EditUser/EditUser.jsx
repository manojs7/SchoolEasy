import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";

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
  id: "",
  gender: "",
  password: "",
  rollNo: "",
  dob: "",
};

const EditUser = () => {
  const [user, setUser] = useState(initialValue);

  const getUser = async (id) => {
    try {
      const url = "http://localhost:8080/" + id;
      //   return await axios.get(url);
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          console.log("here", response);
          setUser(response.user[0]);
          //   return data;
        });
    } catch (error) {
      console.log("error while calling gettinr user", error);
    }
  };

  const { id } = useParams();
  const loadUserDetails = async () => {
    const response = await getUser(id);
    // setUser(response.user[0]);
    console.log(response);
  };
  useEffect(() => {
    loadUserDetails();
  }, []);

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const addUserDetails = async () => {
  //   await addUser(user);
  // };

  const editstudent = () => {
    const { name, username, email, phone, gender, password, rollno, dob } =
      user;
    if (name && username && email && phone && gender && password && dob) {
      axios
        .put("http://localhost:8080/" + id, user)
        .then((res) => console.log(res));
      window.location.href = "/AllUsers";
    } else {
      alert("invalid input");
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
          Edit User
        </Typography>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="name"
            value={user.name}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Username</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="username"
            value={user.username}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="email"
            value={user.email}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Phone</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="phone"
            value={user.phone}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Gender</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="gender"
            value={user.gender}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="password"
            value={user.password}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Roll No.</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="rollNo"
            value={user.rollNo}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Date of Birth</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="dob"
            value={user.dob}
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={editstudent}>
            Edit User
          </Button>
        </FormControl>
      </Container>
    </main>
  );
};

export default EditUser;
