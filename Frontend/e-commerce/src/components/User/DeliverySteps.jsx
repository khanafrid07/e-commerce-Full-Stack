import { Container, Truck, PackageOpen, PackageCheck } from "lucide-react";

export default function DeliverySteps({ orderStatus }) {

  const steps = [
    { key: "Placed", icon: <Container /> },
    { key: "Pending", icon: <Truck /> },
    { key: "Shipped", icon: <PackageOpen /> },
    { key: "Delivered", icon: <PackageCheck /> },
  ];

  const statusToIndex = {
    Pending: 1,
    Shipped: 2,
    Delivered: 3,
  };

  const activeIndex = statusToIndex[orderStatus] ?? 0;

  return (
    <ul className="steps">
      {steps.map((step, index) => (
        <li
          key={step.key}
          className={`step ${index === activeIndex ? "step-neutral" : ""}`}
        >
          <span
            className={`step-icon ${
              index === activeIndex
                ? "bg-blue-500 text-white scale-110"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {step.icon}
          </span>
        </li>
      ))}
    </ul>
  );
}
