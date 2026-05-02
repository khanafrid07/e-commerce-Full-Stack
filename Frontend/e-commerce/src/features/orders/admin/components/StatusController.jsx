import { useState } from "react";
import { useUpdateOrderMutation } from "../../orderSlice.js";
import { Truck, PackageCheck, Clock, XCircle, CheckCircle } from "lucide-react";
import { notifyError, notifySuccess } from "../../../../utils/notify.js";

const statusConfig = {
  pending: {
    label: "Pending",
    color: "badge-warning",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    color: "badge-info",
    icon: CheckCircle,
  },
  shipped: {
    label: "Shipped",
    color: "badge-primary",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "badge-success",
    icon: PackageCheck,
  },
  cancelled: {
    label: "Cancelled",
    color: "badge-error",
    icon: XCircle,
  },
};

export default function StatusController({ order }) {
  ("order", order)
  const [status, setStatus] = useState(order?.status);
  const [updateStatus, { isLoading }] = useUpdateOrderMutation();

  const handleChange = async (newStatus) => {
    const prev = status;
    setStatus(newStatus);

    try {
      await updateStatus({
        orderId: order._id,
        status: newStatus,

      }).unwrap();
      notifySuccess("Status updated successfully")
    } catch (err) {
      console.error(err);
      notifyError("Failed to update status")
      setStatus(prev);
    }
  };

  const CurrentIcon = statusConfig[status].icon;

  return (
    <div className="bg-base-100 border rounded-2xl p-4 shadow-sm flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Order Status</h2>

        {/* Current Status Badge */}
        <div className={`badge ${statusConfig[status].color} gap-2 px-3 py-3`}>
          <CurrentIcon size={16} />
          {statusConfig[status].label}
        </div>
      </div>


      <div className="flex flex-wrap gap-2">
        {Object.keys(statusConfig).map((key) => {
          const Icon = statusConfig[key].icon;
          const isActive = status === key;

          return (
            <button
              key={key}
              onClick={() => handleChange(key)}
              disabled={isLoading}
              className={`btn btn-sm gap-2 capitalize transition-all
                ${isActive ? "btn-primary" : "btn-outline"}
              `}
            >
              <Icon size={16} />
              {statusConfig[key].label}
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="loading loading-spinner loading-sm"></span>
          Updating status...
        </div>
      )}
    </div>
  );
}