"use client";

import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema, AuthSchemaType } from "@/features/auth/schemas/authSchema";

import { MdOutlineEmail } from "react-icons/md";
import TextInput from "../../components/TextInput";
import PasswordInput from "../../components/PasswordInput";
import { TiUserOutline } from "react-icons/ti";
import StrongPassword from "./StrongPassword";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PasswordState } from "../types/PasswordState";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] =
    useState<PasswordState>("Very Weak");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  const handleSignup = async (data: AuthSchemaType) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        data,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      router.replace("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registeration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleSignup)}
      className="space-y-4 my-5 px-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TextInput
        icon={<TiUserOutline />}
        register={register}
        name="name"
        errors={errors}
        placeholder="Full Name"
        type="text"
      />

      <TextInput
        icon={<MdOutlineEmail />}
        register={register}
        name="email"
        errors={errors}
        placeholder="Email Address"
        type="email"
      />

      <PasswordInput
        register={register}
        name="password"
        placeholder="Password"
        onChange={setPassword}
        errors={errors}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <StrongPassword
          password={password}
          passwordState={passwordState}
          setPasswordState={setPasswordState}
        />
      </motion.div>

      <button
        type="submit"
        disabled={loading || passwordState !== "Very Strong"}
        className="flex justify-center w-full font-semibold text-white shadow-md rounded-lg p-2 bg-linear-to-bl from-teal-600 to-teal-400 disabled:opacity-85 hover:opacity-85 not-disabled:active:scale-[0.98] transition-all"
      >
        {loading ? <LoadingSpinner /> : "Signup"}
      </button>
    </motion.form>
  );
}
