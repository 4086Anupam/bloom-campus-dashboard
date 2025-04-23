
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { BookOpen, FileText, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MaterialCard {
  id: string;
  title: string;
  type: "notes" | "video" | "document";
  subject: string;
  uploadedBy: string;
  date: string;
}

const demoMaterials: MaterialCard[] = [
  {
    id: "1",
    title: "Introduction to Data Structures",
    type: "notes",
    subject: "Computer Science",
    uploadedBy: "Dr. Sarah Johnson",
    date: "2025-04-20",
  },
  {
    id: "2",
    title: "Algorithm Analysis Video Lecture",
    type: "video",
    subject: "Computer Science",
    uploadedBy: "Dr. Michael Chen",
    date: "2025-04-19",
  },
  {
    id: "3",
    title: "Programming Fundamentals PDF",
    type: "document",
    subject: "Computer Science",
    uploadedBy: "Prof. Robert Smith",
    date: "2025-04-18",
  },
];

const MaterialCard = ({ material }: { material: MaterialCard }) => {
  const getIcon = () => {
    switch (material.type) {
      case "notes":
        return <BookOpen className="h-5 w-5" />;
      case "video":
        return <FileVideo className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="mt-1">{getIcon()}</div>
          <div>
            <h3 className="font-medium">{material.title}</h3>
            <p className="text-sm text-muted-foreground">{material.subject}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline">{material.type}</Badge>
              <span className="text-sm text-muted-foreground">
                By {material.uploadedBy}
              </span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Download
        </Button>
      </div>
    </Card>
  );
};

export default function StudyMaterialsPage() {
  return (
    <Layout userRole="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {demoMaterials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </TabsContent>

          <TabsContent value="notes" className="space-y-4 mt-4">
            {demoMaterials
              .filter((m) => m.type === "notes")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </TabsContent>

          <TabsContent value="videos" className="space-y-4 mt-4">
            {demoMaterials
              .filter((m) => m.type === "video")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4 mt-4">
            {demoMaterials
              .filter((m) => m.type === "document")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
