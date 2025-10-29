import { Heart } from "lucide-react";
import { useBookStore } from "../store/bookStore";

const BookCard = ({ book }) => {
  const { bookmarks, toggleBookmark } = useBookStore();
  const isBookmarked = bookmarks.some((b) => b.id === book.id);

  const handleBookMark = () => {
    toggleBookmark(book);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg relative">
      <img
        className="h-72 w-full object-cover rounded-lg mb-3"
        src={book.volumeInfo?.imageLinks?.thumbnail}
        alt={book.volumeInfo?.title || "No title"}
      />
      <h1 className="font-bold text-lg mb-1 line-clamp-1">
        {book.volumeInfo?.title || "Untitled"}
      </h1>
      {/* <p className="text-gray-400 text-sm">{book.volumeInfo?.authors[0]}</p> */}
      <button
        onClick={handleBookMark}
        className="absolute top-2 right-2 mt-2 bg-blue-700 p-2 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 hover:bg-blue-600 transition cursor-pointer"
      >
        <Heart size={18} fill={isBookmarked ? "white" : "none"} />
      </button>
      <button className="bg-blue-700 p-1 mt-2 mb-2 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 hover:bg-blue-600 transition cursor-pointer w-full">
        Read Now
      </button>
    </div>
  );
};

export default BookCard;
