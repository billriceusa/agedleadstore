interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
}

export function MetricCard({ title, value, description, className = '' }: MetricCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
}
