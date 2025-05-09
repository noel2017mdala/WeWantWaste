import { useEffect, useState } from "react";
import { fetchSkips } from "../service/skipService";
import type { Skip } from "../types/skip";
import SkipCard from "./SkipCard";
import Loader from "./Loader";

const SkipList: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  useEffect(() => {
    const getSkipData = async () => {
      try {
        const data = await fetchSkips();

        setSkips(data);
      } catch (error) {
        console.error("Error fetching skips:", error);
      } finally {
        setLoading(false);
      }
    };
    getSkipData();
  }, []);

  if (loading) return <Loader loading={loading} size={30} />;

  return (
    <div className="relative">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 md:gap-8 p-4"></div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {skips.map((skip, index) => (
          <SkipCard
            key={index}
            skip={skip}
            isSelected={selectedSkip?.size === skip.size}
            onSelect={() => setSelectedSkip(skip)}
          />
        ))}
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
