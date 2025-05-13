export function Button({ children, onClick, variant = "default", size = "md" }) {
    const base = "px-4 py-2 rounded-full font-semibold shadow-sm transition duration-200";
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-300 text-black hover:bg-gray-400",
    };
  
    return (
      <button className={`${base} ${variants[variant]} text-sm`} onClick={onClick}>
        {children}
      </button>
    );
  }
  