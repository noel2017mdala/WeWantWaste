import {
  MapPinIcon,
  TrashIcon,
  TruckIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const steps = [
  { name: "Postcode", icon: MapPinIcon },
  { name: "Waste Type", icon: TrashIcon },
  { name: "Select Skip", icon: TruckIcon },
  { name: "Permit Check", icon: ShieldCheckIcon },
  { name: "Choose Date", icon: CalendarDaysIcon },
  { name: "Payment", icon: CreditCardIcon },
];

const Stepper = ({ currentStep = 2 }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center space-x-6 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm min-w-max">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          return (
            <div key={step.name} className="flex items-center flex-shrink-0">
              <step.icon
                className={`h-5 w-5 transition-colors ${
                  isActive
                    ? "text-blue-600 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              />
              <span
                className={`ml-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-gray-900 cursor-pointer"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <span
                  className={`mx-4 h-px w-6 transition-colors ${
                    isActive ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
