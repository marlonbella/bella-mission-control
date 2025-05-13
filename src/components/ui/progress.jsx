export function Progress({ value }) {
    return (
      <div className="w-full bg-gray-200 rounded h-4">
        <div
          className="bg-blue-500 h-4 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
  