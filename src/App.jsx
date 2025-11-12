import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookDetail from "./pages/bookDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/search" element={<Search />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/book/:id" element={<BookDetail />} />
    </Routes>
  );
};

export default App;
