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
      <div className="text-3xl font-bold">躺平计算器</div>
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
      <div className='px-8'>
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
