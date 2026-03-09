import { DollarSign } from "lucide-react";

export default function PriceSummary({ subtotal, shipping, total }) {
  return (
    <div className="card bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md border border-indigo-200 p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <DollarSign size={20} className="text-indigo-600" />
        </div>
        Price Summary
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center pb-3 border-b">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-800">${parseFloat(subtotal).toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-gray-800">${parseFloat(shipping || 0).toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center bg-white rounded-lg p-3 border-2 border-indigo-300">
          <span className="font-bold text-gray-800">Total Amount</span>
          <span className="font-bold text-2xl text-indigo-600">${parseFloat(total).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
