
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface NoticeCardProps {
  title: string;
  content: string;
  date: Date;
  category?: string;
  isPinned?: boolean;
  isNew?: boolean;
  hasAttachment?: boolean;
  className?: string;
}

export function NoticeCard({
  title,
  content,
  date,
  category,
  isPinned,
  isNew,
  hasAttachment,
  className,
}: NoticeCardProps) {
  return (
    <Card className={cn("overflow-hidden border", className, isPinned ? "border-l-4 border-l-primary" : "")}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              {formatDistanceToNow(date, { addSuffix: true })}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {category && (
              <Badge variant="secondary">{category}</Badge>
            )}
            {isNew && (
              <Badge className="bg-green-500">New</Badge>
            )}
            {isPinned && (
              <Badge className="bg-amber-500">Pinned</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
      {hasAttachment && (
        <CardFooter className="p-4 pt-0 flex justify-start">
          <Button variant="outline" size="sm" className="text-xs">
            <FileText className="mr-1 h-3 w-3" />
            View Attachment
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
