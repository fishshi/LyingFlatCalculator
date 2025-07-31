import { useEffect, useState, type JSX } from "react";
import Chart from "./component/Chart";
import NumberInput from "./component/NumberInput";
import MathEquation from "./component/MathEquation";
import usePersistentState from "./hook/usePersistentState";

function LyingFlatCalculator(): JSX.Element {
  const [balance, setBalance] = useState<number | null>(3000000);
  const [balanceInput, setBalanceInput] = usePersistentState<string>(
    "balanceInput",
    "3000000"
  );
  useEffect(() => {
    if (balanceInput == "" || isNaN(Number(balanceInput))) {
      setBalance(null);
    } else {
      setBalance(Number(balanceInput));
    }
  }, [balanceInput]);

  const [expense, setExpense] = useState<number | null>(60000);
  const [expenseInput, setExpenseInput] = usePersistentState<string>(
    "expenseInput",
    "60000"
  );
  useEffect(() => {
    if (expenseInput == "" || isNaN(Number(expenseInput))) {
      setExpense(null);
    } else {
      setExpense(Number(expenseInput));
    }
  }, [expenseInput]);

  const [inflationRate, setInflationRate] = useState<number | null>(3.0);
  const [inflationRateInput, setInflationRateInput] =
    usePersistentState<string>("inflationRateInput", "3.00");
  useEffect(() => {
    if (inflationRateInput == "" || isNaN(Number(inflationRateInput))) {
      setInflationRate(null);
    } else {
      setInflationRate(Number(inflationRateInput));
    }
  }, [inflationRateInput]);

  const [investmentReturnRate, setInvestmentReturnRate] = useState<
    number | null
  >(2.0);
  const [investmentReturnRateInput, setInvestmentReturnRateInput] =
    usePersistentState<string>("investmentReturnRateInput", "2.00");
  useEffect(() => {
    if (
      investmentReturnRateInput == "" ||
      isNaN(Number(investmentReturnRateInput))
    ) {
      setInvestmentReturnRate(null);
    } else {
      setInvestmentReturnRate(Number(investmentReturnRateInput));
    }
  }, [investmentReturnRateInput]);

  const largeEquation = String.raw`
              \[
                \text{第 n 年剩余资金} = (\text{第 n 年初始资金} - \text{初始支出} \cdot (1 + \text{通膨率})^{n - 1}) \cdot (1 + \text{年化收益率})
              \]
            `;
  const middleEquation = String.raw`
              \[
                \begin{align}
                  &\text{第 n 年剩余资金} \\
                  &\quad = (\text{第 n 年初始资金} - \text{初始支出} \cdot (1 + \text{通膨率})^{n - 1}) \cdot (1 + \text{年化收益率})
                \end{align}
              \]
            `;
  const smallEquation = String.raw`
              \[
                \begin{align}
                  &\text{第 n 年剩余资金} \\
                  &= (\text{第 n 年初始资金} - \text{初始支出} \cdot (1 + \text{通膨率})^{n - 1}) \\
                  &\quad \quad \cdot \; (1 + \text{年化收益率})
                \end{align}
              \]
            `;
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const renderedEquation = (() => {
    if (windowWidth >= 768) return largeEquation;
    if (windowWidth >= 640) return middleEquation;
    return smallEquation;
  })();
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-grow justify-between">
        <div className="text-3xl font-bold">躺平计算器</div>
        <a
          href="https://github.com/fishshi/LyingFlatCalculator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg height="36" width="36" viewBox="0 0 24 24">
            <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 sm:p-8">
        <NumberInput
          label="初始资金"
          value={balanceInput}
          onChange={setBalanceInput}
          title="初始资金"
          step={10000}
        />
        <NumberInput
          label="年支出（初始）"
          value={expenseInput}
          onChange={setExpenseInput}
          title="（预计）今年支出"
          step={1000}
        />
        <NumberInput
          label="年通膨率%"
          value={inflationRateInput}
          onChange={setInflationRateInput}
          title="年通膨率%（推荐记为3.00）"
          step={0.01}
        />
        <NumberInput
          label="投资年化收益率%"
          value={investmentReturnRateInput}
          onChange={setInvestmentReturnRateInput}
          title="年化收益率%"
          step={0.01}
        />
      </div>
      <div className="px-6 sm:px-8">
        <MathEquation value={renderedEquation} label="参考公式: " />
      </div>
      <div className="px-6 sm:px-8">
        <Chart
          balance={balance}
          expense={expense}
          inflationRate={inflationRate}
          investmentReturnRate={investmentReturnRate}
        />
      </div>
    </div>
  );
}

export default LyingFlatCalculator;
