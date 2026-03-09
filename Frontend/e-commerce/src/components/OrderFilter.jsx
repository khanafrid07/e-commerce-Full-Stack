import { Search, ChevronDown, ListTodo } from "lucide-react";
import MoreFilters from "./MoreFilters";

import SearchInput from "../features/products/components/SearchInput";
import FilterDropdown from "../features/products/components/FilterDropdown";

export default function OrderFilter({ onSearch, onStatusChange }) {
 
  const handleStatusClick = (status) => {
    if (onStatusChange) onStatusChange(status);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const OrderStatus = [
  {label:"Pending", value:"Pending", className:"text-warning"},
  {label:"Delivered",value:'Delivered', className:"text-success"},
  {label:"Cancelled",value:"Cancelled", className:"text-red-500"}
  ]

  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
     
      <div className="relative w-full max-w-md flex-1">
       <SearchInput/>
      </div>

      <div className="relative">
        <FilterDropdown options={OrderStatus} onSelect={handleStatusClick} label="All Status"/>
      </div>

    
      <MoreFilters />
    </div>
  );
}
