import { useState } from "react";
import { motion } from "framer-motion";

export default function LikeButton() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center space-x-3">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="px-4 py-2 rounded-2xl shadow bg-blue-500 text-white font-semibold select-none focus:outline-none"
        onClick={() => setCount(c => c + 1)}
      >
        👍 좋아요
      </motion.button>
      <motion.span
        key={count}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-xl font-bold"
      >
        {count}
      </motion.span>
    </div>
  );
}
