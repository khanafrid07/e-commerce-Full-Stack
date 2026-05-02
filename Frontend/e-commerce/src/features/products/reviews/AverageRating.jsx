import { Star } from "lucide-react";

export default function AverageRating({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="p-6 rounded-2xl border bg-white/60 backdrop-blur-md shadow-sm text-center">
                <p className="text-gray-400 text-sm">No reviews yet</p>
            </div>
        );
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
    const totalReviews = reviews.length;

    // Count per star
    const starCounts = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => r.rating === star).length,
    }));

    return (
        <div className="p-6 rounded-2xl border bg-white/60 backdrop-blur-md shadow-sm">
            <div className="flex flex-col sm:flex-row gap-8 items-start">

                {/* Left: Big average number + stars */}
                <div className="flex flex-col items-center gap-2 min-w-[140px]">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {averageRating}
                    </span>

                    {/* Stars */}
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((num) => {
                            const filled = Math.floor(averageRating);
                            const partial = averageRating - filled;

                            if (num <= filled) {
                                return (
                                    <Star
                                        key={num}
                                        size={20}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                );
                            }

                            if (num === filled + 1 && partial >= 0.25) {
                                return (
                                    <div key={num} className="relative w-5 h-5">
                                        <Star
                                            size={20}
                                            className="text-gray-300 absolute inset-0"
                                        />
                                        <div
                                            className="overflow-hidden absolute inset-0"
                                            style={{ width: `${partial * 100}%` }}
                                        >
                                            <Star
                                                size={20}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Star
                                    key={num}
                                    size={20}
                                    className="text-gray-300"
                                />
                            );
                        })}
                    </div>

                    <p className="text-sm text-gray-500">
                        {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                    </p>
                </div>

                {/* Right: Rating breakdown bars */}
                <div className="flex-1 w-full space-y-2.5">
                    {starCounts.map(({ star, count }) => {
                        const percentage = totalReviews > 0
                            ? Math.round((count / totalReviews) * 100)
                            : 0;

                        return (
                            <div key={star} className="flex items-center gap-3">
                                {/* Star label */}
                                <div className="flex items-center gap-1 min-w-[44px] justify-end">
                                    <span className="text-sm font-medium text-gray-700">
                                        {star}
                                    </span>
                                    <Star
                                        size={14}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                </div>

                                {/* Progress bar */}
                                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-700 ease-out"
                                        style={{
                                            width: `${percentage}%`,
                                            background:
                                                star >= 4
                                                    ? "linear-gradient(90deg, #facc15, #f59e0b)"
                                                    : star === 3
                                                        ? "linear-gradient(90deg, #fbbf24, #d97706)"
                                                        : "linear-gradient(90deg, #f87171, #ef4444)",
                                        }}
                                    />
                                </div>

                                {/* Count + percentage */}
                                <span className="text-xs text-gray-500 min-w-[52px] text-right">
                                    {count} ({percentage}%)
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}