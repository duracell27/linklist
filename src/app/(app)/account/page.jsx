import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "../../../models/Page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";

const AccountPage = async ({ searchParams, ...rest }) => {
  const session = await getServerSession(authOptions);
  const desireUsername = searchParams?.desireUsername;
  const user = JSON.parse(JSON.stringify(session?.user));

  if (!session) {
    return redirect("/");
  }
  mongoose.connect(process.env.MONGODB_CONNECT_URL);
  const page = await Page.findOne({ owner: session?.user?.email });
  if (page) {
    return (
      <>
        <PageSettingsForm page={page} user={user} />
        <PageButtonsForm page={page} user={user}/>
        <PageLinksForm page={page} user={user}/>
      </>
    );
  }
  return (
    <div>
      <UsernameForm desireUsername={desireUsername} />
    </div>
  );
};

export default AccountPage;
