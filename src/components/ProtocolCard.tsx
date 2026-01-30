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

const iconColors = {
  abstract: "text-orange-500",
  background: "text-emerald-500",
  methodology: "text-violet-500",
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
      className={cn(
        "opacity-0 animate-fade-up transition-all duration-500",
        isExpanded && "md:col-span-3"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div
        onClick={handleClick}
        className={cn(
          "group relative cursor-pointer rounded-xl bg-card transition-all duration-300 overflow-hidden",
          "hover:shadow-2xl hover:-translate-y-1",
          "before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-cyan-500 before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100 hover:before:animate-[shimmer_2s_linear_infinite]",
          "after:absolute after:inset-[2px] after:rounded-[10px] after:bg-card after:z-0",
          isExpanded && "ring-2 ring-accent/50"
        )}
      >
        {/* Content wrapper - above the pseudo elements */}
        <div className="relative z-10 bg-card rounded-xl">
          {/* Colored Top Bar */}
          <div className={cn(
            "h-1.5 w-full transition-all duration-300",
            topBarColors[icon],
            "opacity-60 group-hover:opacity-100"
          )} />
          
          {/* Card Content */}
          <div className="p-6">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg bg-secondary/50",
                  iconColors[icon]
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border",
                  categoryColors[icon]
                )}>
                  {category}
                </span>
              </div>
              <button 
                className="flex items-center justify-center h-8 w-8 rounded-md border border-border hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {description}
            </p>

            {/* Expandable Content */}
            <div className={cn(
              "overflow-hidden transition-all duration-500",
              isExpanded ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"
            )}>
              <div className="border-t border-border pt-5">
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
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors pt-4 border-t border-border/50">
              <ArrowRight className={cn(
                "h-5 w-5 transition-transform duration-300",
                "group-hover:translate-x-1"
              )} />
              <span className="text-sm font-medium">
                {hasLoaded ? (isExpanded ? "Collapse" : "Expand") : "Generate"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
