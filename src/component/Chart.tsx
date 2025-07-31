import { useEffect, useRef, useState, type JSX } from "react";
import * as echarts from "echarts";
import Decimal from "decimal.js";

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
    if (balance == null || expense == null || inflationRate == null || investmentReturnRate == null) {
      setIsVaild(false);
      return;
    }
    setIsVaild(true);
    const data: [number, number][] = [[0, balance]];
    let currentBalance: Decimal = new Decimal(balance);
    let currentExpense: Decimal = new Decimal(expense);

    while (currentBalance.gt(0) && data.length <= 100) {
      if (currentBalance.sub(currentExpense).gte(0)) {
        currentBalance = currentBalance.sub(currentExpense);
        currentExpense = currentExpense.mul(new Decimal(inflationRate).div(100).plus(1));
        currentBalance = currentBalance.mul(new Decimal(investmentReturnRate).div(100).plus(1));
        data.push([data.length, currentBalance.toNumber()]);
      } else {
        const lastyear: Decimal = currentBalance.div(currentExpense).plus(data.length - 1);
        data.push([lastyear.toNumber(), 0]);
        currentBalance = new Decimal(0);
      }
    }
    if (data.length == 101 && data[data.length - 1][1] > 0) {
      setYear(101);
    } else {
      setYear(data[data.length - 1][0]);
    }

    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const width = chartRef.current?.clientWidth || 0;
    chart.setOption({
      grid: {
        left: width < 640 ? 70 : 88,
        right: 40,
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: Array<{ value: [number, number] }>): string => {
          const value = params[0].value;
          const year = value[0];
          const leftBalance = value[1];
          return Number(year.toFixed(2)) + " 年后剩余 " + leftBalance.toFixed(2) + " 元";
        },
      },
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
      const width = chartRef.current?.clientWidth || 0;
      chart.setOption({
        grid: {
          left: width < 640 ? 70 : 88,
        },
      });
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
          <div>还能活 {Number(year.toFixed(2))} 年</div>
        )
      ) : (
        <div>数据不完整，无法计算</div>
      )}
      <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
    </>
  );
}

export default Chart;
