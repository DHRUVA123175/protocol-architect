import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyzingLoader } from "@/components/ui/LoadingSpinner";
import { Sparkles, FileText, Target, Stethoscope, FlaskConical } from "lucide-react";

const diseaseAreas = [
  "Oncology",
  "Cardiology",
  "Neurology",
  "Immunology",
  "Infectious Disease",
  "Rare Diseases",
  "Dermatology",
  "Gastroenterology",
  "Endocrinology",
  "Pulmonology",
];

const studyTypes = [
  "Phase I Clinical Trial",
  "Phase II Clinical Trial",
  "Phase III Clinical Trial",
  "Phase IV Clinical Trial",
  "Observational Study",
  "Retrospective Cohort",
  "Prospective Cohort",
  "Cross-Sectional Study",
  "Case-Control Study",
  "Meta-Analysis",
];

interface FormData {
  title: string;
  objective: string;
  diseaseArea: string;
  studyType: string;
}

export default function StudySetup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    objective: "",
    diseaseArea: "",
    studyType: "",
  });

  const isFormValid = 
    formData.title.trim() && 
    formData.objective.trim() && 
    formData.diseaseArea && 
    formData.studyType;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      navigate("/workspace", { state: formData });
    }, 2500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <AnalyzingLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Study Protocol Generator</h1>
              <p className="text-xs text-muted-foreground">Powered by GenAI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              AI-Powered Protocol Generation
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Create Your Study Protocol
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter your study details below. Our AI will analyze similar protocols and generate comprehensive documentation.
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl border bg-card p-8 shadow-enterprise-lg space-y-6">
              {/* Study Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4 text-accent" />
                  Study Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your study title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-12 transition-all focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Objective */}
              <div className="space-y-2">
                <Label htmlFor="objective" className="flex items-center gap-2 text-sm font-medium">
                  <Target className="h-4 w-4 text-accent" />
                  Study Objective
                </Label>
                <Textarea
                  id="objective"
                  placeholder="Describe the primary objective of your study..."
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  rows={4}
                  className="resize-none transition-all focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Disease Area */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Stethoscope className="h-4 w-4 text-accent" />
                    Disease Area
                  </Label>
                  <Select
                    value={formData.diseaseArea}
                    onValueChange={(value) => setFormData({ ...formData, diseaseArea: value })}
                  >
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue placeholder="Select disease area" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border shadow-enterprise-lg">
                      {diseaseAreas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Study Type */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <FlaskConical className="h-4 w-4 text-accent" />
                    Study Type
                  </Label>
                  <Select
                    value={formData.studyType}
                    onValueChange={(value) => setFormData({ ...formData, studyType: value })}
                  >
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue placeholder="Select study type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border shadow-enterprise-lg">
                      {studyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full h-12 text-base font-medium gradient-hero hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Report
                </Button>
              </div>

              {/* Helper Text */}
              <p className="text-center text-xs text-muted-foreground">
                Our AI will retrieve similar protocols and generate comprehensive documentation based on your inputs.
              </p>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success" />
              1,000+ Protocols Analyzed
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-info" />
              Enterprise-Grade Security
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              HIPAA Compliant
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
