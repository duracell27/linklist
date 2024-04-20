'use client'
import React from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {signIn} from 'next-auth/react'

const LoginWithGoogle = () => {

  return (
    <button onClick={()=> signIn('google')} className="bg-white shadow text-center w-full py-4 flex gap-3 justify-center items-center">
      <FontAwesomeIcon icon={faGoogle} className="w-6 h-6" />
      Sign In with Google
    </button>
  );
};

export default LoginWithGoogle;
