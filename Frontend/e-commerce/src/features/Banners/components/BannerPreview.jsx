export default function BanenrPreview({ form, verticalMap, horizontalMap }) {

    return (
        <div className="sticky top-0">
            <h2>Preview</h2>
            <div className="relative border rounded  bg-gray-300 flex items-center justify-center h-[18rem]">
                {form?.image ? <img src={form.imageUrl} alt="" className="w-full h-full object-cover" /> : <p></p>}
                <div className={`text-white absolute inset-0 flex flex-col ${verticalMap[form.vertical]} ${horizontalMap[form.position]}`}>
                    <h1 className="text-2xl font-extrabold">{form.title}</h1>
                    <p className="text-lg">{form.heading}</p>
                    <p className="text-md">{form.subHeading}</p>
                    {form.ctaText && <button className="bg-black text-white px-4 py-2 rounded">{form.ctaText}</button>}

                </div>
            </div>
        </div>
    )
}