"use client";
import React, { useState } from "react";
import RadioTogglers from "./formItems/RadioTogglers";
import {
  faCloudArrowUp,
  faImage,
  faPalette,
  faPen,
  faSave,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";
import SectionBox from "../layout/SectionBox";
import { upload } from "@/libs/upload";

const PageSettingsForm = ({ page, user }) => {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);

  const saveBaseSettings = async (formData) => {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved");
    } else {
      toast.error("Something went wrong");
    }
  };



  const handleCoverImageChange = async (e) => {
    await upload(e, (link) => {
      setBgImage(link);
    });
  };

  const handleAvatarImageChange = async (e) => {
    await upload(e, (link) => {
      setAvatar(link);
    });
  };

  return (
    <div className=" bioIn">
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            className="py-4 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div className="">
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  { value: "color", icon: faPalette, label: "Color" },
                  { value: "image", icon: faImage, label: "Image" },
                ]}
                onChange={(val) => setBgType(val)}
              />

              {bgType === "color" && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="">
                    <label
                      htmlFor=""
                      className="flex  gap-2 justify-center items-center"
                    >
                      <span>Backgroun color: </span>
                      <input
                        type="color"
                        name="bgColor"
                        onChange={(e) => setBgColor(e.target.value)}
                        defaultValue={page.bgColor}
                      />
                    </label>
                  </div>
                </div>
              )}
              {bgType === "image" && (
                <div className=" flex justify-center">
                  <label
                    type="button"
                    className="bg-white shadow px-4 py-2 mt-2 flex gap-2 items-center text-gray-600 cursor-pointer"
                  >
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleCoverImageChange}
                    />
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    Change Image
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center -mb-12 ">
            <div className="relative -top-16 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                <Image
                  src={avatar}
                  alt="userAvatart"
                  height={128}
                  width={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <label
                htmlFor="avatarInput"
                className="absolute bottom-0 right-0 cursor-pointer bg-white p-1 rounded-full shadow shadow-black/50"
              >
                <FontAwesomeIcon className="w-6 h-4" icon={faPen} />
              </label>
              <input
                id="avatarInput"
                className="hidden"
                onChange={handleAvatarImageChange}
                type="file"
              />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
          </div>
          <div className="p-0 accountInputs">
            <label htmlFor="nameIn">Display name</label>
            <input
              name="displayName"
              defaultValue={page?.displayName}
              id="nameIn"
              type="text"
              placeholder="John Doe"
            />
            <label htmlFor="locationIn">Location</label>
            <input
              defaultValue={page.location}
              name="location"
              id="locationIn"
              type="text"
              placeholder="Lviv"
            />
            <label htmlFor="bioIn">Bio</label>
            <textarea
              defaultValue={page.bio}
              id="bioIn"
              name="bio"
              placeholder="Your bio ..."
            ></textarea>
            <div className="max-w-[220px] mx-auto">
              <SubmitButton>
                <FontAwesomeIcon icon={faSave} /> <span>Save</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
};

export default PageSettingsForm;
