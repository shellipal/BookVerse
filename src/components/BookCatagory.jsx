import axios from "axios";
import React, { useEffect, useState } from "react";
import { googleApiKey, googleBaseUrl } from "../utils";
import { Heart, Search } from "lucide-react";
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

  console.log(books);

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
    <div className="bg-black min-h-[60vh] py-7">
      <div className="max-w-7xl mx-auto">
        //buttons
        <div className="grid grid-cols-6 gap-8">
          {catagoryButtons.map((button) => (
            <button
              onClick={() => handleClick(button.value)}
              className={`border-2 hover:cursor-pointer border-blue-700 text-white px-3 py-2 rounded-lg text-lg font-semibold ${
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
            <div className=" min-h-[50vh] flex justify-center items-center h-64 text-white text-xl font-semibold">
              Loading books...
            </div>
          ) : (
            <div className="min-h-[50vh] grid grid-cols-4 gap-6 text-white">
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
