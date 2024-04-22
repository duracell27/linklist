"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
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

    const dataToUpdate = { displayName, location, bio, bgType }
    if(bgColor){
        dataToUpdate.bgColor = bgColor;
    }
    if(bgImage){
        dataToUpdate.bgImage = bgImage;
    }

    

    await Page.updateOne(
      { owner: session?.user?.email },
      dataToUpdate
    );
    return true;
  }
  return false;
}
