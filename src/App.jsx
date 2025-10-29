import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import WishList from "./pages/WishList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wishlist" element={<WishList />} />
    </Routes>
  );
};

export default App;
