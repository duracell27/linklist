import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Header = async () => {
  const session = await getServerSession(authOptions);
  
  return (
    <header className="bg-white border-b  py-4">
      <div className="max-w-4xl flex justify-between mx-auto px-6">
        <div className="flex gap-6 items-center">
          <Link className="flex items-center gap-2 text-blue-500" href={"/"}><FontAwesomeIcon className="text-blue-500" icon={faLink} /> <span className="font-bold text-nowrap">Link List</span></Link>
          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>
        <nav className="flex gap-4 items-center text-sm text-slate-500">
          {!!session && (<>
            <Link href={'/account'}>Hello, {session?.user?.name}</Link>
            <LogoutButton className="flex items-center gap-2 border p-1 px-4 shadow-sm"/>
          </>)}
          {!session && (
            <>
              <Link href={"/login"}>Sign In</Link>
              <Link href={"/login"}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
