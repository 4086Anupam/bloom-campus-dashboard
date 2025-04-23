
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus, Search, Trash, FileUp, FileText, FileVideo, BookOpen, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type definitions
interface Material {
  id: string;
  title: string;
  description: string;
  type: "notes" | "video" | "document";
  subject: string;
  uploadDate: Date;
  fileSize?: string;
  downloadCount: number;
}

interface Subject {
  id: string;
  name: string;
}

export default function TeacherMaterialsPage() {
  // Form state for adding new material
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Modals state
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  
  const { toast } = useToast();
  
  // Sample subjects
  const subjects: Subject[] = [
    { id: "1", name: "Database Systems" },
    { id: "2", name: "Data Structures" },
    { id: "3", name: "Algorithms" },
    { id: "4", name: "Web Development" },
    { id: "5", name: "Operating Systems" },
  ];
  
  // Sample materials data
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: "1",
      title: "Database Normalization",
      description: "Comprehensive guide to database normalization forms",
      type: "document",
      subject: "Database Systems",
      uploadDate: new Date("2025-04-20"),
      fileSize: "2.4 MB",
      downloadCount: 45
    },
    {
      id: "2",
      title: "Recursion Examples",
      description: "Examples of recursion in programming with solutions",
      type: "notes",
      subject: "Data Structures",
      uploadDate: new Date("2025-04-19"),
      fileSize: "1.2 MB",
      downloadCount: 32
    },
    {
      id: "3",
      title: "SQL Joins Tutorial",
      description: "Video tutorial explaining different types of SQL joins",
      type: "video",
      subject: "Database Systems",
      uploadDate: new Date("2025-04-18"),
      fileSize: "45 MB",
      downloadCount: 28
    },
    {
      id: "4",
      title: "Algorithm Analysis",
      description: "Introduction to time and space complexity analysis",
      type: "document",
      subject: "Algorithms",
      uploadDate: new Date("2025-04-17"),
      fileSize: "3.5 MB",
      downloadCount: 56
    },
    {
      id: "5",
      title: "Web Development Basics",
      description: "Introduction to HTML, CSS, and JavaScript",
      type: "notes",
      subject: "Web Development",
      uploadDate: new Date("2025-04-16"),
      fileSize: "1.8 MB",
      downloadCount: 40
    },
  ]);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !type || !subject || !file) {
      toast({
        title: "Form incomplete",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create new material
    const newMaterial: Material = {
      id: (materials.length + 1).toString(),
      title,
      description,
      type: type as "notes" | "video" | "document",
      subject,
      uploadDate: new Date(),
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      downloadCount: 0
    };
    
    // Add to materials
    setMaterials([newMaterial, ...materials]);
    
    // Reset form
    setTitle("");
    setDescription("");
    setType("");
    setSubject("");
    setFile(null);
    setAddDialogOpen(false);
    
    toast({
      title: "Material uploaded",
      description: "Your study material has been successfully uploaded",
    });
  };
  
  // Handle material deletion
  const handleDelete = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
    toast({
      title: "Material deleted",
      description: "The study material has been removed",
    });
  };
  
  // Filter materials based on search term and type
  const filterMaterials = (materialsList: Material[], type?: string) => {
    let filtered = materialsList;
    
    // Filter by type if provided
    if (type && type !== "all") {
      filtered = filtered.filter(material => material.type === type);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(material => 
        material.title.toLowerCase().includes(term) || 
        material.description.toLowerCase().includes(term) || 
        material.subject.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  // Get icon based on material type
  const getIcon = (type: string) => {
    switch (type) {
      case "notes":
        return <BookOpen className="h-5 w-5" />;
      case "video":
        return <FileVideo className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Layout userRole="teacher">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-1 h-4 w-4" />
                  Upload Material
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Study Material</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter material title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="material-type">Material Type</Label>
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger id="material-type">
                        <SelectValue placeholder="Select material type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notes">Notes</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject} required>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.name}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter brief description"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">File</Label>
                    <div className="border-2 border-dashed rounded-md p-4">
                      {!file ? (
                        <div className="flex flex-col items-center justify-center py-4">
                          <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Upload a file</p>
                          <p className="text-xs text-muted-foreground">PDF, DOCX, MP4, or other formats</p>
                          <Input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <Button 
                            variant="outline" 
                            className="mt-2"
                            onClick={() => document.getElementById("file-upload")?.click()}
                            type="button"
                          >
                            Select File
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-secondary/50 p-3 rounded-md flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => setFile(null)}
                            type="button"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">Upload Material</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {filterMaterials(materials).length === 0 ? (
              <DashboardCard title="No Materials Found">
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No study materials found</p>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm ? "Try a different search term" : "Upload materials using the button above"}
                  </p>
                </div>
              </DashboardCard>
            ) : (
              filterMaterials(materials).map((material) => (
                <MaterialCard 
                  key={material.id} 
                  material={material} 
                  onDelete={() => handleDelete(material.id)} 
                />
              ))
            )}
          </TabsContent>

          {["notes", "videos", "document"].map((tabType) => (
            <TabsContent key={tabType} value={tabType} className="space-y-4 mt-4">
              {filterMaterials(materials, tabType === "videos" ? "video" : tabType).length === 0 ? (
                <DashboardCard title={`No ${tabType} Found`}>
                  <div className="flex flex-col items-center justify-center py-8">
                    {getIcon(tabType === "videos" ? "video" : tabType)}
                    <p className="text-lg font-medium mt-4">No {tabType} found</p>
                    <p className="text-sm text-muted-foreground">
                      {searchTerm ? "Try a different search term" : `Upload ${tabType} using the button above`}
                    </p>
                  </div>
                </DashboardCard>
              ) : (
                filterMaterials(materials, tabType === "videos" ? "video" : tabType).map((material) => (
                  <MaterialCard 
                    key={material.id} 
                    material={material} 
                    onDelete={() => handleDelete(material.id)} 
                  />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}

// Material Card Component
const MaterialCard = ({ material, onDelete }: { material: Material, onDelete: () => void }) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex gap-3 flex-1">
          <div className="mt-1">
            {material.type === "notes" && <BookOpen className="h-5 w-5 text-blue-500" />}
            {material.type === "video" && <FileVideo className="h-5 w-5 text-red-500" />}
            {material.type === "document" && <FileText className="h-5 w-5 text-amber-500" />}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{material.title}</h3>
            <p className="text-sm text-muted-foreground">{material.subject}</p>
            <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Badge variant="outline">{material.type}</Badge>
              <span className="text-xs text-muted-foreground">
                Uploaded on {material.uploadDate.toLocaleDateString()}
              </span>
              <span className="text-xs text-muted-foreground">
                {material.fileSize} • {material.downloadCount} downloads
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-end sm:self-start">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={onDelete}>
            <Trash className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
