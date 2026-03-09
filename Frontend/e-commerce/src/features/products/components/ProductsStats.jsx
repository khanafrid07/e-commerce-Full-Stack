export default function ProductStats({productStats = []}){

    return(
        <>
            {productStats.map((stats)=>(
                <div key={stats.name} className={`border rounded p-4 shadow-lg ${stats.bgColor} w-full opacity-80 hover:opacity-100`}>
                    <span className="text-xl font-semibold ">{stats.name}</span>
                    <span className="flex justify-between"><p className="text-2xl font-semibold ">{stats.count}</p><p>{stats.icon}</p></span>
                    
                    </div>
            ))}
        </>

        
    )
}