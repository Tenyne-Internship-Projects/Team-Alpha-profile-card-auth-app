import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Type definitions
interface EarningsData {
  month: string;
  earnings: number;
  fullMonth: string;
}

interface EarningsChartProps {
  monthlyEarnings?: Array<{ month: string; total: number }>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: EarningsData;
    value: number;
  }>;
  label?: string;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: EarningsData;
}

type TimePeriod = "All time" | "Last 6 Months";

interface PeriodButtonProps {
  period: TimePeriod;
  selectedPeriod: TimePeriod;
  onSelect: (period: TimePeriod) => void;
}

const EarningsChart: React.FC<EarningsChartProps> = ({
  monthlyEarnings = [],
}) => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<TimePeriod>("Last 6 Months");

  // Transform the API data to match the expected format
  const transformEarningsData = (
    data: Array<{ month: string; total: number }>
  ): EarningsData[] => {
    return data.map((item) => {
      const date = new Date(item.month + "-01"); // Add day to make it a valid date
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      return {
        month: date.toLocaleDateString("en-US", { month: "short" }),
        earnings: item.total,
        fullMonth: monthNames[date.getMonth()],
      };
    });
  };

  const earningsData: EarningsData[] =
    monthlyEarnings.length > 0
      ? transformEarningsData(monthlyEarnings)
      : [
          { month: "Jan", earnings: 45, fullMonth: "January" },
          { month: "Feb", earnings: 210, fullMonth: "February" },
          { month: "Mar", earnings: 85, fullMonth: "March" },
          { month: "Apr", earnings: 120, fullMonth: "April" },
          { month: "May", earnings: 75, fullMonth: "May" },
          { month: "Jun", earnings: 165, fullMonth: "June" },
          { month: "Jul", earnings: 95, fullMonth: "July" },
        ];

  //   const fetchEarningsGraph = async () => {
  //     try {
  //       const res = await axios.get("/freelancer-dashboard/earnings-graph");
  //       console.log(res);
  //     } catch (err) {
  //       const error = err as AxiosError;
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchEarningsGraph();
  //   }, []);

  // Custom tooltip component
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    // label,
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-purple-600 text-white px-3 py-2 rounded-lg shadow-lg relative">
          <div className="text-sm font-medium">{data.fullMonth}</div>
          <div className="text-lg font-bold">${data.earnings}</div>
          {/* Tooltip arrow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-600"></div>
        </div>
      );
    }
    return null;
  };

  // Custom dot component for active point
  const CustomDot: React.FC<CustomDotProps> = ({ cx, cy, payload }) => {
    if (cx && cy && payload?.month === "Feb") {
      return (
        <g>
          {/* White outer circle */}
          <circle
            cx={cx}
            cy={cy}
            r="6"
            fill="white"
            stroke="#22c55e"
            strokeWidth="2"
          />
          {/* Green inner circle */}
          <circle cx={cx} cy={cy} r="3" fill="#22c55e" />
        </g>
      );
    }
    return null;
  };

  // Period selection button component
  const PeriodButton: React.FC<PeriodButtonProps> = ({
    period,
    selectedPeriod,
    onSelect,
  }) => {
    const isActive = selectedPeriod === period;
    const colorClass = period === "Last 6 Months" ? "green" : "gray";

    return (
      <button
        className={`flex items-center space-x-2 text-sm ${
          isActive ? `text-${colorClass}-600` : "text-gray-400"
        }`}
        onClick={() => onSelect(period)}
        type="button"
      >
        <div
          className={`w-2 h-2 rounded-full ${
            isActive ? `bg-${colorClass}-600` : "bg-gray-300"
          }`}
        ></div>
        <span>{period}</span>
      </button>
    );
  };

  const handlePeriodChange = (period: TimePeriod): void => {
    setSelectedPeriod(period);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Earnings</h2>
        <div className="flex items-center space-x-4">
          <PeriodButton
            period="All time"
            selectedPeriod={selectedPeriod}
            onSelect={handlePeriodChange}
          />
          <PeriodButton
            period="Last 6 Months"
            selectedPeriod={selectedPeriod}
            onSelect={handlePeriodChange}
          />
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={earningsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke="#f3f4f6"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              domain={[0, 400]}
              ticks={[0, 100, 200, 400]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#22c55e",
                strokeWidth: 2,
                strokeDasharray: "5 5",
              }}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#22c55e"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom border accent */}
      <div className="mt-4 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
    </div>
  );
};

export default EarningsChart;
