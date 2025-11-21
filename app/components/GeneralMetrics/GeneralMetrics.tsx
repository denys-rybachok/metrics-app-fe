"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormControl, Select, MenuItem } from "@mui/material";
import Metric from "../Metric/Metric";
import useToast from "@/app/hooks/useToast";
import useDialog from "@/app/hooks/useDialog";
import MetricFormDialog from "../Metric/MetricFormDialog";
import { MetricEnum } from "@/app/enums/metric.enum";
import { getDatesForPeriod } from "@/app/services/dates.service";
import { PERIODS } from "@/app/constants/periods";

const GeneralMetrics = () => {
  const [period, setPeriod] = useState("currentWeek");
  const { openDialog, closeDialog } = useDialog();
  const { showSuccess } = useToast();
  const queryClient = useQueryClient();
  const { startDate, endDate } = getDatesForPeriod(period);

  const { data, isError } = useQuery({
    queryKey: ["generalMetrics", startDate, endDate],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/metrics/general?startDate=${startDate}&endDate=${endDate}`
      );
      if (!res.ok) throw new Error("Failed to fetch metrics");
      return res.json();
    },
  });

  const handleMetricClick = (label: string, value: number, key: MetricEnum) => {
    openDialog({
      title: `Edit ${label}`,
      content: (
        <MetricFormDialog
          value={value}
          keyName={key}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["generalMetrics"] });
            showSuccess("Metric updated successfully");
            closeDialog();
          }}
        />
      ),
    });
  };

  return (
    <div className="p-1 w-full">
      <div className="flex justify-between items-center mb-2">
        <p className="text-[13px] text-gray uppercase">General</p>
        <FormControl size="small">
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            size="small"
            variant="standard"
            sx={{
              fontSize: 12,
              py: "2px",
              px: "8px",
              ".MuiSelect-icon": { fontSize: 16 },
            }}
          >
            {PERIODS.map((p) => (
              <MenuItem key={p.value} value={p.value} sx={{ fontSize: 12 }}>
                {p.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {isError && <p className="text-sm text-red-500">Failed to load</p>}
      <div className="grid grid-cols-2 gap-2 mb-4 cursor-pointer">
        {Object.values(MetricEnum).map((enumKey) => {
          const label = enumKey.replace(/([A-Z])/g, " $1").trim();
          return (
            <Metric
              key={enumKey}
              label={label}
              value={data?.[enumKey]?.value}
              difference={data?.[enumKey]?.difference}
              onClick={() =>
                handleMetricClick(label, data?.[enumKey]?.value, enumKey)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default GeneralMetrics;
