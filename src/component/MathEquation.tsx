import { MathJax, MathJaxContext } from "better-react-mathjax";
import type { JSX } from "react";

function MathEquation({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div>
      <p>{label}</p>
      <MathJaxContext
        config={{
          loader: { load: ["input/tex", "output/chtml"] },
          options: {
            renderActions: {
              addMenu: [],
            },
          },
        }}
      >
        <MathJax key={value} className="select-none">
          {value}
        </MathJax>
      </MathJaxContext>
    </div>
  );
}

export default MathEquation;
