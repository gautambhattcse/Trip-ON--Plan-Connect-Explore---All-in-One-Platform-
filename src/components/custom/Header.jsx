import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <header className="p-3 shadow-sm flex flex-wrap justify-between items-center px-4 md:px-5">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-8 w-auto sm:h-10 md:h-12"
        />
      </div>
      <div className="mt-2 md:mt-0">
        <Button size="sm md:default">Sign In</Button>
      </div>
    </header>
  );
}

export default Header;
