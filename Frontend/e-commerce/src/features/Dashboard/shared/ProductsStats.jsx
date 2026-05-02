export default function ProductStats({ productStats = [] }) {
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-5 w-full justify-between">
            {productStats.map((stats) => (
                <div
                    key={stats.name}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition duration-300"
                >

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">{stats.name}</span>
                        <span className="text-2xl font-bold text-gray-800">
                            {stats.count}
                        </span>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-gray-600 text-xl">
                        {stats.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}