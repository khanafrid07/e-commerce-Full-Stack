export default function SearchInput({placeholder = "Input", handleChange, value = ""}){


    return(
        
            <input type="search" value={value} onChange={(e)=>handleChange(e.target.value)} className="input  w-full" placeholder={`Search ${placeholder}`}/>
        
    )
}