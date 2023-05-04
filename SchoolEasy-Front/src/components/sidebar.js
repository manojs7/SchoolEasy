import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Groups3Icon from "@mui/icons-material/Groups3";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function SideNavbar() {
  const { collapseSidebar } = useProSidebar();

  let role = localStorage.getItem("role");

  const logout = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      .then((res) => {
        localStorage.removeItem("role");
        console.error("heyaa", res);
        if (!res.status === 200) {
          const error = new Error(res.error);
          console.error("hey", error);
          throw error;
        }
        window.location.href = "/login";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    // <div id="navbar" style={({ height: "100vh" }, { display: "flex" })}>
    // <div style={{ backgroundColor: "black" }}>
    <Sidebar
      style={{ height: "100vh", position: "fixed" }}
      className="side"
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "#181819",
          marginTop: "37px",
          // position: "fixed",
        },
      }}
    >
      <Navbar />
      {role === "Teacher" ? (
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#eee" : "#fff",
                  backgroundColor: active ? "#6194c7 " : undefined,
                  "&:hover": {
                    backgroundColor: "#115eaa !important",
                    color: "white !important",
                    fontWeight: "bold !important",
                  },
                };
            },
          }}
        >
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{
              textAlign: "center",
              fontFamily: "'Roboto Serif', serif",
            }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>

          <MenuItem
            icon={<GroupAddIcon />}
            component={<Link to="/AddUser" />}
            active={window.location.pathname === "/AddUser"}
          >
            Add User
          </MenuItem>
          <MenuItem
            icon={<Groups3Icon />}
            component={<Link to="/AllUsers" />}
            active={window.location.pathname === "/AllUsers"}
          >
            All Users
          </MenuItem>
          <MenuItem
            icon={<NewReleasesIcon />}
            component={<Link to="/circular" />}
            active={window.location.pathname === "/circular"}
          >
            Add Circular
          </MenuItem>
          <MenuItem
            icon={<AnnouncementIcon />}
            component={<Link to="/showcircular" />}
            active={window.location.pathname === "/showcircular"}
          >
            show Circular
          </MenuItem>
          <MenuItem
            icon={<TextSnippetIcon />}
            component={<Link to="/addnotes" />}
            active={window.location.pathname === "/addnotes"}
          >
            Add Notes
          </MenuItem>
          <MenuItem
            icon={<SpeakerNotesIcon />}
            component={<Link to="/allnotes" />}
            active={window.location.pathname === "/allnotes"}
          >
            All Notes
          </MenuItem>
          <MenuItem
            icon={<BookmarkAddedIcon />}
            component={<Link to="/addattendance" />}
            active={window.location.pathname === "/addattendance"}
          >
            Add Attendance
          </MenuItem>
          <MenuItem
            icon={<CoPresentIcon />}
            component={<Link to="/showattendance" />}
            active={window.location.pathname === "/showattendance"}
          >
            Attendance Report
          </MenuItem>
          <MenuItem icon={<LogoutIcon />} onClick={logout}>
            Logout
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#eee" : "#fff",
                  backgroundColor: active ? "#6194c7" : undefined,
                  "&:hover": {
                    backgroundColor: "#115eaa !important",
                    color: "white !important",
                    fontWeight: "bold !important",
                  },
                };
            },
          }}
        >
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{
              textAlign: "center",
              fontFamily: "'Roboto Serif', serif",
            }}
          >
            {" "}
            <h3>Student</h3>
          </MenuItem>

          <MenuItem
            icon={<AccountCircleIcon />}
            component={<Link to="/myprofile" />}
            active={window.location.pathname === "/myprofile"}
          >
            My Profile
          </MenuItem>
          <MenuItem
            icon={<AnnouncementIcon />}
            component={<Link to="/showcircular" />}
            active={window.location.pathname === "/showcircular"}
          >
            Circular
          </MenuItem>
          <MenuItem
            icon={<SpeakerNotesIcon />}
            component={<Link to="/shownotes" />}
            active={window.location.pathname === "/shownotes"}
          >
            Notes
          </MenuItem>
          <MenuItem
            icon={<CoPresentIcon />}
            component={<Link to="/studentattendance" />}
            active={window.location.pathname === "/studentattendance"}
          >
            Student Attendance
          </MenuItem>
          <MenuItem icon={<LogoutIcon />} onClick={logout}>
            Logout
          </MenuItem>
        </Menu>
      )}
    </Sidebar>
    // </div>
  );
}

export default SideNavbar;
