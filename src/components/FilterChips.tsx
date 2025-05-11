import { useLocation, useNavigate } from "react-router-dom";

const FILTER_LABELS: Record<string, string> = {
  size: "Size",
  hirePeriod: "Hire Period",
  allowsHeavyWaste: "Allows Heavy Waste",
  allowedOnRoad: "Allowed On Road",
  maxPrice: "Max Price",
};

const FilterChips = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const filters = Array.from(searchParams.entries()).filter(
    ([key, value]) =>
      FILTER_LABELS[key] && value !== "" && value !== null && value !== "false"
  );

  const handleRemove = (key: string) => {
    const newParams = new URLSearchParams(location.search);
    newParams.delete(key);
    navigate({ search: newParams.toString() });
  };

  const handleClearAll = () => {
    const newParams = new URLSearchParams(location.search);
    Object.keys(FILTER_LABELS).forEach((key) => newParams.delete(key));
    navigate({ search: newParams.toString() });
  };

  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {filters.map(([key, value]) => (
        <div
          key={key}
          className="flex items-center bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-700"
        >
          {FILTER_LABELS[key]}: {value}
          <button
            onClick={() => handleRemove(key)}
            className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={handleClearAll}
        className="text-indigo-600 hover:underline text-sm cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
};

export default FilterChips;
