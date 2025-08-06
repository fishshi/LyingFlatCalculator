import Decimal from "decimal.js";
import type { JSX } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

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
  step: number;
}): JSX.Element {
  const toFixedValue = step > 1 ? 0 : 2;
  const handleStep = (direction: "up" | "down") => {
    if (!value) value = "0";
    const num: Decimal = new Decimal(value);
    let newVal = direction === "up" ? num.plus(step) : num.sub(step);
    if (newVal.lt(0)) newVal = new Decimal(0);
    onChange(newVal.toFixed(toFixedValue));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div>{label}</div>
      <div className="relative flex items-center">
        <input
          className="w-full h-16 px-2 pr-12 rounded border text-lg"
          type="number"
          title={title || label}
          step={step}
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
          <button
            type="button"
            className="p-1 pb-[1px] rounded hover:bg-gray-200 active:scale-90 transition transform"
            onClick={() => handleStep("up")}
          >
            <ChevronUp size={18} />
          </button>
          <button
            type="button"
            className="p-1 pt-[1px] rounded hover:bg-gray-200 active:scale-90 transition transform"
            onClick={() => handleStep("down")}
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NumberInput;
