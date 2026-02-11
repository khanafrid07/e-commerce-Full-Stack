import { Search, ChevronDown, ListTodo } from "lucide-react";
import MoreFilters from "./MoreFilters";
import { useState } from "react";

export default function OrderFilter({ onSearch, onStatusChange }) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [query, setQuery] = useState("");

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setOpen(false);
    if (onStatusChange) onStatusChange(status);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
     
      <div className="relative w-full max-w-md flex-1">
        <input
          type="search"
          placeholder="Search by order name or ID"
          value={query}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 border rounded-lg px-4 py-2 bg-white hover:bg-gray-100 transition"
        >
            <ListTodo size={14}/>
          {selectedStatus}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <ul className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-40 z-10">
            {["All Status", "Pending", "Delivered", "Cancelled"].map((status) => (
              <li
                key={status}
                onClick={() => handleStatusClick(status)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  status === "Cancelled"
                    ? "text-red-600"
                    : status === "Pending"
                    ? "text-yellow-600"
                    : status === "Delivered"
                    ? "text-green-600"
                    : "text-gray-800"
                }`}
              >
                
                {status}
                
              </li>
            ))}
          </ul>
        )}
      </div>

    
      <MoreFilters />
    </div>
  );
}
