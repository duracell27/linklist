"use client";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = ({
  className = "",
  iconClass = "",
  spanClass = "",
  iconPos = "right",
}) => {
  return (
    <button className={className} onClick={() => signOut()}>
      {iconPos == "left" && (
        <FontAwesomeIcon className={iconClass} icon={faRightFromBracket} />
      )}
      <span className={spanClass}>Logout</span>
      {iconPos == "right" && (
        <FontAwesomeIcon className={iconClass} icon={faRightFromBracket} />
      )}
    </button>
  );
};

export default LogoutButton;
