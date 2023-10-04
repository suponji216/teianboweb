import { ReactNode } from "react";

export default function Tooltip(props: { text?: string; children: ReactNode }) {
  return (
    <span className="relative group">
      <span
        className={[
          "whitespace-nowrap",
          "rounded",
          "bg-black",
          "px-2",
          "py-1",
          "text-white",
          "absolute",
          "-right-16",
          "translate-y-1",
          "opacity-0",
          "group-hover:opacity-100",
          "transition",
          "pointer-events-none",
        ].join(" ")}
      >
        {props.text}
      </span>
      {props.children}
    </span>
  );
}
