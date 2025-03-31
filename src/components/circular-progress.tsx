import { FC } from "react";

const CircularProgress: FC<{ value: number }> = ({ value }) => {
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          className="text-muted-foreground/20"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="48"
          cy="48"
        />
        <circle
          className="text-primary transition-all duration-300 ease-in-out"
          strokeWidth="8"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={isNaN(strokeDashoffset) ? 0 : strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="48"
          cy="48"
        />
      </svg>
      <div className="absolute text-sm font-medium">{Math.round(value)}%</div>
    </div>
  );
};

CircularProgress.displayName = "CircularProgress";

export default CircularProgress;
