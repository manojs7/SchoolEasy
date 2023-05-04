import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { saveAs } from "file-saver";

const StyledTable = styled(Table)`
  width: 100%;
  margin: 3% 0 0 200px;
  border: 1px solid rgba(224, 224, 224, 1);
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background-color: #365653;
    color: white;
    font-family: "Castoro Titling";
    font-weight: bold;
  }
`;

const TBody = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: ${({ theme }) =>
      theme.palette.action.hover}; // accessing the theme
  }
  &:nth-of-type(odd) {
    background-color: "gray";
  }
  & > td {
    font-size: 16px;
    color: gray;
    font-family: "Ysabeau";
  }
`;

const AllNotes = () => {
  const [users, setData] = useState([]);
  const [totalNotes, setTotalNotes] = useState("");
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      const url = "http://localhost:8080/getTotalNotes";
      axios.get(url).then((c) => {
        setTotalNotes(c.data.count);
      });
    } catch (err) {
      alert("not logged in");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    try {
      const url = "http://localhost:8080/showteachernotes?page=" + page;
      axios.get(url).then((res) => {
        // console.log("hello", page);
        // console.log(res.data.notes);
        setData(res.data.notes);
      });
    } catch (err) {
      alert("not logged in");
      window.location.reload();
    }
  }, [page]);

  function downloadImage(img) {
    saveAs("http://localhost:8080/public/" + img, img);
  }

  return (
    <main className="container" style={{ marginLeft: "15.5rem" }}>
      <h3
        style={{
          margin: "10% 0 0 45%",
          textAlign: "center",
          fontFamily: "math",
          color: "darkblue",
          textDecoration: "underline",
        }}
      >
        {" "}
        All Notes
      </h3>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Filename</TableCell>
            <TableCell>Comment</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TBody>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.std}</TableCell>
              <TableCell>{user.subject}</TableCell>
              <TableCell>
                <button
                  id={user.filename}
                  onClick={downloadImage(user.filename)}
                >
                  Download File
                </button>
              </TableCell>
              <TableCell>{user.comment}</TableCell>
            </TBody>
          ))}
        </TableBody>
      </StyledTable>
      <Stack spacing={2} style={{ margin: "5% 0px 0px 62%" }}>
        {/* {console.log(page)} */}
        {/* {Math.ceil(totalUsers / 3)} */}
        <Pagination
          variant="outlined"
          shape="rounded"
          color="primary"
          count={Math.ceil(totalNotes / 3)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </main>
  );
};
export default AllNotes;
