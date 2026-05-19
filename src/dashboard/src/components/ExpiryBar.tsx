interface Props {
  percent: number;
  daysUntilExpiry: number;
}

export default function ExpiryBar({ percent, daysUntilExpiry }: Props) {
  const color =
    daysUntilExpiry < 0
      ? 'bg-red-600'
      : daysUntilExpiry <= 14
      ? 'bg-yellow-500'
      : daysUntilExpiry <= 30
      ? 'bg-orange-500'
      : 'bg-green-500';

  return (
    <div className="w-full bg-gray-700 rounded-full h-1.5">
      <div
        className={`h-1.5 rounded-full transition-all ${color}`}
        style={{ width: `${Math.min(100, percent)}%` }}
      />
    </div>
  );
}
