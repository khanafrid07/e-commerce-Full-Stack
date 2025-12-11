import { Truck, Shield, Package } from "lucide-react";

export default function TrustBadges({ mobile = false }) {
  const badges = [
    { icon: Truck, text: "Free Delivery", color: "text-primary" },
    { icon: Shield, text: "Secure Payment", color: "text-success" },
    { icon: Package, text: "Easy Returns", color: "text-info" },
  ];

  if (mobile) {
    return (
      <div className="grid grid-cols-3 gap-2 lg:hidden pt-2 border-t">
        {badges.map(({ icon: Icon, text, color }) => (
          <div key={text} className="flex flex-col items-center gap-1 text-xs">
            <Icon className={color} size={20} />
            <span className="font-medium text-center">{text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden lg:grid grid-cols-3 gap-3 pt-4">
      {badges.map(({ icon: Icon, text, color }) => (
        <div key={text} className="flex items-center gap-2 text-xs">
          <Icon className={color} size={20} />
          <span className="font-medium">{text}</span>
        </div>
      ))}
    </div>
  );
}
