import { MdOutlineAnalytics } from "react-icons/md";
import { TbUserSquare } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

//backend link 
export const api = "https://visualize-dashboard.vercel.app"
export const baseUrl = "http://localhost:5173/analytics";

export const links = [
    { label: "Dashboard", href: "/analytics", icon: MdOutlineAnalytics },
    { label: "Profile", href: "/profile", icon: TbUserSquare },
    { label: "Settings", href: "/settings", icon: IoSettingsOutline },
  ];