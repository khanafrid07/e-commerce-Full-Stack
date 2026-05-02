import { Check, Package, Truck, Home } from "lucide-react";

export default function OrderTimeline({ status }) {
  const steps = [
    { key: "pending", label: "Order Placed", icon: Package },
    { key: "confirmed", label: "Confirmed", icon: Check },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: Home },
  ];

  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="w-full">

      <div className="flex justify-between relative">

        {/* background line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-base-300 -translate-y-1/2" />

        {/* active line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500"
          style={{
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          const active = i <= currentIndex;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center relative z-10 w-1/4"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-base-100 border-base-300 text-gray-400"
                }`}
              >
                <Icon size={18} />
              </div>

              <p className={`text-xs mt-2 ${active ? "text-primary font-semibold" : "text-gray-400"}`}>
                {step.label}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
}