import { useEffect, useState } from "react";
import Heading from "./Heading";
import { googleApiKey, googleBaseUrl } from "../utils";
import BookCard from "./BookCard";
import axios from "axios";

const NewArrival = () => {
  const [newArrival, setNewArrival] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewArrival = async () => {
      setLoading(true);
      const res = await axios.get(
        `${googleBaseUrl}/volumes?q=new-arrival&maxResults=8&key=${googleApiKey}`
      );
      const data = res.data;
      setNewArrival(data.items || []);
      setLoading(false);
    };
    fetchNewArrival();
  }, []);

  return (
    <div className="bg-black min-h-[60vh] py-7">
      <div className="max-w-7xl mx-auto">
        <Heading title={"New Arrivals"} desc={"2025 New Arrivals"} />

        <div>
          {loading ? (
            <div className=" min-h-[50vh] flex justify-center items-center h-64 text-white text-xl font-semibold">
              Loading books...
            </div>
          ) : (
            <div className="min-h-[50vh] grid grid-cols-4 gap-6 text-white">
              {newArrival.length === 0 ? (
                <p>No book found</p>
              ) : (
                newArrival.map((newArrival) => (
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

export default NewArrival;
