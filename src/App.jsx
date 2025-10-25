import React from "react";
import Hero from "./components/Hero";
import BookCatagory from "./components/bookCatagory";
import PopularBooks from "./components/PopularBooks";
import NewArrival from "./components/NewArrival";

const App = () => {
  return (
    <div>
      <Hero />
      <BookCatagory />
      <PopularBooks />
      <NewArrival />
    </div>
  );
};

export default App;
