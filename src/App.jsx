import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Search from "./pages/Search";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default App;
