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

const StyledTable = styled(Table)`
  width: 100%;
  margin: 5% 0 0 113px;
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
      // const page = 2;
      const url = `http://localhost:8080/AllUsers?page=${page}`;
      fetch(url)
        .then((users) => {
          console.log(users);
          return users.json();
        })
        .then((u) => {
          setUsers(u.user);
          // setTotalUsers(u.user.length);

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

  const handleActive = async (id, flag) => {
    try {
      const response = await axios({
        method: "put",
        url: "http://localhost:8080/InActive/" + id,
        data: {
          flag: flag,
        },
      });
      window.location.href = "/AllUsers";
    } catch (error) {
      console.log("error while calling gettinr user", error);
    }
  };

  return (
    <main className="container" style={{ marginLeft: "15.5rem" }}>
      <h3
        style={{
          margin: "10% auto auto  20%",
          textAlign: "center",
          fontFamily: "math",
          color: "darkblue",
          textDecoration: "underline",
        }}
      >
        {" "}
        All Users
      </h3>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TBody>
              <TableCell
                style={user.isActive ? { color: "green" } : { color: "red" }}
              >
                {user._id}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/EditUser/${user._id}`}
                >
                  Edit
                </Button>
                {user.isActive ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleActive(user._id, false)}
                  >
                    In-Active
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleActive(user._id, true)}
                  >
                    Activate
                  </Button>
                )}
              </TableCell>
            </TBody>
          ))}
        </TableBody>
      </StyledTable>
      <Stack spacing={2} style={{ margin: "5% 0 0 52%" }}>
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
