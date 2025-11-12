import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-0 border-t border-gray-500">
        <div className="flex items-center justify-between gap-3">
          <Link to={"/"}>
            <h1 className="text-2xl md:text-3xl font-bold">
              Book <span className="font-normal">verse</span>
            </h1>
          </Link>
        </div>
        <div className="text-sm text-gray-500">
          <p>Developed By Shelli. © {new Date().getFullYear()} Bookverse</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
