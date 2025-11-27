import { SetStateAction, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { passwordRules } from "../../schemas/rules";
import { motion, AnimatePresence } from "framer-motion";
import { PasswordState } from "../types/PasswordState";

export default function StrongPassword({
  password,
  setPasswordState,
  passwordState,
}: {
  password: string;
  setPasswordState: React.Dispatch<SetStateAction<PasswordState>>;
  passwordState: string;
}) {
  const checkList = [
    { label: "At least 6 characters", test: passwordRules.length },
    { label: "Contains uppercase letter", test: passwordRules.upper },
    { label: "Contains lowercase letter", test: passwordRules.lower },
    { label: "Contains a number", test: passwordRules.number },
    { label: "Contains special character", test: passwordRules.special },
  ];

  const passedCount = checkList.filter((c) => c.test(password)).length;

  useEffect(() => {
    if (passedCount <= 1) setPasswordState("Very Weak");
    else if (passedCount === 2) setPasswordState("Weak");
    else if (passedCount === 3) setPasswordState("Fair");
    else if (passedCount === 4) setPasswordState("Strong");
    else setPasswordState("Very Strong");
  }, [password]);

  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between text-gray-400">
        <p>Password strength</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={passwordState}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            {passwordState}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex justify-between gap-1">
        {[0, 1, 2, 3, 4].map((i) => {
          const active = i < passedCount;
          return (
            <motion.div
              key={i}
              animate={{
                scale: active ? 1.1 : 1,
                backgroundColor: active ? "#14b8a6" : "#374151",
              }}
              transition={{ duration: 0.25 }}
              className="w-full h-1 rounded-full"
            />
          );
        })}
      </div>

      <div className="font-semibold">
        {checkList.map((c) => {
          const passed = c.test(password);

          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2 ${
                passed ? "text-teal-600" : "text-red-700"
              }`}
            >
              {passed ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 250 }}
                >
                  <FaCheck />
                </motion.span>
              ) : (
                <CgClose />
              )}

              <p>{c.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
