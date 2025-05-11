import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emptySkipsImage from "../assets/images/emptySkips.png"; // Update the path as needed

const FILTER_LABELS: Record<string, string> = {
  size: "Size",
  hirePeriod: "Hire Period",
  allowsHeavyWaste: "Allows Heavy Waste",
  allowedOnRoad: "Allowed On Road",
  maxPrice: "Max Price",
};

const NoSkipsFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClearAll = () => {
    const newParams = new URLSearchParams(location.search);
    Object.keys(FILTER_LABELS).forEach((key) => newParams.delete(key));
    navigate({ search: newParams.toString() });
  };
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <img
        src={emptySkipsImage}
        alt="No skips available"
        className="w-80 h-auto mb-6 sm:w-96 md:w-[500px]"
      />
      <h2 className="text-3xl font-bold mb-2">Oops... No skips found!</h2>
      <p className="text-gray-600 mb-6 text-lg">
        Looks like every skip's on vacation 🏖️
        <br />
        Try adjusting your filters or bribe a skip to come back 😄
      </p>
      <button
        onClick={handleClearAll}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default NoSkipsFound;
