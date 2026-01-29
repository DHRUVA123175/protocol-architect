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

// Mock data for similar protocols
const mockProtocols = [
  { name: "Protocol_A_2023_Phase2_Oncology.pdf", similarity: 94, year: "2023" },
  { name: "Study_B_Immunotherapy_Response.pdf", similarity: 87, year: "2023" },
  { name: "Clinical_Trial_C_Biomarker_Analysis.pdf", similarity: 82, year: "2022" },
  { name: "Research_D_Patient_Stratification.pdf", similarity: 76, year: "2022" },
  { name: "Protocol_E_Endpoint_Design.pdf", similarity: 71, year: "2021" },
];

// Mock generated content
const mockContent = {
  abstract: `This study aims to evaluate the efficacy and safety of a novel therapeutic approach in patients with advanced-stage disease. The primary endpoint focuses on overall response rate, while secondary endpoints include progression-free survival, duration of response, and safety profile assessment.

The study will employ a randomized, double-blind, placebo-controlled design with approximately 300 participants across 25 clinical sites. Participants will be stratified based on prior treatment history and biomarker status.

Key inclusion criteria include confirmed diagnosis, adequate organ function, and Eastern Cooperative Oncology Group (ECOG) performance status of 0-1. The study is expected to run for approximately 24 months with interim analyses planned at 6 and 12 months.`,
  
  background: `The therapeutic landscape for this disease has evolved significantly over the past decade, with the introduction of targeted therapies and immunotherapies providing new treatment options. Despite these advances, a substantial proportion of patients still experience disease progression, highlighting the need for novel therapeutic strategies.

Previous research has demonstrated that the targeted pathway plays a critical role in disease pathogenesis. Preclinical studies have shown promising activity with selective inhibition of this pathway, leading to tumor regression in multiple disease models.

The current standard of care includes combination chemotherapy, which is associated with significant toxicity and limited efficacy in advanced disease. This study builds upon the foundation of prior research to evaluate a potentially more effective and better-tolerated treatment approach.`,
  
  methodology: `Study Design: This is a Phase 2, randomized, double-blind, placebo-controlled, multicenter study evaluating the investigational agent versus placebo in patients with confirmed disease.

Sample Size: Approximately 300 patients will be enrolled, with a 2:1 randomization ratio (active treatment: placebo).

Treatment Arms:
• Arm A: Investigational agent administered orally once daily
• Arm B: Matching placebo administered orally once daily

Primary Endpoint: Overall Response Rate (ORR) per RECIST v1.1 criteria, assessed by independent central review.

Statistical Analysis: The study is powered at 90% to detect a clinically meaningful improvement in ORR. Kaplan-Meier methodology will be used for time-to-event endpoints. Subgroup analyses will be performed based on pre-specified biomarker status.`
};

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
    // Mock download action
    const content = `
STUDY PROTOCOL REPORT
=====================

Title: ${generatedTitle}

Disease Area: ${formData.diseaseArea}
Study Type: ${formData.studyType}

ABSTRACT
--------
${mockContent.abstract}

BACKGROUND & RATIONALE
----------------------
${mockContent.background}

RESEARCH METHODOLOGY
--------------------
${mockContent.methodology}
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
    <div className="min-h-screen bg-background">
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
          <div className="space-y-4">
            <ProtocolCard
              title="Abstract"
              description="High-level summary of the study design, objectives, and expected outcomes"
              icon="abstract"
              content={mockContent.abstract}
              delay={600}
            />
            <ProtocolCard
              title="Background & Rationale"
              description="Scientific context, prior research, and justification for the study"
              icon="background"
              content={mockContent.background}
              delay={700}
            />
            <ProtocolCard
              title="Research Methodology"
              description="Study design, endpoints, statistical approach, and analysis plan"
              icon="methodology"
              content={mockContent.methodology}
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
