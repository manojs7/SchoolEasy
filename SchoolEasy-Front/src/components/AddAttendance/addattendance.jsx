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
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";
import AttStatus from "../AttStatus";

const StyledTable = styled(Table)`
  width: 100%;
  margin: 5% 0 0 175px;
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

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 3;
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      const url = `http://localhost:8080/AllUsers?page=${page}`;
      fetch(url)
        .then((users) => {
          console.log(users);
          return users.json();
        })
        .then((u) => {
          setUsers(u.user);
          console.log(u);
        });
    } catch (err) {
      alert("not logged in");
      window.location.reload();
    }

    // getAllUsers();
  }, [page]);

  useEffect(() => {
    fetch(`http://localhost:8080/getTotalUsers`)
      .then((res) => {
        // setTotalUsers(count.count);
        return res.json();
      }, [])
      .then((c) => {
        setTotalUsers(c.count);
      });
  }, []);

  const [message, setmessage] = useState([]);

  return (
    <main className="container" style={{ marginLeft: "15.5rem" }}>
      <div>
        <h3
          style={{
            margin: "10% auto auto  40%",
            textAlign: "center",
            fontFamily: "math",
            color: "darkblue",
            textDecoration: "underline",
          }}
        >
          {" "}
          Add Attendance
        </h3>
      </div>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Present / Absent</TableCell>
            {/* <TableCell></TableCell> */}
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TBody>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <AttStatus user={user} page={page} />
            </TBody>
          ))}
        </TableBody>
      </StyledTable>
      <Stack spacing={2} style={{ margin: "5% 0 0 60%" }}>
        {console.log(page)}
        {/* {Math.ceil(totalUsers / 3)} */}
        <Pagination
          variant="outlined"
          shape="rounded"
          color="primary"
          count={Math.ceil(totalUsers / 3)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </main>
  );
};

export default AllUsers;
