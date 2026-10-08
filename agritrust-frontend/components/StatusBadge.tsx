interface StatusBadgeProps {
  moisture: number;
  backendStatus?: string;
}

export default function StatusBadge({
  moisture,
  backendStatus,
}: StatusBadgeProps) {
  const isSafe =
    moisture <= 14 ||
    backendStatus?.toLowerCase() === "safe";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold tracking-tight ${
        isSafe
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-yellow-200 bg-yellow-50 text-yellow-700"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isSafe ? "bg-green-500" : "bg-yellow-500"
        }`}
      />

      <span>
        {isSafe
          ? "Safe & e-NWR Minted"
          : "Drying in Progress"}
      </span>
    </div>
  );
}