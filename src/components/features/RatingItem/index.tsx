interface Props {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  onChange?: (value: number) => void;
}

export function RatingItem({
  label,
  value,
  description,
  icon,
  onChange,
}: Props) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 text-gray-600 flex-shrink-0">{icon}</div>

      <div className="flex-grow">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium">{label}</span>
          <span className="text-sm text-gray-600">{value.toFixed(1)}</span>
        </div>

        <div className="relative h-2 bg-gray-100 rounded-full mb-2">
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{ width: `${(value / 5) * 100}%` }}
          />
        </div>

        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
