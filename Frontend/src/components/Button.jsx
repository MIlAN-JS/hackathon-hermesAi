import { FiChevronRight } from "react-icons/fi";



export default function Button({ label = "Get in touch", onClick }) {
  return (
    <div className="inline-flex flex-col">
      {/* Button */}
      <button
        onClick={onClick}
        className="group flex items-center justify-between gap-6 px-5 py-3.5 cursor-pointer"
        style={{ backgroundColor: "#c85a00", minWidth: "180px" }}
      >
        {/* Label */}
        <span
          className="text-white text-base font-light tracking-wide select-none"
          style={{ fontFamily: "sans-serif", letterSpacing: "0.01em" }}
        >
          {label}
        </span>

        {/* Icon box */}
        <span
          className="flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5"
          style={{
            backgroundColor: "#b85000",
            width: "28px",
            height: "28px",
            flexShrink: 0,
          }}
        >
          <FiChevronRight className="text-white" style={{ fontSize: "18px", strokeWidth: 2.5 }} />
        </span>
      </button>

      {/* Bottom border line */}
      <div className="w-full" style={{ height: "2px", backgroundColor: "#a04500" }} />
    </div>
  );
}