import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className=" bg-blue-500  text-white py-2 px-4 w-full  flex justify-center items-center gap-2 disabled:bg-blue-200 disabled:text-gray-200"
      type="submit"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
