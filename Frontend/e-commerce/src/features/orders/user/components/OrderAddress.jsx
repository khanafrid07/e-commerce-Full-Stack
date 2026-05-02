export default function OrderAddress({ address }) {
    return (
        <div className="border rounded-xl p-4">
            <h2 className="font-semibold mb-2">Shipping Address</h2>
            <p>
                {address?.firstName} {address?.lastName}
            </p>
            <p className="text-sm text-gray-600">
                {address?.city}, {address?.state}, {address?.zip}
            </p>
            <p className="text-sm text-gray-600">{address?.phone}</p>
        </div>
    );
}