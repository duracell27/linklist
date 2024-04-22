"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChartLine,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const path = usePathname();
  
  return (
    <nav className="inline-flex flex-col text-center mt-8 gap-4 ">
      <Link
        className={`flex gap-4 items-center ${
          path === "/account" ? "text-blue-500 font-bold " : "text-gray-500"
        } `}
        href={"/account"}
      >
        <FontAwesomeIcon
          fixedWidth={1}
          className="h-5 w-5"
          icon={faHouse}
        />{" "}
        <span>My page</span>
      </Link>
      <Link
        className={`flex gap-4 items-center ${
          path === "/analytics" ? "text-blue-500 font-bold " : "text-gray-500"
        } `}
        href={"/analytics"}
      >
        <FontAwesomeIcon
          fixedWidth={1}
          className="h-5 w-5 "
          icon={faChartLine}
        />
        <span>Analitics</span>
      </Link>

      <LogoutButton
        iconPos="left"
        className="flex gap-4 items-center text-gray-500"
        iconClass="h-5 w-5"
        spanClass="text-gray-500"
      ></LogoutButton>

      <Link
        className="flex gap-4 items-center text-sm border-t pt-4"
        href={"/"}
      >
        <FontAwesomeIcon
          fixedWidth={1}
          className="h-5 w-5 text-gray-400"
          icon={faArrowLeft}
        />
        <span className="text-gray-400">Back to website</span>
      </Link>
    </nav>
  );
};

export default AppSidebar;
