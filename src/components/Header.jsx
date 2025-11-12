import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, Search, X, Menu, Home, Info, Phone } from "lucide-react";
import { useBookStore } from "../store/bookStore";

// Responsive header with a right-side slide-in menu for mobile
export default function Header() {
  const { bookmarks } = useBookStore();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearchToggle = () => setShowSearch((s) => !s);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
      setDrawerOpen(false);
    }
  };

  const navItems = [
    { title: "Home", to: "/", icon: <Home size={18} /> },
    { title: "About", to: "/about", icon: <Info size={18} /> },
    { title: "Contact", to: "/contact", icon: <Phone size={18} /> },
    {
      title: "Wishlist",
      to: "/wishlist",
      icon: <Heart size={18} />,
      badge: bookmarks.length,
    },
  ];

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <h1 className="text-2xl md:text-3xl font-bold">
              Book <span className="font-normal">verse</span>
            </h1>
          </Link>
        </div>

        {/* Desktop nav - visible on md+ */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <Link to="/">
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link to="/about">
              <li className="cursor-pointer">About</li>
            </Link>
            <Link to="/contact">
              <li className="cursor-pointer">Contact</li>
            </Link>
          </ul>
        </nav>

        {/* Actions (search + wishlist) - desktop */}
        <div className="hidden md:flex items-center gap-3">
          {showSearch ? (
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-transparent outline-none text-white w-52"
              />
              <button onClick={handleSearchToggle} aria-label="close-search">
                <X size={18} className="text-gray-400 hover:text-red-400" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSearchToggle}
              className="bg-blue-700 px-3 py-2 rounded-lg flex justify-center items-center hover:bg-blue-600 transition"
              aria-label="open-search"
            >
              <Search size={18} />
            </button>
          )}

          <Link to="/wishlist">
            <button className="relative bg-blue-700 p-2 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
              <Heart size={18} />
              <span className="sr-only">Wishlist</span>
              <span className="text-xs absolute h-4 w-4 top-0 right-0 bg-red-500 rounded-full flex items-center justify-center">
                {bookmarks.length}
              </span>
            </button>
          </Link>
        </div>

        {/* Mobile: right-side menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-lg bg-blue-700"
            aria-label="open-menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Overlay + Drawer (mobile) */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 max-w-full z-50 transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } bg-black px-4 py-6`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch((s) => !s)}
              className="p-2 rounded-md bg-gray-800"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="close-menu"
              className="p-2 rounded-md bg-gray-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search field (inside drawer) */}
        {showSearch && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-gray-900 rounded-md p-2 outline-none"
            />
          </div>
        )}

        {/* Nav items */}
        <nav>
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.to}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-900"
                >
                  <span className="flex items-center">{item.icon}</span>
                  <span className="flex-1">{item.title}</span>
                  {item.badge !== undefined && (
                    <span className="text-xs bg-red-500 rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer actions */}
        <div className="mt-auto pt-6">
          <div className="border-t border-gray-800 pt-4">
            <p className="text-sm text-gray-400">Logged out</p>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 px-3 py-2 rounded-md bg-blue-700">
                Sign in
              </button>
              <button className="flex-1 px-3 py-2 rounded-md bg-transparent border border-gray-700">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}
