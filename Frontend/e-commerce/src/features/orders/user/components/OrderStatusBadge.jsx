export default function OrderStatusBadge({ status }) {
    const styles = {
        delivered: "bg-green-100 text-green-600",
        shipped: "bg-blue-100 text-blue-600",
        cancelled: "bg-red-100 text-red-600",
        pending: "bg-yellow-100 text-yellow-600",
        confirmed: "bg-purple-100 text-purple-600",
    };

    return (
        <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${styles[status] || styles.pending
                }`}
        >
            {status}
        </span>
    );
}