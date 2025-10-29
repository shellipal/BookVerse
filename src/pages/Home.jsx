import BookCatagory from "../components/BookCatagory";
import Hero from "../components/Hero";
import NewArrival from "../components/NewArrival";
import PopularBooks from "../components/PopularBooks";

const Home = () => {
  return (
    <div>
      <Hero />
      <BookCatagory />
      <PopularBooks />
      <NewArrival />
    </div>
  );
};

export default Home;
