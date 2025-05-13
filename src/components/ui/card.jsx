export function Card({ children, className }) {
    return (
      <div className={`rounded-2xl shadow-md p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className }) {
    return (
      <div className={`space-y-2 ${className}`}>
        {children}
      </div>
    );
  }
  