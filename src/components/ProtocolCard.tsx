import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, FileText, Beaker, BookOpen } from "lucide-react";
import { ContentLoader } from "./ui/LoadingSpinner";

interface ProtocolCardProps {
  title: string;
  description: string;
  icon: "abstract" | "background" | "methodology";
  content: string;
  delay?: number;
}

const iconMap = {
  abstract: FileText,
  background: BookOpen,
  methodology: Beaker,
};

const iconColors = {
  abstract: "bg-accent/10 text-accent",
  background: "bg-info/10 text-info",
  methodology: "bg-success/10 text-success",
};

export function ProtocolCard({ 
  title, 
  description, 
  icon, 
  content,
  delay = 0 
}: ProtocolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const Icon = iconMap[icon];

  const handleClick = () => {
    if (!hasLoaded) {
      setIsExpanded(true);
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
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
          "group cursor-pointer rounded-xl border bg-card p-6 transition-all duration-300",
          "hover:shadow-card-hover hover:-translate-y-1",
          isExpanded ? "shadow-enterprise-lg ring-2 ring-accent/20" : "shadow-enterprise"
        )}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
              iconColors[icon]
            )}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-accent transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-secondary transition-all",
            isExpanded && "rotate-180"
          )}>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Expandable Content */}
        <div className={cn(
          "overflow-hidden transition-all duration-500",
          isExpanded ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
        )}>
          <div className="border-t pt-6">
            {isLoading ? (
              <ContentLoader />
            ) : (
              <div className="prose prose-sm max-w-none text-muted-foreground animate-fade-in">
                <p className="leading-relaxed whitespace-pre-line">{content}</p>
              </div>
            )}
          </div>
        </div>

        {/* Click Hint */}
        {!hasLoaded && !isExpanded && (
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="h-1 w-1 rounded-full bg-accent animate-pulse" />
            Click to generate content
          </div>
        )}
      </div>
    </div>
  );
}
