"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ProfilePage = ({ params }: any) => {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout seccess -", response.data);
      toast.success("Logout success");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed -", error.messge);
      toast.error(error.messge);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
