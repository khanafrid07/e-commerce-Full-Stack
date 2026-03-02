import { Check, AlertCircle } from "lucide-react";

export default function ToastNotification({ type, message, isVisible }) {
  if (!isVisible) return null;

  const isSuccess = type === "success";
  const bgColor = isSuccess
    ? "bg-green-50 border-green-200"
    : "bg-red-50 border-red-200";
  const iconColor = isSuccess ? "text-green-600" : "text-red-600";
  const textColor = isSuccess ? "text-green-800" : "text-red-800";
  const Icon = isSuccess ? Check : AlertCircle;

  return (
    <div
      className={`flex items-center gap-3 ${bgColor} border px-6 py-4 rounded-lg animate-in fade-in`}
    >
      <Icon className={iconColor} size={20} />
      <span className={`${textColor} font-medium`}>{message}</span>
    </div>
  );
}
