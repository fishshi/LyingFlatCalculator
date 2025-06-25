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
    const data: [number, number][] = [[0, balance]];
    let currentBalance = balance;
    let currentExpense = expense;

    while (currentBalance > 0 && data.length < 100) {
      currentExpense *= 1 + inflationRate;
      currentBalance -= currentExpense;
      currentBalance *= 1 + investmentReturnRate;
      if (currentBalance >= 0) {
        data.push([data.length, currentBalance]);
      } else {
        // To do
      }
    }

    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      xAxis: {
        name: "年数",
      },
      yAxis: {
        name: "剩余资产",
      },
      series: [
        {
          data: data,
          type: "line",
          smooth: true,
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, [balance, expense, inflationRate, investmentReturnRate]);

  return (
    <>
      <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
    </>
  );
}

export default Chart;
