import { allButtons } from "@/components/forms/PageButtonsForm";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { GetBucketInventoryConfigurationOutputFilterSensitiveLog } from "@aws-sdk/client-s3";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { faEnvelope, faMobile } from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const icons = {
  email: faEnvelope,
  mobile: faMobile,
  facebook: faFacebook,
  instagram: faInstagram,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
};

const buttonLink = (key, value) =>{
    if(key === "mobile"){
        return `tel:${value}`
    }
    if(key === "email"){
        return `mailto:${value}`
    }
    return value
}

const UserPage = async ({ params }) => {
  const uri = params.uri;
  mongoose.connect(process.env.MONGODB_CONNECT_URL);
  const page = await Page.findOne({ uri: uri });
  const user = await User.findOne({ email: page.owner });

  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <div
        className="h-36 bg-cover bg-center"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          src={user.image}
          className="rounded-full w-full h-full object-cover"
          alt="userlogo"
          width={256}
          height={256}
        />
      </div>

      <h2 className="text-xl text-center mb-1">{page.displayName}</h2>
      <h3 className="text-lg flex gap-2 justify-center text-white/70 items-center">
        <FontAwesomeIcon className="h-5 " icon={faLocationDot} />
        {page.location}
      </h3>
      <div className="max-w-xs mx-auto text-center my-3">
        <p>{page.bio}</p>
      </div>
      <div className="flex gap-2 justify-center items-center mt-4 pb-4">
        {Object.keys(page.buttons).map((buttonKey, index) => (
          <Link
            key={index}
            href={buttonLink(buttonKey, page.buttons[buttonKey])}
            className="rounded-full border bg-white text-blue-950  p-3 flex justify-center items-center gap-2"
          >
            <FontAwesomeIcon icon={icons[buttonKey]} className="w-6 h-6" />
          </Link>
        ))}
      </div>
      <div className="max-w-xl mx-auto grid md:grid-cols-2 gap-12 p-4 px-8">
        {page.links.map((link, index) => (
          <Link key={index} href={link.url} className="bg-blue-900 p-2 flex">
            <div className="bg-blue-700 flex justify-center items-center aspect-square p-1 relative -left-10 w-[64px] h-16 overflow-hidden ">
              {link.icon && (
                <Image
                  className="w-full h-full object-cover"
                  src={link.icon}
                  width={64}
                  height={64}
                />
              )}
              {!link.icon && (
                <FontAwesomeIcon className="w-8 h-8" icon={faLink} />
              )}
            </div>
            <div className="-ml-8 flex items-center">
              <div className="">
                <h3>{link.title}</h3>
                <p className="text-white/50 line-clamp-1 max-w-[200px]">{link.subTitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
