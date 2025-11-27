"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineLockClosed } from "react-icons/hi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
  register: any;
  errors?: any;
  name: string;
  placeholder: string;
  onChange?: (value: string) => void;
};

export default function PasswordInput({
  register,
  errors,
  name,
  placeholder,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        {...register(name)}
        onChange={(e) => {
          register(name).onChange(e);
          onChange?.(e.target.value);
        }}
        className="w-full border rounded-lg border-gray-700 bg-gray-800/70 p-2 px-8 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white transition-shadow"
        placeholder={placeholder}
      />

      <HiOutlineLockClosed className="absolute top-3 left-2 text-teal-400" />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-3 text-teal-400"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>

      {errors && errors[name] && (
        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-red-600 text-sm ml-2 font-semibold"
        >
          {errors[name]?.message}
        </motion.p>
      )}
    </div>
  );
}
