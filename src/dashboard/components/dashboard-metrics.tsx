import { Activity, Flame, FootprintsIcon, Heart, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, icon }: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export const DashboardMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <MetricCard
        title="Calories"
        value="2,345"
        icon={<Flame className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Heart Rate"
        value="72 bpm"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Steps"
        value="8,946"
        icon={<FootprintsIcon className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Progress"
        value="68%"
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Meal Plan"
        value="On Track"
        icon={<Utensils className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};
