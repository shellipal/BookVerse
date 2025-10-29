import React from "react";
import { useBookStore } from "../store/bookStore";
import BookCard from "../components/BookCard";

const WishList = () => {
  const { bookmarks } = useBookStore();
  console.log(bookmarks);
  return (
    <div className=" min-h-screen py-7">
      <div className="max-w-7xl mx-auto">
        <div className="min-h-[50vh] grid grid-cols-4 gap-6 text-white">
          {bookmarks.length === 0 ? (
            <p className="text-center col-span-4 text-gray-400">
              No books found
            </p>
          ) : (
            bookmarks.map((book) => <BookCard key={book.id} book={book} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
