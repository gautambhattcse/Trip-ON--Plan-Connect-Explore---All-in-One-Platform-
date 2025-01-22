// import React, { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";

// function Header() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [openDailog, setOpenDailog] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     console.log(user);
//   }, []);
//   const login = useGoogleLogin({
//     onSuccess: (codeResp) => GetUserProfile(codeResp),
//     onError: (error) => console.log(error),
//   });
//   const GetUserProfile = (tokenInfo) => {
//     axios
//       .get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenInfo?.access_token}`,
//             Accept: "Application/json",
//           },
//         }
//       )
//       .then((resp) => {
//         console.log(resp);
//         localStorage.setItem("user", JSON.stringify(resp.data));
//         setOpenDailog(false);
//         window.location.reload();
//       });
//   };

//   return (
//     <header className="p-3 shadow-sm flex flex-wrap justify-between items-center px-4 md:px-5">
//       {/* Logo */}
//       <div className="flex items-center">
//         <a href="/" >
//           <img
//             src="/logo.png"
//             alt="Logo"
//             className="h-8 w-auto sm:h-10 md:h-12"
//           />
//         </a>
//       </div>
//       <div className="mt-2 md:mt-0">
//         {user ? (
//           <div className="flex items-center gap-3">
//             <a href="/my-trips">
//               <Button variant="outline" className="rounded-full">
//                 My Trips
//               </Button>
//             </a>
//             <a href="/">
//               <Button variant="outline" className="rounded-full">
//                 Trip-Connect
//               </Button>
//             </a>

//             <Popover>
//               <PopoverTrigger>
//                 <img
//                   src={user?.picture}
//                   className="h-[35px] w-[35px] rounded-full"
//                 />
//               </PopoverTrigger>
//               <PopoverContent>
//                 <h2
//                   onClick={() => {
//                     googleLogout();
//                     localStorage.clear();
//                     window.location.reload();
//                   }}
//                   className="cursor-pointer"
//                 >
//                   Logout
//                 </h2>
//               </PopoverContent>
//             </Popover>
//           </div>
//         ) : (
//           <Button size="sm md:default" onClick={() => setOpenDailog(true)}>
//             Sign In
//           </Button>
//         )}
//       </div>
//       <Dialog open={openDailog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <DialogTitle>
//                 <img src="/logo.png" alt="logo" />
//               </DialogTitle>
//               <div>
//                 <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
//               </div>
//               <p>Sign in to the App with Google authentication securely</p>
//               <Button
//                 disabled={loading}
//                 onClick={login}
//                 className="w-full mt-5 flex gap-4 items-center"
//               >
//                 <FcGoogle className="h-7 w-7" />
//                 Sign In With Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </header>
//   );
// }

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogin = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  // Use the `useGoogleLogin` hook
  const login = useGoogleLogin({
    onSuccess: (response) => handleLoginSuccess(response),
    onError: (error) => console.error("Login failed", error),
  });

  const handleLoginSuccess = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        const userProfile = response.data;
        localStorage.setItem("user", JSON.stringify(userProfile));
        setUser(userProfile);
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" className="h-8" alt="Logo" />
        </a>

        {/* User Profile and Dropdown */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded={dropdownOpen}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 p-1 rounded-full ring-2 ring-[#35b67c] dark:ring-[#35b67c]"
                  src={user?.picture}
                  referrerPolicy="no-referrer"
                  alt="User"
                />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 z-50 dropdown-open"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user?.name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {user?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/create-trip"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Create Trip
                      </a>
                    </li>
                    <li>
                      <a
                        href="/my-trips"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        My Trips
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="text-sm text-gray-900 hover:underline dark:text-white"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Navbar Links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Login Dialog */}
      {dialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeDialog}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-md w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Sign In</h2>
            <p className="text-sm mb-6">Sign in using your Google account.</p>
            <button
              onClick={login}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In with Google
            </button>
            <button
              onClick={closeDialog}
              className="mt-4 w-full py-2 text-sm text-gray-600 hover:underline focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
