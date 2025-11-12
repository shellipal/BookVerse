import axios from "axios";
import React, { useEffect, useState } from "react";
import { googleApiKey, googleBaseUrl } from "../utils";
import BookCard from "./BookCard";

const catagoryButtons = [
  { label: "Trending", value: "trending-books" },
  { label: "Best Sellers", value: "best-sellers" },
  { label: "Fiction", value: "fiction-fantasy" },
  { label: "Science", value: "science-technology" },
  { label: "Motivation", value: "motivation" },
  { label: "History", value: "history-culture" },
];

const BookCatagory = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryValue, setQueryValue] = useState("trending-books");

  const handleClick = (value) => {
    setQueryValue(value);
  };

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      setLoading(true);
      const res = await axios.get(
        `${googleBaseUrl}/volumes?q=${queryValue}&maxResults=8&key=${googleApiKey}`
      );
      const data = res.data;
      setBooks(data.items || []);
      setLoading(false);
    };

    fetchCategoryBooks();
  }, [queryValue]);

  return (
    <div className="bg-black min-h-[60vh]  px-3 md:px-0  py-7">
      <div className="max-w-7xl mx-auto">
        //buttons
        <div className="flex gap-4 px-2 py-2 snap-x snap-mandatory overflow-x-auto scrollbar-hide md:grid md:grid-cols-6 md:gap-6 md:overflow-x-visible md:snap-none">
          {catagoryButtons.map((button) => (
            <button
              key={button.value}
              onClick={() => handleClick(button.value)}
              className={`flex-shrink-0 border-2 border-blue-700 text-white px-4 py-2 rounded-lg text-lg font-semibold snap-center transition-colors duration-200 w-max md:w-full ${
                queryValue === button.value
                  ? "bg-blue-700"
                  : "hover:bg-blue-700"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
        <div>
          {loading ? (
            <div className=" min-h-[50vh] flex justify-center items-center h-64 text-gray-500 text-xl font-semibold">
              Loading books...
            </div>
          ) : (
            <div className="min-h-[50vh] grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-white">
              {books.length === 0 ? (
                <p className="text-center col-span-4 text-gray-400">
                  No books found
                </p>
              ) : (
                books.map((book) => <BookCard key={book.id} book={book} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCatagory;
