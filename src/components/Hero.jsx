import { Heart } from "lucide-react";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between py-20 h-[80vh]">
      <div className="w-[50%]">
        <h1 className="text-5xl font-black mb-6">Find your Book</h1>
        <p className="font-medium mb-4 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, eos
          enim. Obcaecati aperiam ipsum quasi repellat? Sit provident
          consectetur aliquid recusandae dolor neque odio aperiam assumenda, qui
          itaque consequatur magni!
        </p>
        <button className="bg-blue-700 text-white px-3 py-1 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
          <Heart size={20} /> wishlist
        </button>
      </div>
      <div className="w-[50%] flex items-center justify-center">
        <img
          src="https://simg.pothi.com/AsEf0sOao1Q5E7NJFxcfzZCgxuNC-nACCc_Ve-wgA0w/rs:fit/w:371/h:477/el:1/g:sm/cb:rev-4/bG9jYWw6Ly8vaW1h/Z2VzL3Byb2R1Y3Rz/LzIwMjMvMTEvU0tV/MjE3NzQvSW1hZ2Vf/MC5qcGc.jpg"
          alt="Book"
          className="rotate-15 w-60"
        />
      </div>
    </div>
  );
};

export default Hero;
