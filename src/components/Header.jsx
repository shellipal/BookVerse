import { Heart, Search, X } from "lucide-react";
import React, { useState } from "react";
import { useBookStore } from "../store/bookStore";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const { bookmarks } = useBookStore();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

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
          {showSearch ? (
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-transparent outline-none text-white w-48"
              />
              <button onClick={handleSearchToggle}>
                <X size={20} className="text-gray-400 hover:text-red-400" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSearchToggle}
              className="bg-blue-700 px-3 py-2 rounded-lg flex justify-center items-center hover:bg-blue-600 transition"
            >
              <Search size={20} />
            </button>
          )}

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
