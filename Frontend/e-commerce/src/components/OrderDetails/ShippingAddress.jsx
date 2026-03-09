import { MapPin } from "lucide-react";

export default function ShippingAddress({ address }) {
  return (
    <div className="card bg-white shadow-md border border-gray-200 p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
        <div className="bg-green-100 p-2 rounded-lg">
          <MapPin size={20} className="text-green-600" />
        </div>
        Shipping Address
      </h3>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
        <div className="space-y-2 text-gray-800">
          <p className="font-semibold">{address?.address}</p>
          <p className="text-sm">
            {address?.city}, {address?.state} {address?.zip}
          </p>
          <p className="text-sm">{address?.country}</p>
        </div>
      </div>
    </div>
  );
}
