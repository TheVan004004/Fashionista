import React from "react";
import "../styles/pages/admin.css";
import Navleft from "./NavLeft";
import { Outlet } from "react-router-dom";
export default function Admin() {
  return (
    <div id="admin">
      <Navleft />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
