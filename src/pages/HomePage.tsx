import React, { useState } from "react";
import SkipList from "../components/SkipList";
import Stepper from "../components/Stepper";
import FilterDrawer from "../components/FilterDrawer";
import type { Filters } from "../types/filters";
import { useNavigate } from "react-router-dom";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import FilterChips from "../components/FilterChips";

const HomePage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleApplyFilters = (filters: Filters) => {
    const params = new URLSearchParams();

    if (filters.size) params.set("size", filters.size);
    if (filters.hirePeriod) params.set("hirePeriod", filters.hirePeriod);
    if (filters.allowsHeavyWaste) params.set("allowsHeavyWaste", "true");
    if (filters.allowedOnRoad) params.set("allowedOnRoad", "true");
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());

    navigate({ search: params.toString() });
  };

  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Stepper />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Skip Size
        </h1>

        <p className="text-gray-600 mb-8">
          Select the skip size that best suits your needs
        </p>

        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-auto">
            <FilterChips />
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:w-auto"
          >
            Filters
            <AdjustmentsHorizontalIcon className="h-8 w-8 inline-block ml-2" />
          </button>

          <FilterDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onApply={handleApplyFilters}
          />
        </div>
        <SkipList />
      </div>
    </main>
  );
};

export default HomePage;
