"use client";

import SignupForm from "@/features/auth/signup/components/SignupForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div className="bg-linear-to-br from-teal-950 to-teal-400 min-h-screen flex justify-center items-center p-4">
      <div className="rounded-2xl bg-teal-900/60 backdrop-blur-sm w-full max-w-sm overflow-hidden shadow-xl">
        <p className="font-bold bg-linear-to-r from-teal-600 to-teal-300 bg-clip-text text-transparent text-2xl text-center mt-5">
          Register now
        </p>

        <SignupForm />

        <div className="bg-teal-950/70 py-3 text-center">
          <p className="font-semibold text-sm text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/auth/login")}
              className="hover:underline cursor-pointer text-teal-300"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
