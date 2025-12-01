import { FaRegFile, FaRegMoon, FaRegSun } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import LogoutModal from "./Modals/LogoutModal";
import { toggleTheme } from "../utils/themeService";

export default function Header({ loggedIn }: { loggedIn: boolean }) {
  const [modal, setModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  const handleLogout = async () => {
    setModal(false);
    const logout = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
      {},
      { withCredentials: true }
    );
    toast.success(logout.data.message);
    router.replace("/auth/login");
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 backdrop-blur-xl border-b border-b-gray-200 dark:border-b-gray-600">
      <nav className="flex items-center justify-between px-10 py-3">
        <div className="flex items-center gap-2">
          <div className="text-2xl text-white dark:text-black bg-teal-600 rounded-lg p-2 w-fit">
            <FaRegFile />
          </div>
          <h1 className="text-teal-600 text-2xl font-semibold">Dot Note</h1>
        </div>

        <div className="flex gap-2">
          {/* Theme Button */}
          <button
            onClick={handleToggleTheme}
            className="rounded dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 p-4 duration-200 transition-colors"
          >
            {theme === "dark" ? <FaRegSun /> : <FaRegMoon />}
          </button>

          {loggedIn ? (
            <button
              onClick={() => setModal(true)}
              className="rounded dark:text-white hover:bg-red-100 hover:text-red-600 p-3 duration-200 transition-colors flex items-center gap-2"
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="rounded dark:text-white hover:bg-teal-100 hover:text-teal-600 p-3 duration-200 transition-colors flex items-center gap-2"
            >
              <FiUser /> Login
            </button>
          )}
        </div>
      </nav>

      {modal && (
        <LogoutModal
          closeModal={() => setModal(false)}
          handleLogout={handleLogout}
        />
      )}
    </header>
  );
}
