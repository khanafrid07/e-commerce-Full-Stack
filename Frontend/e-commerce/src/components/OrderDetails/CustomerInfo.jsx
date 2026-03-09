import { User, Mail, Phone } from "lucide-react";

export default function CustomerInfo({ user }) {
  return (
    <div className="card bg-white shadow-md border border-gray-200 p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
        <div className="bg-blue-100 p-2 rounded-lg">
          <User size={20} className="text-blue-600" />
        </div>
        Customer Information
      </h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b">
          <User size={18} className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 font-medium">Name</p>
            <p className="text-gray-800 font-semibold">{user?.name || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pb-3 border-b">
          <Mail size={18} className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 font-medium">Email</p>
            <p className="text-gray-800 font-semibold text-sm break-all">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 font-medium">Phone</p>
            <p className="text-gray-800 font-semibold">{user?.phone || "Not provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
