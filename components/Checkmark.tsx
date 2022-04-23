import { motion } from "framer-motion";

export default function Checkmark(props) {
  return (
    <button
      role="checkbox"
      aria-checked="true"
      aria-label="task completed"
      onClick={props.onChange}
    >
      <motion.svg
        animate={{ stroke: props.value ? "#10b981" : "#6b7280" }}
        className={
          props.className +
          " h-[2.25rem] mr-4 fill-transparent stroke-[6px] cursor-pointer"
        }
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="30" />
        <motion.path
          animate={{
            pathLength: props.value ? 1 : 0,
            strokeLinecap: props.value ? "round" : "round",
            transitionEnd: {
              strokeLinecap: props.value ? "round" : "butt",
            },
          }}
          transition={{ duration: 0.5 }}
          className="stroke-[8px] "
          d="M 35 47 L 50 60 L 80 10"
        />
      </motion.svg>
    </button>
  );
}
