import { useEffect, useState, type JSX } from "react";
import Chart from "./component/chart";

function LyingFlatCalculator(): JSX.Element {
  const [balance, setBalance] = useState<number>(0);
  const [balanceInput, setBalanceInput] = useState<string>("");
  useEffect(() => {
    if (isNaN(Number(balanceInput))) {
      setBalance(0);
    } else {
      setBalance(Number(balanceInput));
    }
  }, [balanceInput]);
  const [expense, setExpense] = useState<number>(0);
  const [expenseInput, setExpenseInput] = useState<string>("");
  useEffect(() => {
    if (isNaN(Number(expenseInput))) {
      setExpense(0);
    } else {
      setExpense(Number(expenseInput));
    }
  }, [expenseInput]);
  const [inflationRate, setInflationRate] = useState<number>(0.03);
  const [inflationRateInput, setInflationRateInput] = useState<string>("0.03");
  useEffect(() => {
    if (isNaN(Number(inflationRateInput))) {
      setInflationRateInput("0.03");
    } else {
      setInflationRate(Number(inflationRateInput));
    }
  }, [inflationRateInput]);
  const [investmentReturnRate, setInvestmentReturnRate] = useState<number>(0);
  const [investmentReturnRateInput, setInvestmentReturnRateInput] =
    useState<string>("");
  useEffect(() => {
    if (isNaN(Number(investmentReturnRateInput))) {
      setInvestmentReturnRateInput("0");
    } else {
      setInvestmentReturnRate(Number(investmentReturnRateInput));
    }
  }, [investmentReturnRateInput]);
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex flex-row gap-5 p-5">
        <input
          title="初始资金"
          type="number"
          step={1000}
          min={0}
          value={balanceInput}
          onChange={(e) => setBalanceInput(e.target.value)}
        />
        <input
          title="（预计）今年支出"
          type="number"
          step={1000}
          min={0}
          value={expenseInput}
          onChange={(e) => setExpenseInput(e.target.value)}
        />
        <input
          title="年通膨率"
          type="number"
          step={0.01}
          min={0}
          value={inflationRateInput}
          onChange={(e) => setInflationRateInput(e.target.value)}
        />
        <input
          title="年化收益率"
          type="number"
          step={0.01}
          min={0}
          value={investmentReturnRateInput}
          onChange={(e) => setInvestmentReturnRateInput(e.target.value)}
        />
      </div>
      <Chart
        balance={balance}
        expense={expense}
        inflationRate={inflationRate}
        investmentReturnRate={investmentReturnRate}
      />
    </div>
  );
}

export default LyingFlatCalculator;
