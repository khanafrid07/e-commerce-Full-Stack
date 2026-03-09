const getStatusColor = (status) => {
  const colors = {
    Pending: "badge-warning",
    Shipped: "badge-info",
    Delivered: "badge-success",
    Cancelled: "badge-error",
  };
  return colors[status] || "badge-gray-400";
};

export default function ProductCard({ product, onStatusChange }) {
  const { product: prod, quantity, status, _id } = product;
  const price = prod?.basePrice || prod?.price || 0;
  const total = (quantity * price).toFixed(2);

  return (
    <div className="card bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow p-4">
      {/* Product Image & Info */}
      <div className="flex gap-4 mb-4">
        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={prod?.images?.[0]?.url || "https://via.placeholder.com/100"}
            alt={prod?.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 line-clamp-2">{prod?.title}</h4>
          <p className="text-sm text-gray-600 mt-1">
            {quantity} × ${price.toFixed(2)}
          </p>
          <p className="font-bold text-lg text-blue-600 mt-2">${total}</p>
        </div>
      </div>

      {/* Status & Action */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t">
        <div className={`badge badge-md font-semibold ${getStatusColor(status)}`}>
          {status}
        </div>

        <select
          value={status}
          onChange={(e) => onStatusChange(_id, e.target.value)}
          className="select select-sm select-bordered flex-1 max-w-xs"
        >
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>
    </div>
  );
}
