export default function Discount() {


    return (

        <div className="flex items-center border border-purple-600 rounded-lg gap-2 px-2">
            <input type="text" className="input border-none outline-none focus:border-none focus:outline-none" placeholder="Enter Discount Code" />
            <button className="text-purple-600 text-end w-full">Apply</button>
        </div>
    )
}