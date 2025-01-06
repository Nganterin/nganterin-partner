"use client";

import { TrendingUp } from "lucide-react";
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

export function VisitorChart() {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetchWithAuth(
        BASE_API + "/partner/analytic/monthly-reservation",
        {
          method: "GET",
        }
      );

      const data = await res.json();
      if (res.ok) {
        setChartData(data.data);
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
        <CardDescription>
          {chartData[0]?.month} - {chartData[chartData.length - 1]?.month}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
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
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total reservations for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
