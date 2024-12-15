import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../../global/SearchBar";
import { FiSearch } from "react-icons/fi";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineNightsStay } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {  logoutUser } from "@/services/Logout";
import { useDispatch } from "react-redux";
import { clearUserPreferences } from "@/services/CookieManager";
import { logout } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const handleOnLogout = async()=>{
     const response = await logoutUser()
     if(response){
      clearUserPreferences()
      dispatch(logout())
      toast.success(response.data.message)
      navigate('/login')
     }
  }
  return (
    <header
      className="w-full bg-gradient-to-b from-blue-700 to-blue-700
    shadow-md px-4 py-3 flex items-center justify-end lg:justify-between lg:rounded-md "
    >
      {/* Left: Brand Name */}
      <div className="hidden lg:flex text-lg font-bold text-white">
        Dashboard
      </div>

      {/* Right: Two Divisions */}
      <div className="flex items-center space-x-4">
        {/* Division 1: Search Bar (Responsive) */}
        <div
          className={`relative ${
            showSearch ? "block" : "hidden"
          } md:block transition-all`}
        >
          {/* <input
            type="text"
            placeholder="Search..."
            className="w-40 md:w-64 px-4 py-2 text-sm bg-gray-100  text-gray-800  rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
          /> */}
          <SearchBar
            customStyles="outline-none "
            icon={
              <>
                <FiSearch size={18} />
              </>
            }
          />
        </div>
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="p-2 hidden rounded-full text-white dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Search"
        >
          <FaSearch size={18} />
        </button>

        {/* Division 2: Icons */}
        <div className="flex items-center space-x-4">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-white hover:bg-gray-900 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <MdOutlineLightMode size={18} />
            ) : (
              <MdOutlineNightsStay size={18} />
            )}
          </button>

          {/* Notification Icon */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded-full text-white hover:bg-gray-900 transition"
                  aria-label="Notifications"
                >
                  <MdNotificationsNone size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white">
                <p>Notification</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Logout Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded-full text-white hover:bg-gray-900 transition"
                  aria-label="Logout"
                  onClick={()=>handleOnLogout()}
                >
                  <AiOutlineLogout size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
