import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/homepage";
import Register from "./components/Register/register";
import { useState } from "react";
import SelectionPage from "./components/selectionpage/SelectionPage";
import Navbar from "./components/Navbar/Navbar";
import AddUser from "./components/AddUser/AddUser";
import AllUsers from "./components/AllUsers/AllUsers";
import InfoObject from "./components/InfoObject/InfoObject";
import EditUser from "./components/EditUser/EditUser";
import ResetPasswordPage from "./components/Reset Password/resetpassword";
import OTPVerifyPage from "./components/verify/otpverify";
import Logout from "./components/Logout/logout";
import Myprofile from "./components/Myprofile/myprofile";
import Circular from "./components/Circular/circular";
import ShowCircular from "./components/ShowCircular/showcircular";
import AddNotes from "./components/Addnotes/addnotes";
import Shownotes from "./components/Shownotes/shownotes";
import Allnotes from "./components/Allnotes/allnotes";
import Addattendance from "./components/AddAttendance/addattendance";
import Sidebar from "./components/sidebar";
import AttendanceReport from "./components/AttendenceReport/report";
import StudentAttendance from "./components/StudentAttendence/studentattendance";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SelectionPage />
          </Route>
          <Route path="/login">
            {" "}
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register">
            {" "}
            <Register />{" "}
          </Route>
          <Route path="/homepage">
            {" "}
            <Homepage />{" "}
          </Route>

          <Route path="/Navbar">
            {" "}
            <Navbar />{" "}
          </Route>
          <Route path="/InfoObject">
            {" "}
            <InfoObject />{" "}
          </Route>
          <Route path="/AddUser">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <AddUser />
            </div>
          </Route>
          <Route path="/AllUsers">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <AllUsers />{" "}
            </div>
          </Route>
          <Route path="/EditUser/:id">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <EditUser />{" "}
            </div>
          </Route>
          <Route path="/email-send">
            {" "}
            <ResetPasswordPage />{" "}
          </Route>
          <Route path="/otp-verify">
            {" "}
            <OTPVerifyPage />{" "}
          </Route>
          <Route path="/logout">
            {" "}
            <Logout />{" "}
          </Route>
          <Route path="/myprofile">
            <Sidebar />
            <Myprofile />{" "}
          </Route>
          <Route path="/circular">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <Circular />{" "}
            </div>
          </Route>
          <Route path="/showcircular">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <ShowCircular />{" "}
            </div>
          </Route>
          <Route path="/addnotes">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <AddNotes />{" "}
            </div>
          </Route>
          <Route path="/shownotes">
            <Sidebar />
            <Shownotes />{" "}
          </Route>
          <Route path="/allnotes">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <Allnotes />{" "}
            </div>
          </Route>
          <Route path="/addattendance">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <Addattendance />{" "}
            </div>
          </Route>
          <Route path="/showattendance">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <AttendanceReport />{" "}
            </div>
          </Route>
          <Route path="/studentattendance">
            <div style={({ height: "100%" }, { display: "flex" })}>
              <Sidebar />
              <StudentAttendance />{" "}
            </div>
          </Route>
          <Route path="/sidebar">
            {" "}
            <Sidebar />{" "}
          </Route>
        </Switch>
      </Router>

      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/StudentLanding" element={<StudentLanding />} />
      </Routes> */}
    </div>
  );
}

export default App;
