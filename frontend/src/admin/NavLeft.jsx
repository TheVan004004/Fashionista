import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navleft() {
  const [sidebar, setSidebar] = useState(true);
  const SidebarData = [
    {
      title: "Tổng quan",
      path: "/admin",
      cName: "nav-text",
    },
    {
      title: "Đơn hàng",
      path: "/admin/manage-order",
      cName: "nav-text",
    },
    {
      title: "Sản phẩm",
      path: "/admin/manage-product",
      cName: "nav-text",
    },
    {
      title: "Khách hàng",
      path: "/admin/manage-customer",
      cName: "nav-text",
    },
  ];
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div
      className={sidebar ? "container-nav active" : "container-nav"}
      style={{ flexShrink: "0" }}
    >
      <ul className="nav-menu-items">
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {/* {item.icon} */}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
