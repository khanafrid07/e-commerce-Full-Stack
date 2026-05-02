export default function ProductCardSkeleton() {
    return (

        <div className="animate-pulse">
            <div className="bg-gray-200 rounded-2xl aspect-[3/4] mb-3" />
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>

    );
}