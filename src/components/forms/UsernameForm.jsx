"use client";
import { grabUsername } from "@/app/actions/grabUsername";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UsernameFormResults from "../formResults/UsernameFormResults";
import { redirect } from "next/navigation";
import SubmitButton from "../buttons/SubmitButton";

const UsernameForm = ({ desireUsername }) => {
  const [taken, setTaken] = useState(false);

  const handleSubmit = async (formData) => {
    const result = await grabUsername(formData);

    if (result === false) {
      setTaken(true);
    } else {
      setTaken(false);
    }
    if (result) {
      redirect("/account?created=" + formData.get("username"));
    }
  };

  return (
    <form action={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Grab your username
      </h1>
      <p className="text-center mb-6 text-gray-500">Choose your username</p>
      <div className="max-w-xs mx-auto">
        <input
          defaultValue={desireUsername}
          name="username"
          className="block p-2 mx-auto border w-full mb-4 text-center"
          type="text"
          placeholder="username"
        />
        {taken && <UsernameFormResults />}

        <SubmitButton>
          Claim your username <FontAwesomeIcon icon={faArrowRight} />
        </SubmitButton>
      </div>
    </form>
  );
};

export default UsernameForm;
