"use client";
import React, { useState } from "react";
import SectionBox from "../layout/SectionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faLink,
  faPen,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

const PageLinkForms = ({ page, user }) => {
  const [links, setLinks] = useState(page.links || []);

  const addNewLink = () => {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subTitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  };

  const handleUpload = (e, linkKey) => {
    upload(e, (link) => {
      setLinks((prev) => {
        return prev.map((item) => {
          if (item.key === linkKey) {
            return { ...item, icon: link };
          }
          return item;
        });
      });
    });
  };

  const handleLinkChange = (keyOfLinkToChange, prop, e) =>{
    setLinks((prev) => {
      const newLinks = [...prev]

      newLinks.forEach(link=>{
        if(link.key === keyOfLinkToChange){
          link[prop] = e.target.value
        }
      })
      return [...prev]
    })
  }

  const save = async () => {
    const toastId = toast.loading('saving...')
   await savePageLinks(links)
   toast.dismiss(toastId)
    toast.success('saved')
  };

  const removeLink = (linkKey) =>{
    setLinks((prev) => {
      return prev.filter((link) => link.key!== linkKey);
    });
    toast.success('link removed')
  }
  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
        >
          <FontAwesomeIcon
            className="bg-blue-500 text-white p-1 rounded-full aspect-square"
            icon={faPlus}
          />
          <span>Add new link</span>
        </button>
        <div className="">
          <ReactSortable handle={'.handle'} list={links} setList={setLinks}>
            {links.map((l) => (
              <div
                key={l.key}
                className="mt-8 flex gap-2 items-center customLinks"
              >
                <div className="cursor-pointers mr-2 handle">
                  <FontAwesomeIcon
                    icon={faGripVertical}
                    className="text-gray-500"
                  />
                </div>
                <div className="text-center">
                  <div className="bg-gray-400 p-2 rounded-full inline-block relative aspect-square overflow-hidden">
                    {l.icon && (
                      <Image
                        src={l.icon}
                        alt="linkIcon"
                        className="w-full h-full object-cover rounded-full"
                        width={64}
                        height={64}
                      />
                    )}
                    {!l.icon && <FontAwesomeIcon icon={faLink} />}
                  </div>
                  <div className="">
                    <input
                      id={"icon" + l.key}
                      onChange={(e) => handleUpload(e, l.key)}
                      type="file"
                      className="hidden"
                    />
                    <label
                      htmlFor={"icon" + l.key}
                      className="text-gray-400 mt-2 p-2 flex items-center gap-1 rounded-md border cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPen} />
                      <span>Change</span>{" "}
                    </label>
                  </div>
                  
                </div>
                <div className="grow linksInputs">
                  <label className="input-label">Title: <input className="text-lg text-gray-800 font-normal" value={l.title} onChange={(e)=>handleLinkChange(l.key,'title', e)} type="text" name="" placeholder="title" /> </label>
                  <label className="input-label">SubTitle: <input className="text-lg text-gray-800 font-normal" value={l.subTitle} onChange={(e)=>handleLinkChange(l.key,'subTitle', e)} type="text" name="" placeholder="subTitle (optional)" /> </label>
                  <label className="input-label">Url: <input className="text-lg text-gray-800 font-normal" value={l.url} onChange={(e)=>handleLinkChange(l.key,'url', e)} type="text" name="" placeholder="url" /> </label>
                </div>
                <div className="">
                    <button onClick={()=>removeLink(l.key)} className="bg-gray-300 p-2 aspect-square" type="button">
                      <FontAwesomeIcon icon={faTrash} className="w-5 h-5"/>
                    </button>
                  </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className=" pt-4 mt-4 max-w-[220px] mx-auto">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageLinkForms;
