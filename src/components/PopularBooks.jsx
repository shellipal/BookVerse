import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { googleApiKey, googleBaseUrl } from "../utils";
import axios from "axios";
import BookCard from "./BookCard";

const PopularBooks = () => {
  const [popularBook, setPopularBook] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      setLoading(true);
      const res = await axios.get(
        `${googleBaseUrl}/volumes?q=popular-books&maxResults=8&key=${googleApiKey}`
      );
      const data = res.data;
      setPopularBook(data.items || []);
      setLoading(false);
    };

    fetchPopularBooks();
  }, []);

  return (
    <div className="bg-black min-h-[60vh] py-7">
      <div className="max-w-7xl mx-auto">
        <Heading title={"Popular Books"} desc={"2025 popular books"} />

        <div>
          {loading ? (
            <div className=" min-h-[50vh] flex justify-center items-center h-64 text-white text-xl font-semibold">
              Loading books...
            </div>
          ) : (
            <div className="min-h-[50vh] grid grid-cols-4 gap-6 text-white">
              {popularBook.length === 0 ? (
                <p>No books found</p>
              ) : (
                popularBook.map((popularBook) => (
                  <BookCard key={popularBook.id} book={popularBook} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularBooks;
