export default function BannerSkeleton() {
    return (
        <div className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] bg-gray-200 animate-pulse rounded-2xl overflow-hidden">
            <div className="absolute bottom-10 left-10 space-y-3">
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="h-6 w-48 bg-gray-300 rounded" />
                <div className="h-10 w-32 bg-gray-300 rounded-full" />
            </div>
        </div>
    );
}