import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { googleApiKey, googleBaseUrl } from "../utils";
import BookCard from "../components/BookCard";

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchData = async () => {
      setLoading(true);
      const res = await axios.get(
        `${googleBaseUrl}/volumes?q=${query}&maxResults=20&key=${googleApiKey}`
      );
      const data = res.data;
      setSearchData(data.items || []);
      setLoading(false);
    };
    fetchSearchData();
  }, [query]);

  console.log("Searech data", searchData);

  return (
    <div className=" min-h-[60vh] py-7">
      <div className="max-w-7xl mx-auto">
        <div>
          {loading ? (
            <div className=" min-h-[50vh] flex justify-center items-center h-64 text-black text-xl font-semibold">
              Loading books...
            </div>
          ) : (
            <div className="min-h-[50vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
              {searchData.length === 0 ? (
                <p className="text-black">No book found</p>
              ) : (
                searchData.map((newArrival) => (
                  <BookCard key={newArrival} book={newArrival} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
