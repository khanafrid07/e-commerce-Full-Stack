import { Calendar, Clock } from "lucide-react";

export default function BannerScheduler({ form, handleChange }) {

    return (
        <div className="space-y-4 p-4 border rounded-2xl">

            {/* HEADER */}
            <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar size={18} /> Set Schedule
                </h2>
                <p className="text-sm text-gray-500">
                    Control when this banner appears
                </p>
            </div>


            <div>
                <label className="text-sm font-medium flex items-center gap-2">
                    <Clock size={14} /> Start Date & Time
                </label>
                <input
                    type="datetime-local"
                    name="startDate"
                    min={new Date().toISOString().slice(0, 16)}
                    value={form.schedule?.startDate || ""}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg"
                />
            </div>

            {/* END DATE */}
            <div>
                <label className="text-sm font-medium flex items-center gap-2">
                    <Clock size={14} /> End Date & Time
                </label>
                <input
                    type="datetime-local"
                    name="endDate"
                    min={
                        form.schedule?.startDate ||
                        new Date().toISOString().slice(0, 16)
                    }
                    value={form.schedule?.endDate || ""}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg"
                />
            </div>

            {/* STATUS PREVIEW */}
            <div className="text-sm bg-gray-100 p-2 rounded-lg">
                Status: <strong>{getStatus(form.schedule)}</strong>
            </div>

        </div>
    );
}

/* 🔥 STATUS LOGIC */
function getStatus(schedule = {}) {
    const now = new Date();
    const start = schedule.startDate ? new Date(schedule.startDate) : null;
    const end = schedule.endDate ? new Date(schedule.endDate) : null;

    if (start && now < start) return "Scheduled";
    if (start && (!end || now <= end)) return "Active";
    if (end && now > end) return "Expired";

    return "Draft";
}