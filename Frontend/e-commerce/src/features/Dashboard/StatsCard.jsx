export default function StatsCard({data = [1,2,3]}){


    return(
        <div className="flex">
            {data.map((_, id)=>(
                <div className="border rounded shadow-md  bg-gray-400">
                    <p>I am gay</p>
                     <p>I am gay</p>
                      <p>I am gay</p>

                    </div>
            ))}

        </div>
    )
}