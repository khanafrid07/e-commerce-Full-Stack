import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function OrderHeader({ order }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(order._id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "badge-warning",
      Shipped: "badge-info",
      Delivered: "badge-success",
      Cancelled: "badge-error",
    };
    return colors[status] || "badge-gray-400";
  };

  return (
    <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg p-6 border border-blue-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              #{order._id.substring(0, 8)}...
            </h1>
            <button
              onClick={copyToClipboard}
              className="btn btn-sm btn-ghost gap-1"
              title="Copy full Order ID"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600 mb-2">Order Status</p>
          <div className={`badge badge-lg font-semibold px-4 py-3 ${getStatusColor(order.status)}`}>
            {order.status}
          </div>
        </div>
      </div>
    </div>
  );
}
