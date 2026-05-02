export default function BannerFilters({ filters, setFilters }) {
  const types = ["all", "promo", "hero", "category"];
  const statuses = ["all", "active", "inactive"];

  return (
    <div className="space-y-3">

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex w-max gap-2 bg-gray-100 p-1 rounded-xl">

          {types.map((type) => {
            const isActive = (filters.type || "all") === type;

            return (
              <button
                key={type}
                onClick={() =>
                  setFilters({
                    ...filters,
                    type: type === "all" ? "" : type,
                  })
                }
                className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition ${isActive
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                {type}
              </button>
            );
          })}

        </div>
      </div>

      {/*  STATUS FILTER */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex w-max gap-2 bg-gray-100 p-1 rounded-xl">

          {statuses.map((status) => {
            const isActive = (filters.status || "all") === status;

            return (
              <button
                key={status}
                onClick={() =>
                  setFilters({
                    ...filters,
                    status: status === "all" ? "" : status,
                  })
                }
                className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition ${isActive
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                {status}
              </button>
            );
          })}

        </div>
      </div>

      {/*  CLEAR FILTER */}
      {(filters.type || filters.status) && (
        <button
          onClick={() => setFilters({ type: "", status: "" })}
          className="text-xs text-gray-500 hover:text-black"
        >
          Clear Filters
        </button>
      )}

    </div>
  );
}