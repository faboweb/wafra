"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Input from "./input";

interface DataPoint {
  year: number;
  initialInvestment: number;
  contributions: number;
  interestEarned: number;
}

export default function CompoundInterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);

  const data = useMemo(() => {
    const result: DataPoint[] = [];
    let balance = initialInvestment;
    let totalContributions = initialInvestment;
    const years = 20;
    const annualReturn = 0.1; // 10%

    for (let year = 0; year <= years; year++) {
      const yearlyContribution = year === 0 ? 0 : monthlyInvestment * 12;
      const interestEarned = balance * annualReturn;
      balance += interestEarned + yearlyContribution;
      totalContributions += yearlyContribution;

      result.push({
        year,
        initialInvestment,
        contributions: Number(
          (totalContributions - initialInvestment).toFixed(2)
        ),
        interestEarned: Number((balance - totalContributions).toFixed(2)),
      });
    }

    return result;
  }, [initialInvestment, monthlyInvestment]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div>
      <h2>
        <b>See the difference</b>
      </h2>
      <ResponsiveContainer width={300} height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 90, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          {/* <YAxis tickFormatter={(value) => formatCurrency(value)} /> */}
          {/* <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value: number) => formatCurrency(value)}
              />
            }
          /> */}
          <Legend />
          <Area
            type="monotone"
            dataKey="initialInvestment"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
            name="Initial Investment"
            legendType="none"
          />
          <Area
            type="monotone"
            dataKey="contributions"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
            name="Without Wafra"
          />
          <Area
            type="monotone"
            dataKey="interestEarned"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
            name="With Wafra"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex space-x-4 mt-8">
        <Input
          id="initialInvestment"
          label="Initial Investment"
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(Number(e.target.value))}
        />
        <Input
          id="contributions"
          label="Monthly Investment"
          type="number"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
