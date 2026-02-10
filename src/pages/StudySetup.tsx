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

// TODO: Replace with API-fetched options
const diseaseAreas = [
  "Category A",
  "Category B",
  "Category C",
];

// TODO: Replace with API-fetched options
const studyTypes = [
  "Type A",
  "Type B",
  "Type C",
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500">
        <AnalyzingLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500">
      {/* Header */}
      <header className="backdrop-blur-sm sticky top-0 z-50 bg-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Study Protocol Generator</h1>
              <p className="text-xs text-white/70">Powered by GenAI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4" />
              AI-Powered Protocol Generation
            </div>
            <h2 className="text-3xl font-bold text-white">
              Create Your Study Protocol
            </h2>
            <p className="text-white/80 max-w-md mx-auto">
              Enter your study details below. Our AI will analyze similar protocols and generate comprehensive documentation.
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl bg-white/95 backdrop-blur-sm p-8 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] space-y-6">
              {/* Study Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4 text-purple-500" />
                  Study Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your study title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-12 border-gray-200 bg-gray-50/50 transition-all focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              </div>

              {/* Objective */}
              <div className="space-y-2">
                <Label htmlFor="objective" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Target className="h-4 w-4 text-fuchsia-500" />
                  Study Objective
                </Label>
                <Textarea
                  id="objective"
                  placeholder="Describe the primary objective of your study..."
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  rows={4}
                  className="resize-none border-gray-200 bg-gray-50/50 transition-all focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-400"
                />
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Disease Area */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Stethoscope className="h-4 w-4 text-pink-500" />
                    Disease Area
                  </Label>
                  <Select
                    value={formData.diseaseArea}
                    onValueChange={(value) => setFormData({ ...formData, diseaseArea: value })}
                  >
                    <SelectTrigger className="h-12 border-gray-200 bg-gray-50/50">
                      <SelectValue placeholder="Select disease area" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-xl">
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
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FlaskConical className="h-4 w-4 text-violet-500" />
                    Study Type
                  </Label>
                  <Select
                    value={formData.studyType}
                    onValueChange={(value) => setFormData({ ...formData, studyType: value })}
                  >
                    <SelectTrigger className="h-12 border-gray-200 bg-gray-50/50">
                      <SelectValue placeholder="Select study type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-xl">
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
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Report
                </Button>
              </div>

              {/* Helper Text */}
              <p className="text-center text-xs text-gray-500">
                Our AI will retrieve similar protocols and generate comprehensive documentation based on your inputs.
              </p>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/80">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              1,000+ Protocols Analyzed
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Enterprise-Grade Security
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              HIPAA Compliant
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
