"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setUser(res.data.data._id);
      } catch (error: any) {
        console.log("getUser -", error.message);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

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
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <h2>
          {user ? (
            <Link href={`/profile/${user}`}>{`user - ${user}`}</Link>
          ) : (
            "user not found"
          )}
        </h2>
      )}
      <hr />
      <p className="text-4xl">Profile page</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
