import { useEffect, useState } from "react";
import { fetchSkips } from "../service/skipService";
import type { Skip } from "../types/skip";
import SkipCard from "./SkipCard";
import Loader from "./Loader";
import { useSearchParams } from "react-router-dom";
import NoSkipsFound from "./NoSkipsFound";

const SkipList: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const size = searchParams.get("size");
    const hirePeriod = searchParams.get("hirePeriod");
    const allowsHeavyWaste = searchParams.get("allowsHeavyWaste") === "true";
    const allowedOnRoad = searchParams.get("allowedOnRoad") === "true";
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;

    const filterData = {
      size,
      hirePeriod,
      allowsHeavyWaste,
      allowedOnRoad,
      maxPrice,
    };

    const getSkipData = async () => {
      try {
        const data = await fetchSkips();
        const filteredData = data.filter((skip: any) => {
          if (filterData.size && skip.size !== Number(filterData.size)) {
            return false;
          }

          if (
            filterData.hirePeriod &&
            skip.hire_period_days !== Number(filterData.hirePeriod)
          ) {
            return false;
          }

          if (filterData.allowsHeavyWaste && !skip.allows_heavy_waste) {
            return false;
          }

          if (filterData.allowedOnRoad && !skip.allowed_on_road) {
            return false;
          }

          if (
            filterData.maxPrice &&
            skip.price_before_vat > Number(filterData.maxPrice)
          ) {
            return false;
          }

          return true;
        });

        setSkips(filteredData);
      } catch (error) {
        console.error("Error fetching skips:", error);
      } finally {
        setLoading(false);
      }
    };

    getSkipData();
  }, [searchParams]);

  if (loading) return <Loader loading={loading} size={30} />;

  return (
    <div className="relative">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 md:gap-8 p-4"></div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {skips.length > 0 ? (
          skips.map((skip, index) => (
            <SkipCard
              key={index}
              skip={skip}
              isSelected={selectedSkip?.size === skip.size}
              onSelect={() => setSelectedSkip(skip)}
            />
          ))
        ) : (
          // <div className="col-span-full text-center text-gray-500">
          //   No skips found.
          // </div>

          <div className="col-span-full text-center">
            <NoSkipsFound />
          </div>
        )}
      </div>

      {selectedSkip && (
        <div className="fixed bottom-0 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex justify-between items-center rounded-t-2xl">
          <div>
            <span className="font-medium">{selectedSkip.size} Yard Skip</span>{" "}
            <span className="text-indigo-600 font-semibold">
              £
              {Number(
                selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)
              ).toFixed(2)}
            </span>{" "}
            <span className="">14 day hire</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSkip(null)}
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Back
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer">
              Continue <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkipList;
