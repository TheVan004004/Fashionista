import React from "react";
import { HiArrowCircleUp } from "react-icons/hi";
import "../styles/return-header-page.css";
export default function ReturnHeaderPage() {
  return (
    <div
      id="return-header-page"
      className="btn10"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <HiArrowCircleUp />
    </div>
  );
}
