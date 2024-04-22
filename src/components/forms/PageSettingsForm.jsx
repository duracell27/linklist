"use client";
import React, { useState } from "react";
import RadioTogglers from "./formItems/RadioTogglers";
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";

const PageSettingsForm = ({ page, user }) => {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);

  const saveBaseSettings = async (formData) => {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleFileChange = (e)=>{
    const file = e.target.files?.[0]
    if(file){
        const data = new FormData
        data.set('file', file)

        fetch('/api/upload', {
            method: 'POST',
            body: data
        }).then(response=>{
            response.json().then(link=>{
                setBgImage(link)
            })
        })
    }
  }
  return (
    <div className="-m-4 bioIn">
      <form action={saveBaseSettings}>
        <div
          className="py-16 flex justify-center items-center bg-cover bg-center"
          style={
            bgType === 'color'? { backgroundColor: bgColor } : { backgroundImage: `url(${bgImage})` }
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
                <label type="button" className="bg-white shadow px-4 py-2 mt-2">
                    <input type="hidden" name="bgImage" value={bgImage} />
                  <input type="file" className="hidden" onChange={handleFileChange} />
                  Change Image
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center -mb-10 ">
          <Image
            src={user?.image}
            alt="userAvatart"
            height={128}
            width={128}
            className="rounded-full relative -top-8 border-4 border-white shadow-lg shadow-black/50"
          />
        </div>
        <div className="p-4 accountInputs">
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
          <div className="max-w-[200px] mx-auto">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} /> <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PageSettingsForm;
