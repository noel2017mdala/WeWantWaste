import type { Skip } from "../types/skip";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface SkipCardProps {
  skip: Skip;
  isSelected?: boolean;
  onSelect?: () => void;
}

const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  isSelected = false,
  onSelect,
}) => {
  const totalPrice = (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2);

  return (
    <div
      className={`relative p-4 rounded-2xl border-2 transition duration-200 bg-white text-center flex flex-col transform hover:scale-105 ${
        isSelected ? "border-indigo-600" : "border-zinc-200"
      } cursor-pointer`}
      onClick={onSelect}
    >
      <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
        {skip.size} Yard{skip.size > 1 ? "s" : ""}
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <img
          src="https://www.westbin.com.au/wp-content/uploads/2021/10/size-guide-skips.png"
          alt={`Skip ${skip.size} yards`}
          className="h-24 object-contain mb-4"
        />

        <h3 className="text-lg font-semibold mb-2 text-left">
          {skip.size} Yard Skip
        </h3>

        <div className="flex flex-col items-start text-sm gap-1 mb-4 min-h-[48px]">
          <div className="flex items-center gap-1">
            {skip.allowed_on_road ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <XCircleIcon className="w-5 h-5 text-red-500" />
            )}
            <span>Road Legal</span>
          </div>
          <div className="flex items-center gap-1">
            {skip.allows_heavy_waste ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <XCircleIcon className="w-5 h-5 text-red-500" />
            )}
            <span>Accepts Heavy Waste</span>
          </div>
        </div>

        <div className="mb-4 text-left">
          <div
            className={`mb-1 text-2xl font-bold ${
              isSelected ? "text-indigo-600" : "text-zinc-800"
            }`}
          >
            £{skip.price_before_vat}
          </div>

          <div>
            <span>
              {" "}
              {skip.vat > 0 && (
                <div className="text-md text-zinc-500 mb-1">
                  + VAT ({skip.vat}%) -
                  <span
                    className={`text-lg ${
                      isSelected ? "text-indigo-600" : "text-zinc-800"
                    }`}
                  >
                    Total: £{totalPrice}
                  </span>
                </div>
              )}
            </span>
          </div>
        </div>
      </div>

      <button
        className={`w-full mt-auto py-2 cursor-pointer rounded-lg font-medium transition  ${
          isSelected
            ? "bg-indigo-600 text-white"
            : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
        }`}
      >
        {isSelected ? "Selected" : "Select"}
      </button>
    </div>
  );
};

export default SkipCard;
