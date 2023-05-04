import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

// import { Button } from "@mui/material";

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

const Myprofile = () => {
  const [user, setUser] = useState(initialValue);
  let contacts = localStorage;
  const [id, setId] = useState(contacts.id);

  const getUser = (id) => {
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
  // const { id } = useParams();
  const loadUserDetails = async () => {
    let contacts = localStorage;
    console.log("loading user details", contacts);
    getUser(contacts.id);
    return true;
  };
  useEffect(() => {
    let a = loadUserDetails();
  }, []);

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const editstudent = () => {
    const { name, username, email, phone, gender, password, dob } = user;
    console.log(user);
    if (name && username && email && phone && gender && password && dob) {
      axios
        .put("http://localhost:8080/" + id, user)
        .then((res) => console.log(res));
      alert("Edit Profile successfully");
      window.location.reload();
      // window.location.href = "/AllUsers";
    } else {
      alert("invalid input");
    }
  };

  const [image, setImage] = useState("");
  const convertToBase = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  };

  return (
    <main
      className="container "
      style={{ marginLeft: "11.5rem", zIndex: "-1" }}
    >
      <h3
        style={{
          marginTop: "75px",
          textAlign: "center",
          fontFamily: "math",
          color: "darkblue",
          textDecoration: "underline",
        }}
      >
        {" "}
        My Profile
      </h3>
      <section
        style={{
          backgroundColor: "#eee",
          marginLeft: "100px",
          paddingBottom: "40px",
        }}
      >
        <MDBContainer
          className="py-5"
          style={{ width: "1000px", marginTop: "10px" }}
        >
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody
                  style={{
                    fontFamily: "Castoro Titling",
                    fontSize: "20px",
                  }}
                >
                  <MDBCol>
                    <MDBCardText>Profile Image:</MDBCardText>
                    <img src="/admin-myFile-1682709619681.png"></img>
                  </MDBCol>
                  <MDBInput
                    type="file"
                    name="name"
                    onChange={convertToBase}
                    style={{
                      border: "2px solid cornflowerblue",
                      boxShadow: "5px 5px 7px 0px rgb(165 184 217)",
                    }}
                  />
                  <br />
                  {image === "" || image == null ? (
                    ""
                  ) : (
                    <img
                      width={200}
                      height={200}
                      src={image}
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  <button
                    onClick={editstudent}
                    style={{
                      borderRadius: "7px",
                      fontSize: "20px",
                      width: "100px",
                      backgroundColor: "#3b71ca",
                      color: " white",
                      border: "none",
                      textAlign: "center",
                      float: "center",
                    }}
                  >
                    Upload
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody
                  style={{
                    fontFamily: "Castoro Titling",
                    fontSize: "20px",
                  }}
                >
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={(e) => onValueChange(e)}
                          style={{
                            border: "2px solid cornflowerblue",
                            boxShadow: "5px 5px 7px 0px rgb(165 184 217)",
                          }}
                        >
                          {" "}
                        </MDBInput>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Username:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput
                          type="text"
                          name="username"
                          value={user.username}
                          on
                          style={{
                            border: "2px solid cornflowerblue",
                            boxShadow: "5px 5px 7px 0px rgb(165 184 217)",
                          }}
                          Change={(e) => onValueChange(e)}
                        >
                          {" "}
                        </MDBInput>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput
                          type="text"
                          name="email"
                          value={user.email}
                          on
                          style={{
                            border: "2px solid cornflowerblue",
                            boxShadow: "5px 5px 7px 0px rgb(165 184 217)",
                          }}
                          Change={(e) => onValueChange(e)}
                        >
                          {" "}
                        </MDBInput>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput
                          type="text"
                          name="phone"
                          value={user.phone}
                          on
                          style={{
                            border: "2px solid cornflowerblue",
                            boxShadow: "5px 5px 7px 0px rgb(165 184 217)",
                          }}
                          Change={(e) => onValueChange(e)}
                        >
                          {" "}
                        </MDBInput>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Gender:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput
                          type="text"
                          name="gender"
                          value={user.gender}
                          on
                          style={{
                            border: "2px solid cornflowerblue",
                            boxShadow: "5px 5px 7px 0px rgb(165 184 217)",
                          }}
                          Change={(e) => onValueChange(e)}
                        >
                          {" "}
                        </MDBInput>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Roll No.:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput
                          type="text"
                          name="rollNo"
                          value={user.rollNo}
                          onChange={(e) => onValueChange(e)}
                          re
                          style={{
                            border: "2px solid cornflowerblue",
                            boxShadow: "5px 5px 7px 0px rgb(165 184 217)",
                          }}
                          adOnly
                        >
                          {" "}
                        </MDBInput>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Date of Birth:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput
                          type="text"
                          name="date"
                          value={user.dob}
                          on
                          style={{
                            border: "2px solid cornflowerblue",
                            boxShadow: "5px 5px 7px 0px rgb(165 184 217)",
                          }}
                          Change={(e) => onValueChange(e)}
                        >
                          {" "}
                        </MDBInput>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBBtn
            style={{ float: "right", fontSize: "15px" }}
            onClick={editstudent}
          >
            Update Profile
          </MDBBtn>
        </MDBContainer>
      </section>
    </main>
  );
};

export default Myprofile;
