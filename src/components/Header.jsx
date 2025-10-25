import { Heart, Search } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <h1 className="text-3xl font-bold">
          Book <span>verse</span>
        </h1>
        <ul className="flex items-center justify-between gap-8">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="flex gap-2">
          <button className="bg-blue-700 px-4 py-2 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
            <Search size={20} />
          </button>
          <button className="bg-blue-700 px-4 py-2 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
