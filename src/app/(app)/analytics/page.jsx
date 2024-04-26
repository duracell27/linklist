import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import React from "react";
import { isToday } from "date-fns";


const AnalyticsPage = async () => {
  mongoose.connect(process.env.MONGODB_CONNECT_URL);
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session?.user?.email });

  const groupedViews = await Event.aggregate([
    { $match: { type: "view", uri: page.uri } },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const cliks = await Event.find({page: page.uri, type: "click"})

  return (
    <>
      <SectionBox>
        <h2 className="text-xl mb-4 text-center">Views</h2>
        <Chart groupedViews={groupedViews} />
      </SectionBox>
      <SectionBox>
        <h2 className="text-xl my-4 text-center">Cliks</h2>
        {page.links.map((link) => (
          <div className="flex items-center gap-6 border-t border-gray-200 py-4 ">
            <div className="text-blue-500 pl-4">
              {/* <Image /> */}
              <FontAwesomeIcon icon={faLink}/>
            </div>
            <div className="grow">
            <h3>{link.title || "no title"}</h3>
            <p className="text-gray-500 text-sm"> {link.subTitle || "no description"}</p>
            <a className="text-sm text-blue-400" target='_blank' href='link.url'>{link.url}</a>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs uppercase font-bold">Today: </div>
              <div className="text-2xl">{cliks.filter(c=> c.uri === link.url && isToday(c.createdAt)).length}</div>
              </div>
              <div className="text-center">
              <div className="text-gray-400 text-xs uppercase font-bold">Total:</div>
              <div className="text-2xl">{cliks.filter(c=> c.uri === link.url).length}</div>
              
            </div>
            
          </div>
        ))}
      </SectionBox>
    </>
  );
};

export default AnalyticsPage;
