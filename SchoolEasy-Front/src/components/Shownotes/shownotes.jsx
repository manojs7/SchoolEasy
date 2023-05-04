import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Shownotes() {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("test");
  const [totalNotes, setTotalNotes] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = (e, value) => {
    setPage(value);
  };
  const handleSubjectChange = (e, value) => {
    setSubject(e.target.value);
    setPage(1);
  };
  // useEffect(() => {
  //   console.log(subject);
  //   setData(data.filter((data) => data.subject === subject));
  // }, [subject]);

  useEffect(() => {
    try {
      if (subject !== "") {
        const url = `http://localhost:8080/getTotalNotes`;
        axios.get(url, { params: { subject: subject } }).then((c) => {
          setTotalNotes(c.data.count);
        });
      } else {
        const url = `http://localhost:8080/getTotalNotes`;
        axios.get(url).then((c) => {
          setTotalNotes(c.data.count);
        });
      }
    } catch (err) {
      alert("not logged in");
      window.location.reload();
    }
  }, [subject]);

  const getNotes = () => {
    try {
      const url = "http://localhost:8080/shownotes/" + subject;
      axios.get(url).then((res) => {
        // console.log(res.data.notes);
        setData(res.data.notes);
      });
    } catch (error) {
      console.log("error while calling gettinr user", error);
    }
  };
  useEffect(() => {
    try {
      // const page = 2;
      const url = `http://localhost:8080/shownotes/${subject}`;
      axios.get(url, { params: { page: page } }).then((res) => {
        console.log(res.data.notes);
        setData(res.data.notes);
      });
    } catch (err) {
      alert("not logged in");
      window.location.reload();
    }

    // getAllUsers();
  }, [page]);

  return (
    <main className="container" style={{ marginLeft: "14.5rem" }}>
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
        My Notes
      </h3>
      <section
        className="row"
        style={{
          backgroundColor: "#eee",
          padding: "50px",
          margin: "20px 250px",
        }}
      >
        {/* <div className="row"> */}
        <div className="col-md-9">
          <select
            className="form-control"
            onChange={handleSubjectChange}
            style={{
              border: "2px solid cornflowerblue",
              boxShadow: "5px 5px 7px 0px rgb(165 184 217)",
              fontFamily: "Castoro Titling",
              fontSize: "20px",
            }}
          >
            <option value="">Choose Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
          </select>
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-primary"
            onClick={getNotes}
            style={{ width: "95px", height: "45px" }}
          >
            Search
          </button>
        </div>
        {/* </div> */}
      </section>

      <div>
        <MDBRow style={{ padding: "28px" }}>
          {data ? (
            data.map(
              (item, index) => {
                return (
                  <MDBCol
                    sm="6"
                    mb="3"
                    marginTop="20px"
                    style={{
                      paddingBottom: "20px",
                    }}
                  >
                    <MDBCard>
                      <MDBCardBody
                        style={{
                          border: "2px solid cornflowerblue",
                          fontFamily: "'Roboto Serif', serif",
                          boxShadow: "rgb(195 196 199) 5px 5px 7px 0px",
                        }}
                      >
                        <MDBCardTitle>
                          <b> Subject: </b>
                          {item.subject}
                        </MDBCardTitle>
                        <MDBCardText style={{ color: "#40858e" }}>
                          <b style={{ color: "black" }}> Comment: </b>
                          {item.comment}
                        </MDBCardText>
                        <MDBBtn
                          href={item.filename}
                          style={{
                            fontSize: "15px",
                            fontFamily: "'Ysabeau', sans-serif",
                          }}
                        >
                          Click Me
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                );
              },
              <Stack spacing={2} style={{ margin: "5% 0 0 43%" }}>
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  count={Math.ceil(totalNotes / 3)}
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            )
          ) : (
            <h3>No data available</h3>
          )}
          <Stack spacing={2} style={{ margin: "5% 0 0 43%" }}>
            <Pagination
              variant="outlined"
              shape="rounded"
              color="primary"
              count={Math.ceil(totalNotes / 4)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </MDBRow>
      </div>
      {/* <Stack spacing={2} style={{ margin: "5% 0 0 43%" }}>
        
        <Pagination
          variant="outlined"
          shape="rounded"
          color="primary"
          count={Math.ceil(totalNotes / 3)}
          page={page}
          onChange={handleChange}
        />
      </Stack> */}
    </main>
  );
}
