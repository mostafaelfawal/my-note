"use client";
import { motion } from "framer-motion";

type Props = {
  icon: React.ReactNode;
  register: any;
  name: string;
  errors: any;
  placeholder: string;
  type?: string;
};

export default function TextInput({
  icon,
  register,
  name,
  errors,
  placeholder,
  type = "text",
}: Props) {
  return (
    <div className="relative">
      <input
        type={type}
        {...register(name)}
        className="w-full border rounded-lg border-gray-700 bg-gray-800/70 p-2 pl-8 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white transition-shadow"
        placeholder={placeholder}
      />
      <span className="absolute left-2 top-3 text-teal-400">{icon}</span>

      {errors[name] && (
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
