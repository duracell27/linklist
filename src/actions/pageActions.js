"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function savePageSettings(formData) {
  mongoose.connect(process.env.MONGODB_CONNECT_URL);
  const session = await getServerSession(authOptions);
  if (session) {
    // const page = await Page.findOne()
    const displayName = formData.get("displayName");
    const location = formData.get("location");
    const bio = formData.get("bio");
    const bgType = formData.get("bgType");

    const bgColor = formData.get("bgColor");
    const bgImage = formData.get("bgImage");

    if (formData.has("avatar")) {
      const avatar = formData.get("avatar");
      await User.updateOne({ email: session?.user?.email }, { image: avatar });
    }

    const dataToUpdate = { displayName, location, bio, bgType };
    if (bgColor) {
      dataToUpdate.bgColor = bgColor;
    }
    if (bgImage) {
      dataToUpdate.bgImage = bgImage;
    }

    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);
    return true;
  }
  return false;
}

export async function savePageButtons(formData) {
  mongoose.connect(process.env.MONGODB_CONNECT_URL);
  const session = await getServerSession(authOptions);
  if (session) {
    const buttonsValues = {};
    formData.forEach((value, key) => {
      buttonsValues[key] = value;
    });

    const dataToUpdate = { buttons: buttonsValues };

    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);
    return true
  }

  return false;
}

export async function savePageLinks(links) {
    mongoose.connect(process.env.MONGODB_CONNECT_URL);
    const session = await getServerSession(authOptions);
    if (session) {



        await Page.updateOne({ owner: session?.user?.email }, {links: links});
    return true
    }

    return false;
}
