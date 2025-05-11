import { useEffect, useState } from "react";
import type { Filters } from "../types/filters";
import { useSearchParams } from "react-router-dom";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [filters, setFilters] = useState<Filters>({
    size: "",
    hirePeriod: "",
    allowsHeavyWaste: false,
    allowedOnRoad: false,
    maxPrice: 1000,
  });
  const [searchParams] = useSearchParams();
  const skipSizes: string[] = [
    "2",
    "4",
    "6",
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "40",
    "60",
  ];

  useEffect(() => {
    const size = searchParams.get("size");
    const hirePeriod = searchParams.get("hirePeriod");
    const allowsHeavyWaste = searchParams.get("allowsHeavyWaste") === "true";
    const allowedOnRoad = searchParams.get("allowedOnRoad") === "true";
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;

    setFilters((prev) => ({
      ...prev,
      size: size || prev.size,
      hirePeriod: hirePeriod || prev.hirePeriod,
      allowsHeavyWaste: allowsHeavyWaste || prev.allowsHeavyWaste,
      allowedOnRoad: allowedOnRoad || prev.allowedOnRoad,
      maxPrice: maxPrice || prev.maxPrice,
    }));
  }, [searchParams]);

  const handleReset = () => {
    setFilters({
      size: "",
      hirePeriod: "",
      allowsHeavyWaste: false,
      allowedOnRoad: false,
      maxPrice: 1000,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-30 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black focus:outline-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block font-medium mb-1">Size (yards)</label>
            <select
              name="size"
              value={filters.size}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Any</option>
              {skipSizes.map((size) => (
                <option key={size} value={size}>
                  {size} yd
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Hire Period (days)</label>
            <select
              name="hirePeriod"
              value={filters.hirePeriod}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Any</option>
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="21">21</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="allowsHeavyWaste"
              checked={filters.allowsHeavyWaste}
              onChange={handleChange}
              className="cursor-pointer accent-indigo-600"
            />
            <label className="font-medium">Allows Heavy Waste</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="allowedOnRoad"
              checked={filters.allowedOnRoad}
              onChange={handleChange}
              className="cursor-pointer accent-indigo-600"
            />
            <label className="font-medium">Allowed On Road</label>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Max Price Before VAT: £{filters.maxPrice}
            </label>
            <input
              type="range"
              name="maxPrice"
              min={0}
              max={1000}
              step={10}
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full accent-indigo-600"
            />
          </div>

          <button
            onClick={handleApply}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 mt-4"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
