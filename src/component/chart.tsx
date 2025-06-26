import { useEffect, useRef, useState, type JSX } from "react";
import * as echarts from "echarts";

function Chart({
  balance,
  expense,
  inflationRate,
  investmentReturnRate,
}: {
  balance: number | null;
  expense: number | null;
  inflationRate: number | null;
  investmentReturnRate: number | null;
}): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState<number>(0);
  const [isValid, setIsVaild] = useState<boolean>(false);

  useEffect(() => {
    console.log(balance, expense, inflationRate, investmentReturnRate);
    if (
      balance == null ||
      expense == null ||
      inflationRate == null ||
      investmentReturnRate == null
    ) {
      setIsVaild(false);
      return;
    }
    setIsVaild(true);
    const data: [number, number][] = [[0, balance]];
    let currentBalance = balance;
    let currentExpense = expense;

    while (currentBalance > 0 && data.length < 100) {
      if (currentBalance - currentExpense >= 0) {
        currentBalance -= currentExpense;
        currentExpense *= 1 + inflationRate;
        currentBalance *= 1 + investmentReturnRate;
        data.push([data.length, currentBalance]);
      } else {
        const lastyear = currentBalance / currentExpense + data.length;
        data.push([lastyear, 0]);
        currentBalance = 0;
      }
    }
    if (data.length == 100 && data[data.length - 1][1] > 0) {
      setYear(101);
    } else {
      setYear(data[data.length - 1][0]);
    }

    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      xAxis: {
        name: "年数",
      },
      yAxis: {
        name: "剩余资金",
      },
      series: [
        {
          data: data,
          type: "line",
          smooth: true,
        },
      ],
    });

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [balance, expense, inflationRate, investmentReturnRate]);

  return (
    <>
      {isValid ? (
        year > 100 ? (
          <div>还能活超过 100 年</div>
        ) : (
          <div>还能活 {year} 年</div>
        )
      ) : (
        <div>数据不完整，无法计算</div>
      )}
      <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
    </>
  );
}

export default Chart;
