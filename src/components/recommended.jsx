import { useEffect, useState } from "react";
import Heading from "./Heading";
import { googleApiKey, googleBaseUrl } from "../utils";
import BookCard from "./BookCard";
import axios from "axios";

const RecommendedBooks = ({ category }) => {
  console.log("Category", category);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommended = async () => {
      setLoading(true);
      const res = await axios.get(
        `${googleBaseUrl}/volumes?q=${category}&maxResults=8&key=${googleApiKey}`
      );
      const data = res.data;
      setRecommended(data.items || []);
      setLoading(false);
    };
    fetchRecommended();
  }, []);

  return (
    <div className="bg-black min-h-[60vh] px-3 md:px-0 py-7">
      <div className="max-w-7xl mx-auto border-t border-gray-600 mt-5 pt-5">
        <Heading
          title={"Recommended Books"}
          desc={"Recommended books for you "}
        />

        <div>
          {loading ? (
            <div className=" min-h-[50vh] flex justify-center items-center h-64 text-white text-xl font-semibold">
              Loading books...
            </div>
          ) : (
            <div className="min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-white">
              {recommended.length === 0 ? (
                <p>No book found</p>
              ) : (
                recommended.map((r) => <BookCard key={r.id} book={r} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedBooks;
