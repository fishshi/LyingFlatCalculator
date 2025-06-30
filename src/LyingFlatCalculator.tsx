import { useEffect, useState, type JSX } from "react";
import Chart from "./component/chart";

function LyingFlatCalculator(): JSX.Element {
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceInput, setBalanceInput] = useState<string>("");
  useEffect(() => {
    if (balanceInput == "" || isNaN(Number(balanceInput))) {
      setBalance(null);
    } else {
      setBalance(Number(balanceInput));
    }
  }, [balanceInput]);
  const [expense, setExpense] = useState<number | null>(null);
  const [expenseInput, setExpenseInput] = useState<string>("");
  useEffect(() => {
    if (expenseInput == "" || isNaN(Number(expenseInput))) {
      setExpense(null);
    } else {
      setExpense(Number(expenseInput));
    }
  }, [expenseInput]);
  const [inflationRate, setInflationRate] = useState<number | null>(0.03);
  const [inflationRateInput, setInflationRateInput] = useState<string>("0.03");
  useEffect(() => {
    if (inflationRateInput == "" || isNaN(Number(inflationRateInput))) {
      setInflationRate(null);
    } else {
      setInflationRate(Number(inflationRateInput));
    }
  }, [inflationRateInput]);
  const [investmentReturnRate, setInvestmentReturnRate] = useState<
    number | null
  >(null);
  const [investmentReturnRateInput, setInvestmentReturnRateInput] =
    useState<string>("");
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-8">
        <div className="flex flex-grow flex-col gap-2">
          <div>初始资金</div>
          <input
            className="w-full h-16 px-2 rounded border text-lg"
            title="初始资金"
            type="number"
            step={1000}
            min={0}
            value={balanceInput}
            onChange={(e) => setBalanceInput(e.target.value)}
          />
        </div>
        <div className="flex flex-grow flex-col gap-2">
          <div>年支出（初始）</div>
          <input
            className="w-full h-16 px-2 rounded border text-lg"
            title="（预计）今年支出"
            type="number"
            step={1000}
            min={0}
            value={expenseInput}
            onChange={(e) => setExpenseInput(e.target.value)}
          />
        </div>
        <div className="flex flex-grow flex-col gap-2">
          <div>年通膨率</div>
          <input
            className="w-full h-16 px-2 rounded border text-lg"
            title="年通膨率（推荐记为0.03）"
            type="number"
            step={0.01}
            min={0}
            value={inflationRateInput}
            onChange={(e) => setInflationRateInput(e.target.value)}
          />
        </div>
        <div className="flex flex-grow flex-col gap-2">
          <div>投资年化收益率</div>
          <input
            className="w-full h-16 px-2 rounded border text-lg"
            title="年化收益率"
            type="number"
            step={0.01}
            min={0}
            value={investmentReturnRateInput}
            onChange={(e) => setInvestmentReturnRateInput(e.target.value)}
          />
        </div>
      </div>
      <div className="px-8">
        参考公式： 第 n 年的剩余资金 = (第 n-1 年的剩余资金 - 初始年支出 * (1 +
        年通膨率) ^ (n - 1)) * (1 + 投资年化收益率)
      </div>
      <div className="px-8">
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
