"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GeneralMetrics from "../components/GeneralMetrics/GeneralMetrics";
import LanguageChart from "../components/LanguageChart/LanguageChart";

const queryClient = new QueryClient();

const HomePageWidget = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center m-auto flex-col w-[390px]">
        <GeneralMetrics />
        <LanguageChart />
      </div>
    </QueryClientProvider>
  );
};

export default HomePageWidget;
