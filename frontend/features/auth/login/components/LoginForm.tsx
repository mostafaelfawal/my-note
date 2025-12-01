"use client";

import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema, AuthSchemaType } from "@/features/auth/schemas/authSchema";
import { motion } from "framer-motion";

import TextInput from "../../components/TextInput";
import PasswordInput from "../../components/PasswordInput";
import { MdOutlineEmail } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  const handleLogin = async (data: AuthSchemaType) => {
    setLoading(true);
    console.log(process.env.NEXT_PUBLIC_API_URL)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        data,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      router.replace("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleLogin)}
      className="space-y-4 my-5 px-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
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
        errors={errors}
        placeholder="Password"
      />

      <button
        type="submit"
        disabled={loading}
        className="flex justify-center w-full font-semibold text-white shadow-md rounded-lg p-2 bg-linear-to-bl from-teal-600 to-teal-400 disabled:opacity-85 hover:opacity-85 not-disabled:active:scale-[0.98] transition-all"
      >
        {loading ? <LoadingSpinner /> : "Login"}
      </button>
    </motion.form>
  );
}
