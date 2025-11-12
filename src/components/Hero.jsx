import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { googleApiKey, googleBaseUrl } from "../utils";
import axios from "axios";
import { useBookStore } from "../store/bookStore";
import { Link } from "react-router";

const Hero = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState([]);
  const { bookmarks, toggleBookmark } = useBookStore();
  const isBookmarked = bookmarks.some((b) => b.id === book.id);

  const handleBookMark = () => {
    toggleBookmark(book);
  };

  useEffect(() => {
    const fatchingBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${googleBaseUrl}/volumes?q=programmingBooks&maxResults=8&key=${googleApiKey}`
        );

        const data = res.data;
        setBooks(data.items || []);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    };

    fatchingBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      const randomIndex = Math.floor(Math.random() * books.length);
      setBook(books[randomIndex]);
    }
  }, [books]);

  if (loading)
    return (
      <div className="h-[60vh] bg-black text-gray-500 font-bold flex items-center justify-center text-5xl">
        Loading...
      </div>
    );

  return (
    <div className="w-full relative h-auto md:h-[60vh] bg-black  px-3 md:px-0 ">
      <div className="absolute h-[100vh] md:h-[60vh] overflow-hidden">
        <video src="/heroBg.mp4" autoPlay loop muted className="" />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-10 md:py-20 z-20">
        <div className="w-full md:w-[50%] z-20">
          <h1 className="text-3xl md:text-5xl font-black mb-6 text-white">
            {book?.volumeInfo?.title}
          </h1>
          <p className="font-medium mb-4 text-gray-400 line-clamp-4">
            {book?.volumeInfo?.description}
          </p>
          <div className="flex gap-4">
            <Link to={`/book/${book.id}`}>
              <button className="bg-blue-700 text-white px-3 py-1 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
                Read Now
              </button>
            </Link>
            <button
              onClick={handleBookMark}
              className="bg-blue-700 text-white px-3 py-1 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer"
            >
              <Heart size={18} fill={isBookmarked ? "white" : "none"} />{" "}
              wishlist
            </button>
          </div>
        </div>
        <div className="w-full md:w-[50%] flex items-center justify-center">
          <img
            src={book?.volumeInfo?.imageLinks?.thumbnail}
            alt={book?.volumeInfo?.title}
            className="rotate-15 w-52 md:w-60"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
