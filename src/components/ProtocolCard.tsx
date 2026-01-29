import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Plus, FileText, Beaker, BookOpen } from "lucide-react";
import { ContentLoader } from "./ui/LoadingSpinner";

interface ProtocolCardProps {
  title: string;
  description: string;
  icon: "abstract" | "background" | "methodology";
  category: string;
  delay?: number;
}

const iconMap = {
  abstract: FileText,
  background: BookOpen,
  methodology: Beaker,
};

const borderColors = {
  abstract: "hover:border-t-orange-500",
  background: "hover:border-t-emerald-500",
  methodology: "hover:border-t-violet-500",
};

const topBarColors = {
  abstract: "bg-orange-500",
  background: "bg-emerald-500",
  methodology: "bg-violet-500",
};

const categoryColors = {
  abstract: "bg-orange-50 text-orange-700 border-orange-200",
  background: "bg-emerald-50 text-emerald-700 border-emerald-200",
  methodology: "bg-violet-50 text-violet-700 border-violet-200",
};

export function ProtocolCard({ 
  title, 
  description, 
  icon, 
  category,
  delay = 0 
}: ProtocolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [content, setContent] = useState("");

  const Icon = iconMap[icon];

  const handleClick = () => {
    if (!hasLoaded) {
      setIsExpanded(true);
      setIsLoading(true);
      // Simulate API call - placeholder content for template
      setTimeout(() => {
        setContent(`[Generated ${title} content will appear here]\n\nThis section will be populated with AI-generated content based on your study parameters and retrieved similar protocols from the knowledge base.`);
        setIsLoading(false);
        setHasLoaded(true);
      }, 1500 + Math.random() * 1000);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className="opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div
        onClick={handleClick}
        className={cn(
          "group cursor-pointer rounded-lg border-2 border-border bg-card transition-all duration-300 overflow-hidden",
          "hover:shadow-enterprise-lg hover:-translate-y-0.5",
          borderColors[icon],
          isExpanded && "ring-1 ring-border"
        )}
      >
        {/* Colored Top Bar */}
        <div className={cn("h-1 w-full transition-all duration-300", topBarColors[icon], "opacity-0 group-hover:opacity-100")} />
        
        {/* Card Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="mb-4">
            <span className={cn(
              "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border",
              categoryColors[icon]
            )}>
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>

          {/* Expandable Content */}
          <div className={cn(
            "overflow-hidden transition-all duration-500",
            isExpanded ? "max-h-[400px] opacity-100 mb-6" : "max-h-0 opacity-0"
          )}>
            <div className="border-t pt-5">
              {isLoading ? (
                <ContentLoader />
              ) : (
                <div className="prose prose-sm max-w-none text-muted-foreground animate-fade-in">
                  <p className="leading-relaxed whitespace-pre-line">{content}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
              <ArrowRight className="h-5 w-5" />
              <span className="text-sm font-medium">
                {hasLoaded ? (isExpanded ? "Collapse" : "Expand") : "Generate"}
              </span>
            </div>
            <button 
              className="flex items-center justify-center h-8 w-8 rounded-md border border-border hover:bg-secondary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Add to favorites or similar action
              }}
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
