import React from "react";
import { AppBar, Toolbar, styled, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = styled(AppBar)`
  ${"" /* background: #111111; */}
  background: rgb(238,174,202);
  background: radial-gradient(circle, rgb(118 157 150) 0%, rgb(35 124 235) 100%)
    ${"" /* background: blue; */};
`;

const Tabs = styled(NavLink)``;

const Navbar = () => {
  return (
    <Header>
      <div>
        <h1 style={{ fontSize: "24px", fontFamily: "Castoro Titling" }}>
          Student Management System
        </h1>{" "}
      </div>
    </Header>
  );
};

export default Navbar;
