"use client";

import { useQuery } from "@tanstack/react-query";
import PieChart from "../Charts/PieChart";
import { METRICS_APP_API_URL } from "@/app/constants/api";

interface LanguageStat {
  language: string;
  percentage: number;
}

const fetchLanguageStats = async (): Promise<LanguageStat[]> => {
  const res = await fetch(`${METRICS_APP_API_URL}/language-chart`);
  if (!res.ok) throw new Error("Failed to fetch language stats");
  return res.json();
};

const LanguageChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["languageStats"],
    queryFn: fetchLanguageStats,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const labels = data?.map((item) => item.language) || [];
  const values = data?.map((item) => item.percentage) || [];

  return (
    <div className="w-full">
      <PieChart
        title="Languages"
        subtitle="May 11 2025 - May 30 2025"
        labels={labels}
        values={values}
      />
    </div>
  );
};

export default LanguageChart;
