import { Heart, Search } from "lucide-react";
import React from "react";
import { useBookStore } from "../store/bookStore";
import { Link } from "react-router";

const Header = () => {
  const { bookmarks } = useBookStore();

  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <h1 className="text-3xl font-bold">
          Book <span>verse</span>
        </h1>
        <ul className="flex items-center justify-between gap-8">
          <Link to="/">
            <li>Home</li>
          </Link>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="flex gap-2">
          <button className="bg-blue-700 px-4 py-2 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
            <Search size={20} />
          </button>

          <Link to="/wishlist">
            <button className="relative bg-blue-700 p-2 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
              <Heart size={20} />
              <span className="text-xs absolute h-4 w-4 top-1 right-1 bg-red-500 rounded-full flex items-center justify-center">
                {bookmarks.length}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
