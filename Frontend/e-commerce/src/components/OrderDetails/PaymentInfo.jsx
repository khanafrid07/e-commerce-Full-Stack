import { CreditCard, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function PaymentInfo({ order }) {
  const [copiedId, setCopiedId] = useState(false);

  const copyPaymentId = () => {
    navigator.clipboard.writeText(order.paymentId || "N/A");
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="card bg-white shadow-md border border-gray-200 p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
        <div className="bg-purple-100 p-2 rounded-lg">
          <CreditCard size={20} className="text-purple-600" />
        </div>
        Payment Details
      </h3>

      <div className="space-y-3">
        <div className="pb-3 border-b">
          <p className="text-xs text-gray-500 font-medium mb-1">Method</p>
          <p className="text-gray-800 font-semibold capitalize">{order.paymentMethod}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Transaction ID</p>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="text-gray-800 font-mono text-sm truncate">{order.paymentId || "N/A"}</p>
            <button
              onClick={copyPaymentId}
              className="btn btn-sm btn-ghost ml-2"
              title="Copy Transaction ID"
            >
              {copiedId ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
