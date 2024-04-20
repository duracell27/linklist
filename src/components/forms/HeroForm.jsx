"use client";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HeroForm = ({ user }) => {

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector("input");
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push("/account?desireUsername=" + username);
      } else {
        window.localStorage.setItem("desireUsername", username);
        await signIn("google");
      }
    }
  };

  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desireUsername")
    ) {
      const username = window.localStorage.getItem("desireUsername");
      window.localStorage.removeItem("desireUsername");
      redirect("/account?desireUsername=" + username);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg shadow-gray-700/20"
    >
      <span className="bg-white py-4 pl-4">linklist.to/</span>
      <input type="text" placeholder="username" className="py-4" />
      <button type="submit" className="bg-blue-500 text-white py-4 px-6">
        Join for Free
      </button>
    </form>
  );
};

export default HeroForm;
