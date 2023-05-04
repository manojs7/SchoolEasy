import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Popup from "reactjs-popup";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";
import { DateRangePicker } from "react-date-range";

const StyledTable = styled(Table)`
  width: 100%;
  margin: 10% 0 0 220px;
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

const AttendanceReport = () => {
  const [attendance, setData] = useState([]);
  const [allattendance, setAllData] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState("");
  // const [totalUsers, setTotalUsers] = useState(0);
  // const usersPerPage = 3;
  // const [page, setPage] = React.useState(1);
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };
  // const [allattendance, setAllData] = useState("");
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      const url = "http://localhost:8080/getTotalAttendance";
      axios.get(url).then((c) => {
        setTotalAttendance(c.data.count);
      });
    } catch (err) {
      alert("not logged in");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    try {
      const url = "http://localhost:8080/showattendance?page=" + page;
      axios.get(url).then((res) => {
        // console.log("hello", page);
        // console.log(res.data.notes);
        setData(res.data.attendance);
        setAllData(res.data.attendance);
      });
    } catch (err) {
      alert("not logged in");
      window.location.reload();
    }
  }, [page]);

  // useEffect(() => {
  //   try {
  //     axios.post("http://localhost:8080/showattendance").then((res) => {
  //       console.log(res.data.attendance);
  //       setData(res.data.attendance);
  //       setAllData(res.data.attendance);
  //     });
  //   } catch (error) {
  //     console.log("error while calling gettinr user", error);
  //   }
  // }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSelect = (date) => {
    let filtered = allattendance.filter((attendance) => {
      console.log(attendance);
      let attendanceDate = new Date(attendance["createdAt"]);
      console.log(
        "5555",
        date,
        date.selection,
        date.selection.startDate,
        "sdsdf",
        attendanceDate,
        "dfdgs",
        attendanceDate > date.selection.startDate &&
          attendanceDate < date.selection.endDate
      );
      return (
        attendanceDate > date.selection.startDate &&
        attendanceDate <= date.selection.endDate
      );
    });
    console.log("hello", filtered);
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setData(filtered);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <main className="container" style={{ marginLeft: "15.5rem" }}>
      <h3
        style={{
          margin: "10% auto auto  60%",
          textAlign: "center",
          fontFamily: "math",
          color: "darkblue",
          textDecoration: "underline",
        }}
      >
        {" "}
        Attendance of All Students
      </h3>
      <Popup
        trigger={
          <button
            style={{
              marginLeft: "120%",
              width: "20%",
              backgroundColor: "#5791b5",
              color: "white",
              border: "none",
            }}
          >
            {" "}
            Filter By Date{" "}
          </button>
        }
        position="left center"
      >
        <div style={{ marginTop: "70%", border: "1px solid lightgray" }}>
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            sx={{
              "& .MuiOutlinedInput-root": {
                mt: 25,
              },
            }}
          />
        </div>
      </Popup>

      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Date</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {attendance.length === 0 ? (
            <h3>No Data Available </h3>
          ) : (
            attendance.map((user) => {
              const date = new Date(user.createdAt);
              const year = date.getFullYear(); // 2023
              const month = date.getMonth() + 1; // JavaScript months are zero-indexed, so add 1
              const day = date.getDate(); // 24
              console.log(date, year, month, day);
              const newdatestr = day + "/" + month + "/" + year;
              console.log(newdatestr);
              return (
                <TBody>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.attendance}</TableCell>
                  <TableCell>{newdatestr}</TableCell>
                </TBody>
              );
            })
          )}
        </TableBody>
      </StyledTable>
      <Stack spacing={2} style={{ margin: "5% 0 0 70%" }}>
        {console.log(page)}
        {/* {Math.ceil(totalUsers / 3)} */}
        <Pagination
          variant="outlined"
          shape="rounded"
          color="primary"
          count={Math.ceil(totalAttendance / 3)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </main>
  );
};

export default AttendanceReport;
