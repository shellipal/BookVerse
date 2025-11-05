import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { googleApiKey, googleBaseUrl } from "../utils";
import axios from "axios";
import { useBookStore } from "../store/bookStore";

const Hero = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState([]);
  const { bookmarks, toggleBookmark } = useBookStore();
  const isBookmarked = bookmarks.some((b) => b.id === book.id);

  console.log("book :", book);

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between py-20 h-[80vh]">
      <div className="w-[50%]">
        <h1 className="text-5xl font-black mb-6">{book?.volumeInfo?.title}</h1>
        <p className="font-medium mb-4 text-gray-600 line-clamp-4">
          {book?.volumeInfo?.description}
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-700 text-white px-3 py-1 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
            Read Now
          </button>
          <button
            onClick={handleBookMark}
            className="bg-blue-700 text-white px-3 py-1 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer"
          >
            <Heart size={18} fill={isBookmarked ? "white" : "none"} /> wishlist
          </button>
        </div>
      </div>
      <div className="w-[50%] flex items-center justify-center">
        <img
          src={book?.volumeInfo?.imageLinks?.thumbnail}
          alt={book?.volumeInfo?.title}
          className="rotate-15 w-60"
        />
      </div>
    </div>
  );
};

export default Hero;
