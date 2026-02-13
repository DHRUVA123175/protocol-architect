import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Plus, FileText, Beaker, BookOpen, Sparkles } from "lucide-react";
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
          "group relative cursor-pointer rounded-2xl transition-all duration-500 overflow-hidden",
          isExpanded && "ring-2 ring-fuchsia-400/50"
        )}
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15), rgba(168,85,247,0.1))",
          boxShadow: "0 0 40px rgba(236,72,153,0.15), 0 0 80px rgba(168,85,247,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Animated gradient border */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, #ff00ff, #a855f7, #ec4899, #ff00ff)",
            backgroundSize: "300% 300%",
            animation: "progress-pulse 3s ease infinite",
            padding: "2px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* Floating orb accents */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-fuchsia-500/20 blur-3xl group-hover:bg-fuchsia-500/30 transition-all duration-700" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-purple-500/20 blur-3xl group-hover:bg-purple-500/30 transition-all duration-700" />

        {/* Top shimmer bar */}
        <div className="h-1 w-full bg-gradient-to-r from-fuchsia-500 via-purple-400 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card Content */}
        <div className="relative z-10 p-6 backdrop-blur-sm">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 border border-fuchsia-400/20">
                <Icon className="h-5 w-5 text-fuchsia-400" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-400/20">
                <Sparkles className="h-3 w-3" />
                {category}
              </span>
            </div>
            <button 
              className="flex items-center justify-center h-8 w-8 rounded-lg border border-fuchsia-400/20 hover:bg-fuchsia-500/10 transition-colors opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Plus className="h-4 w-4 text-fuchsia-300" />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-fuchsia-200 transition-colors duration-300">
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
            <div className="border-t border-fuchsia-400/20 pt-5">
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
          <div className="flex items-center gap-2 pt-4 border-t border-fuchsia-400/10">
            <div className="flex items-center gap-2 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors">
              <ArrowRight className={cn(
                "h-5 w-5 transition-transform duration-300",
                "group-hover:translate-x-1"
              )} />
              <span className="text-sm font-semibold">
                {hasLoaded ? (isExpanded ? "Collapse" : "Expand") : "Generate"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
