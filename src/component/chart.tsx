import { useEffect, useRef, type JSX } from "react";
import * as echarts from "echarts";

function Chart({
  balance,
  expense,
  inflationRate,
  investmentReturnRate,
}: {
  balance: number;
  expense: number;
  inflationRate: number;
  investmentReturnRate: number;
}): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 模拟每年资产计算
    const leftBalance: number[] = [balance];
    let currentBalance = balance;
    let currentExpense = expense;

    while (currentBalance > 0 && leftBalance.length < 1000) {
      currentExpense *= 1 + inflationRate;
      currentBalance -= currentExpense;
      currentBalance *= 1 + investmentReturnRate;
      if (currentBalance < 0) currentBalance = 0;
      leftBalance.push(currentBalance);
    }

    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      xAxis: {
        type: "category",
        data: leftBalance.map((_, i) => i), // 年数
      },
      yAxis: {
        type: "value",
        name: "剩余资产",
      },
      series: [
        {
          data: leftBalance,
          type: "line",
          smooth: true,
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, [balance, expense, inflationRate, investmentReturnRate]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
}

export default Chart;
