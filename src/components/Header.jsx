import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Header = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  // console.log('google', process.env.GOOGLE_CLIENT_SECRET)
  return (
    <header className="bg-white border-b  py-4">
        <div className="max-w-4xl flex justify-between mx-auto px-6">
        <div className="flex gap-6 ">
        <Link href={"/"}>Link List</Link>
        <nav className="flex items-center gap-4 text-slate-500 text-sm">
          <Link href={"/about"}>About</Link>
          <Link href={"/pricing"}>Pricing</Link>
          <Link href={"/contact"}>Contact</Link>
        </nav>
      </div>
      <nav className="flex gap-4 text-sm text-slate-500">
        <Link href={"/login"}>Sign In</Link>
        <Link href={"/login"}>Sign Up</Link>
      </nav>
        </div>
      
    </header>
  );
};

export default Header;
