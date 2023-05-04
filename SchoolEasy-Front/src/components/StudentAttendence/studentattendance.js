import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";
import { DateRangePicker } from "react-date-range";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

const StyledTable = styled(Table)`
  width: 100%;
  margin: 10% 0 0 200px;
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

const StudentAttendance = () => {
  const [user, setUser] = useState([]);
  const [allattendance, setAllData] = useState([]);
  let contacts = localStorage;
  const [id, setId] = useState(contacts.id);

  const getAttendance = (id) => {
    try {
      const url = "http://localhost:8080/attendance/" + id;
      //   return await axios.get(url);
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          console.log("here", response);
          setUser(response.attendance);
          setAllData(response.attendance);
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
    getAttendance(contacts.id);
    return true;
  };
  useEffect(() => {
    let a = loadUserDetails();
  }, []);

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSelect = (date) => {
    console.log("date", date);
    let filtered;
    if (date.selection.endDate !== date.selection.startDate) {
      filtered = allattendance.filter((attendance) => {
        console.log(attendance);
        let attendanceDate = new Date(attendance["createdAt"]);

        return (
          attendanceDate >= date.selection.startDate &&
          attendanceDate <= date.selection.endDate
        );
      });
    } else {
      filtered = allattendance.filter((attendance) => {
        console.log(attendance);
        let attendanceDate = new Date(attendance["createdAt"]);

        return attendanceDate === date.selection.startDate
          ? attendanceDate
          : null;
      });
    }

    console.log("hello", filtered);
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setUser(filtered);
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
        Student Attendance
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

      <StyledTable StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Attendance</TableCell>
          </THead>
        </TableHead>

        <TableBody>
          {user.length === 0 ? (
            <h3>No Data Available </h3>
          ) : (
            user.map((user) => {
              const date = new Date(user.createdAt);
              const year = date.getFullYear(); // 2023
              const month = date.getMonth() + 1; // JavaScript months are zero-indexed, so add 1
              const day = date.getDate(); // 24
              console.log(date, year, month, day);
              const newdatestr = day + "/" + month + "/" + year;
              console.log(newdatestr);
              return (
                <TBody>
                  <TableCell onChange={(e) => onValueChange(e)}>
                    {user._id}
                  </TableCell>
                  <TableCell onChange={(e) => onValueChange(e)}>
                    {newdatestr}
                  </TableCell>
                  <TableCell onChange={(e) => onValueChange(e)}>
                    {user.name}
                  </TableCell>
                  <TableCell onChange={(e) => onValueChange(e)}>
                    {user.attendance}
                  </TableCell>
                </TBody>
              );
            })
          )}
        </TableBody>
      </StyledTable>
    </main>
  );
};

export default StudentAttendance;
