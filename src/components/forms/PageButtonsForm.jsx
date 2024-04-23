"use client";
import React, { useState } from "react";
import SectionBox from "../layout/SectionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGripVertical,
  faMobile,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
const allButtons = [
  {
    key: "email",
    label: "e-mail",
    icon: faEnvelope,
    placeholder: "example@com.ua",
  },
  { key: "mobile", label: "mobile", icon: faMobile, placeholder: "+380 ..." },
  {
    key: "instagram",
    label: "instagram",
    icon: faInstagram,
    placeholder: "https://instagram.com/",
  },
  {
    key: "facebook",
    label: "facebook",
    icon: faFacebook,
    placeholder: "https://facebook.com/",
  },
  {
    key: "discord",
    label: "discord",
    icon: faDiscord,
    placeholder: "https://discord.com/",
  },
  {
    key: "tiktok",
    label: "tiktok",
    icon: faTiktok,
    placeholder: "https://tiktok.com/",
  },
  {
    key: "youtube",
    label: "youtube",
    icon: faYoutube,
    placeholder: "https://youtube.com/",
  },
  {
    key: "whatsapp",
    label: "whatsapp",
    icon: faWhatsapp,
    placeholder: "https://whatsapp.com/",
  },
  {
    key: "github",
    label: "github",
    icon: faGithub,
    placeholder: "https://github.com/",
  },
];

const PageButtonsForm = ({ page, user }) => {
  const pageSavedButtonKeys = Object.keys(page.buttons);
  const pageSavedButtons = pageSavedButtonKeys.map((key) =>
    allButtons.find((b) => b.key === key)
  );

  const [activeButtons, setActiveButtons] = useState(pageSavedButtons);

  const addButtonToProfile = (button) => {
    setActiveButtons((prev) => {
      return [...prev, button];
    });
  };

  const avaliableButtons = allButtons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );

  const saveButtons = async (formData) => {
    await savePageButtons(formData);
    toast.success("settings saved");
  };

  const removeButton = (btn) => {
    setActiveButtons((prev) => {
      return prev.filter((button) => button.key !== btn.key);
    });
  };

  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <ReactSortable handle=".handle" list={activeButtons} setList={setActiveButtons}>
          {activeButtons.map((b) => (
            <div key={b.key} className="mb-4 flex p-0 p  bg-gray-300 items-center buttonsList ">
              <div className="flex gap-2 items-center px-2 text-nowrap handle">
                <FontAwesomeIcon
                  className="cursor-pointer text-gray-500"
                  icon={faGripVertical}
                />
                <FontAwesomeIcon icon={b.icon} /> <span>{b.label}: </span>
              </div>
              <input
                type="text"
                name={b.key}
                defaultValue={page.buttons[b.key]}
                placeholder={b.placeholder}
                style={{ marginBottom: "0" }}
              />
              <button
                onClick={() => removeButton(b)}
                className="p-2 px-3 cursor-pointer"
                type="button"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 border-y py-4">
          {avaliableButtons.map((b) => (
            <button
              type="button"
              onClick={() => addButtonToProfile(b)}
              key={b.key}
              className="flex gap-1 p-2 bg-gray-300 items-center"
            >
              <FontAwesomeIcon icon={b.icon} />
              <span className="capitalize">{b.label}</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ))}
        </div>
        <div className="max-w-[220px] mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageButtonsForm;
