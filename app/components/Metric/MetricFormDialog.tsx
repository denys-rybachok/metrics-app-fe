"use client";

import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { MetricEnum } from "@/app/enums/metric.enum";
import { METRICS_APP_API_URL } from "@/app/constants/api";

interface MetricFormDialogProps {
  value: number;
  keyName: MetricEnum;
  onSuccess: () => void;
}

const schema = yup.object({
  value: yup
    .number()
    .required("Value is required")
    .typeError("Value must be a number")
    .min(0, "Value cannot be negative"),
});

const MetricFormDialog = ({
  value,
  keyName,
  onSuccess,
}: MetricFormDialogProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { value },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchedValue = watch("value");

  const onSubmit = async (formData: { value: number }) => {
    if (formData.value === value) return;
    const res = await fetch(`${METRICS_APP_API_URL}/metrics/${keyName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: formData.value }),
    });
    if (!res.ok) throw new Error("Failed to update metric");
    onSuccess();
  };

  const isDisabled = Number(watchedValue) === value || !isValid;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-[300px]"
    >
      <Controller
        name="value"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="Value"
            type="number"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            size="small"
            inputProps={{ min: 0 }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        size="small"
        disabled={isDisabled}
      >
        Save
      </Button>
    </form>
  );
};

export default MetricFormDialog;
