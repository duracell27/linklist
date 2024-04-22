"use server";

import mongoose from "mongoose";
import { Page } from "../models/Page";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export const grabUsername = async (formData) => {
  const username = formData.get("username");
  mongoose.connect(process.env.MONGODB_CONNECT_URL);

  const existingUser = await Page.findOne({ uri: username });

  if (existingUser) {
    return false;
  } else {
    const session = await getServerSession(authOptions);
    const resp = await Page.create({
      uri: username,
      owner: session?.user?.email,
    });
    const ans = JSON.parse(JSON.stringify(resp));
    return ans;
  }
};
