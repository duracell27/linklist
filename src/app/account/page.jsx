import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "../models/Page";

const AccountPage = async ({ searchParams, ...rest }) => {

  const session = await getServerSession(authOptions);
  const desireUsername = searchParams?.desireUsername;

  if (!session) {
   return redirect("/");
  }
  const page = await Page.findOne({owner: session?.user?.email})
  if(page){
    return (
        <p>page:{page.uri}</p>
    )
  }
  return (
    <div>
      <UsernameForm desireUsername={desireUsername}/> 
    </div>
  );
};

export default AccountPage;
