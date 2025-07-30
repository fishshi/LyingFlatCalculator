import type { JSX } from "react";

function NumberInput({
  label,
  value,
  onChange,
  title,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  title?: string;
  step?: number;
}): JSX.Element {
  return (
    <div className="flex flex-grow flex-col gap-2">
      <div>{label}</div>
      <input
        className="w-full h-16 px-2 rounded border text-lg"
        type="number"
        title={title || label}
        step={step}
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default NumberInput;
