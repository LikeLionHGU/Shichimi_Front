import { useState } from "react";

export default function LikeButton() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 rounded-2xl shadow bg-blue-500 text-white font-semibold select-none focus:outline-none active:scale-90 transition-transform"
      >
        👍 좋아요
      </button>
      <span className="text-xl font-bold">{count}</span>
    </div>
  );
}
