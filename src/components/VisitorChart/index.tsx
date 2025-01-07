"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { toast } from "sonner";
import fetchWithAuth from "@/utilities/fetchWithAuth";
import { BASE_API } from "@/utilities/environment";
import { useEffect, useState } from "react";

const chartConfig = {
  reservations: {
    label: "Reservations",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartDataType {
  month: string;
  reservations: number;
}

interface YearlyAnalytic {
  period: string;
  trend_percentage: number;
  monthly_reservation: ChartDataType[];
}

export function VisitorChart() {
  const [analyticData, setAnalyticData] = useState<YearlyAnalytic>();
  const [isTrendingUp, setIsTrendingUp] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetchWithAuth(
        BASE_API + "/partner/analytic/reservation/yearly",
        {
          method: "GET",
        }
      );

      const data = await res.json();
      if (res.ok) {
        setAnalyticData(data.data);
        setIsTrendingUp(data.data.trend_percentage >= 0);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className="w-full h-full bg-slate-50 rounded-lg p-2 shadow-lg shadow-sky-800/30">
      <CardHeader>
        <CardTitle>Reservation Analytics</CardTitle>
        <CardDescription>{analyticData?.period}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={analyticData?.monthly_reservation}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="reservations"
              type="linear"
              stroke="var(--color-reservations)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div
          className={`flex gap-2 font-medium leading-none ${
            isTrendingUp ? "text-emerald-500" : "text-red-500"
          }`}
        >
          Trending {isTrendingUp ? "Up" : "Down"} by{" "}
          {analyticData?.trend_percentage}% this month{" "}
          {isTrendingUp ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total reservations for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
