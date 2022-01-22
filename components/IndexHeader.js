import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import HeaderLink from "../components/HeaderLink";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function IndexHeader() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  // after mounting, we have access to theme
  useEffect(() => setMounted(true), []);

  return (
    <header
      className='sticky top-0 z-50 flex items-center justify-around 
            bg-white dark:bg-gray-700 px-3 py-1.5 focus-within:shadow-lg'>
      <div className='flex items-center space-x-6'>
        <div className='flex items-end'>
          <h1 className='text-xl font-semibold hidden sm:inline-flex'>
            Linked
          </h1>
          {mounted && (
            <svg
              className={`w-8 h-8 ${
                resolvedTheme === "dark" ? "text-white" : "text-blue-600"
              }`}
              viewBox='2 0 24 24'>
              <path
                fill='currentColor'
                d='M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z'
              />
            </svg>
          )}
        </div>
        <div>
          <SearchRoundedIcon />
          <input
            type='search'
            name='search'
            id='search'
            placeholder='Search'
            className='rounded-md focus:outline-none px-2 py-1
              text-sm hidden md:inline-flex bg-transparent
            dark:placeholder-white/75 flex-grow'
          />
        </div>
      </div>

      <div className='flex items-center space-x-6'>
        <HeaderLink Icon={HomeRoundedIcon} text='Home' feed active />
        <HeaderLink Icon={GroupIcon} text='My Network' feed />
        <HeaderLink Icon={BusinessCenterIcon} text='Jobs' feed hidden />
        <HeaderLink Icon={ChatIcon} text='Messaging' feed />
        <HeaderLink Icon={NotificationsIcon} text='Notifications' feed />
        <HeaderLink Icon={Avatar} text='Me' feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text='Work' feed hidden />

        {/* Dark mode toggled */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5
                    rounded-full h-6 w-12 cursor-pointer flex-shrink-0
                    relative ${
                      resolvedTheme === "dark" ? "justify-end" : "justify-start"
                    }`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }>
            <span className='absolute left-0'>🌜</span>
            <motion.div
              className={`w-5 h-5 bg-white rounded-full z-40`}
              layout
              transition={spring}
            />
            <span className='absolute right-0.5'>🌞</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default IndexHeader;
