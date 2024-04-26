import { Event } from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req){
    const url = new URL(req.url)
   
    const clickedLink = atob(url.searchParams.get('url'))
    const page = url.searchParams.get('page')
    
    mongoose.connect(process.env.MONGODB_CONNECT_URL)
    await Event.create({type: 'click', uri: clickedLink, page})
    return Response.json(true)
}