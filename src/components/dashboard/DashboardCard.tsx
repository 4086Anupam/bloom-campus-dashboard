
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function DashboardCard({
  title,
  description,
  children,
  className,
  action,
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </div>
        {action}
      </CardHeader>
      <CardContent className="px-6 py-4">
        {children}
      </CardContent>
    </Card>
  );
}
