import { useEffect } from "react";

export default function Alert({message, type = "success", onClose}) {
    if (!message) return null

    const typeClasses = {
        success: "alert-success",
        error: "alert-error",
        info: "alert-info",
        warning: "alert-warning",
    }
    useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);
    return (
         <div className={`alert ${typeClasses[type]} shadow-lg fixed top-5  z-50`}>
      <div>
        <span>{message}</span>
      </div>
      {onClose && (
        <button className="btn btn-sm btn-ghost ml-4" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );

    
}