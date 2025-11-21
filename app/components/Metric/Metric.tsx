interface MetricProps {
  label: string;
  value: number;
  onClick: () => void;
  difference?: number;
}

const Metric = ({ label, value, difference, onClick }: MetricProps) => {
  const diffColor =
    difference && difference > 0
      ? "text-[#34C759]"
      : difference && difference < 0
      ? "text-[#FF3B30]"
      : "text-gray-500";

  return (
    <div className="mb-1" onClick={onClick}>
      <div className="flex items-center gap-2">
        <p className="text-[16px] font-semibold">{value ?? "-"}</p>
        {difference ? (
          <p className={`text-[12px] font-medium ${diffColor}`}>
            {difference > 0 ? "+" : ""}
            {difference}
          </p>
        ) : null}
      </div>
      <div className="text-[12px] text-gray-secondary">{label}</div>
    </div>
  );
};

export default Metric;
