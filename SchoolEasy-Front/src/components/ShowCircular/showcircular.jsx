import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const AllCirculars = () => {
  const [circular, setData] = useState([]);
  const [totalCircular, setTotalCircular] = useState(0);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      const url = "http://localhost:8080/getTotalCirculars";
      axios.get(url).then((c) => {
        // console.log("gggggggggggg", totalCircular, c, c.count);
        setTotalCircular(c.data.count);
      });
    } catch (err) {
      alert("not logged in");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    try {
      const url = "http://localhost:8080/showcircular?page=" + page;
      axios.get(url).then((res) => {
        // console.log("hello", page);
        // console.log(res.data.notes);
        console.log(res.data.circular);
        setData(res.data.circular);
      });
    } catch (err) {
      alert("not logged in");
      window.location.reload();
    }
  }, [page]);

  // useEffect(() => {
  //   try {
  //     axios.post("http://localhost:8080/showcircular").then((res) => {
  //       console.log(res.data.circular);
  //       setData(res.data.circular);
  //     });
  //   } catch (error) {
  //     console.log("error while calling gettinr user", error);
  //   }
  // }, []);

  return (
    <main className="container" style={{ marginLeft: "15.5rem" }}>
      <h3
        style={{
          marginTop: "75px",
          textAlign: "center",
          fontFamily: "math",
          color: "black",
          textDecoration: "underline",
        }}
      >
        {" "}
        All Circular Notices
      </h3>
      <div style={{ padding: "28px", backgroundColor: "aliceblue" }}>
        <MDBRow className="row">
          {circular ? (
            circular.map((circular, index) => {
              return (
                <MDBCol
                  sm="6"
                  mb="3"
                  marginTop="20px"
                  style={{ paddingBottom: "20px" }}
                >
                  <MDBCard style={{ minWidth: "100%" }}>
                    <MDBCardBody
                      style={{
                        border: "2px solid cornflowerblue",
                        fontFamily: "'Roboto Serif', serif",
                        boxShadow: "rgb(195 196 199) 5px 5px 7px 0px",
                      }}
                    >
                      <MDBCardTitle>
                        <b> ID: </b>
                        {circular._id}
                      </MDBCardTitle>
                      <MDBCardTitle>
                        <b> Title: </b>
                        {circular.title}
                      </MDBCardTitle>
                      <MDBCardText style={{ color: "#40858e" }}>
                        <b style={{ color: "black" }}> Content: </b>
                        {circular.content}
                      </MDBCardText>
                      <MDBCardText
                        style={{ textAlign: "right", color: "blue" }}
                      >
                        {circular.date}
                      </MDBCardText>
                      {/* <MDBBtn href={item.filename}>Click Me</MDBBtn> */}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              );
            })
          ) : (
            <h3>No data available</h3>
          )}
        </MDBRow>
        <Stack spacing={2} style={{ margin: "5% 0 0 43%" }}>
          {/* {console.log(page)} */}
          {/* {Math.ceil(totalUsers / 3)} */}
          <Pagination
            variant="outlined"
            shape="rounded"
            color="primary"
            count={Math.ceil(totalCircular / 6)}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
      {/* <p> {totalCircular} </p> */}
    </main>
  );
};

export default AllCirculars;
