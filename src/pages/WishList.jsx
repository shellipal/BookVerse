import React from "react";
import { useBookStore } from "../store/bookStore";
import BookCard from "../components/BookCard";
import Heading from "../components/Heading";
import { Link } from "react-router";

const WishList = () => {
  const { bookmarks } = useBookStore();
  console.log(bookmarks);
  return (
    <div className="bg-black min-h-[100vh] px-3 md:px-0 py-7">
      <div className="max-w-7xl mx-auto border-t border-gray-600 mt-5 pt-5">
        <Heading title="Wishlist" desc="Your favorite books" />

        <div>
          <div className="min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-white">
            {bookmarks.length === 0 ? (
              <div>
                <Link to={`/`}>
                  <button className="bg-blue-700 text-white px-3 py-1 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
                    Explore Books
                  </button>
                </Link>
                <p>You don't have any books in wishlist!</p>
              </div>
            ) : (
              bookmarks.map((b) => <BookCard key={b.id} book={b} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
