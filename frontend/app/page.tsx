"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
        withCredentials: true,
      });

      if (res.status === 401) {
        router.replace("/auth/login");
      }
    };

    checkLogin();
  }, []);

  const logout = async () => {
    const logout = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/logout`
    );
    toast.success(logout.data.message);
    router.replace("/auth/login");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={logout}
        className="bg-red-500 font-semibold text-white rounded-lg p-2 hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
