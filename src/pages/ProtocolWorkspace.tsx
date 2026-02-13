import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProtocolCard } from "@/components/ProtocolCard";
import { SimilarProtocols } from "@/components/SimilarProtocols";
import { 
  FileText, 
  Download, 
  ArrowLeft, 
  CheckCircle2,
  Sparkles
} from "lucide-react";

// Mock data for similar protocols - placeholder for integration
const mockProtocols = [
  { name: "Document_A.pdf", similarity: 94, year: "2024" },
  { name: "Document_B.pdf", similarity: 87, year: "2024" },
  { name: "Document_C.pdf", similarity: 82, year: "2023" },
  { name: "Document_D.pdf", similarity: 76, year: "2023" },
  { name: "Document_E.pdf", similarity: 71, year: "2022" },
];

interface LocationState {
  title: string;
  objective: string;
  diseaseArea: string;
  studyType: string;
}

export default function ProtocolWorkspace() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = (location.state as LocationState) || {
    title: "Phase II Clinical Trial for Novel Immunotherapy in Advanced Oncology",
    objective: "Evaluate efficacy and safety",
    diseaseArea: "Oncology",
    studyType: "Phase II Clinical Trial",
  };

  const generatedTitle = `${formData.studyType}: ${formData.title}`;

  const handleDownload = () => {
    // Placeholder download action for template integration
    const content = `
STUDY PROTOCOL REPORT
=====================

Title: ${generatedTitle}

Disease Area: ${formData.diseaseArea}
Study Type: ${formData.studyType}

ABSTRACT
--------
[Generated abstract content will appear here]

BACKGROUND & RATIONALE
----------------------
[Generated background content will appear here]

RESEARCH METHODOLOGY
--------------------
[Generated methodology content will appear here]
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'study_protocol_report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 30%, #1a0a2e 60%, #0d0221 100%)" }}>
      {/* 8D Background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-fuchsia-600/15 blur-[120px] animate-[pulse-soft_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 rounded-full bg-purple-600/15 blur-[100px] animate-[pulse-soft_5s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-pink-600/10 blur-[140px] animate-[pulse-soft_6s_ease-in-out_infinite_2s]" />
      </div>
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Protocol Workspace</h1>
                <p className="text-xs text-muted-foreground">AI-Generated Documentation</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Setup
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Status Banner */}
        <div 
          className="mb-8 rounded-xl bg-success/10 border border-success/20 p-4 flex items-center gap-3 opacity-0 animate-fade-up"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <CheckCircle2 className="h-5 w-5 text-success" />
          <div>
            <p className="text-sm font-medium text-foreground">Analysis Complete</p>
            <p className="text-xs text-muted-foreground">
              Retrieved 5 similar protocols • Ready to generate sections
            </p>
          </div>
        </div>

        {/* Similar Protocols Section */}
        <section className="mb-10">
          <SimilarProtocols protocols={mockProtocols} />
        </section>

        {/* Generated Title - Hero Style */}
        <section 
          className="mb-10 text-center py-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
            <Sparkles className="h-4 w-4" />
            Generated Study Title
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            {generatedTitle}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-secondary">
              {formData.diseaseArea}
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary">
              {formData.studyType}
            </span>
          </div>
        </section>

        {/* Section Cards */}
        <section className="mb-10">
          <h3 
            className="text-lg font-semibold text-foreground mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            Protocol Sections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProtocolCard
              title="Abstract"
              description="High-level summary of the study design, objectives, and expected outcomes."
              icon="abstract"
              category="Section 1"
              delay={600}
            />
            <ProtocolCard
              title="Background & Rationale"
              description="Context, prior research, and justification for the study approach."
              icon="background"
              category="Section 2"
              delay={700}
            />
            <ProtocolCard
              title="Research Methodology"
              description="Study design, endpoints, statistical approach, and analysis plan."
              icon="methodology"
              category="Section 3"
              delay={800}
            />
          </div>
        </section>

        {/* Download Section */}
        <section 
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
        >
          <div className="rounded-xl border bg-card p-6 shadow-enterprise flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Download Complete Report</h3>
                <p className="text-sm text-muted-foreground">
                  Export your generated protocol as a formatted document
                </p>
              </div>
            </div>
            <Button 
              onClick={handleDownload}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Download className="h-4 w-4" />
              Download Protocol Report
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-muted-foreground">
          <p>Generated content is AI-assisted and should be reviewed by qualified personnel before use.</p>
        </footer>
      </main>
    </div>
  );
}
