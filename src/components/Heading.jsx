const Heading = ({ title, desc }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
      <p className="text-sm font-medium text-gray-300 mb-5">{desc}</p>
    </div>
  );
};

export default Heading;
