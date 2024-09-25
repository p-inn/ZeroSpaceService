import React from "react";

const HamburgerMenu = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <button onClick={toggleMenu} className="p-2 bg-gray-800 text-white">
      ≡
    </button>
  );
};

export default HamburgerMenu;
