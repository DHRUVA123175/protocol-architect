import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function LoadingSpinner({ 
  size = "md", 
  className,
  message 
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <Loader2 className={cn("animate-spin text-accent", sizeClasses[size])} />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse-soft">{message}</p>
      )}
    </div>
  );
}

interface AnalyzingLoaderProps {
  className?: string;
}

export function AnalyzingLoader({ className }: AnalyzingLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-12", className)}>
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-muted" />
        <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-accent border-t-transparent animate-spin" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-foreground">Analyzing past protocols…</p>
        <p className="text-sm text-muted-foreground">Retrieving similar studies from research database</p>
      </div>
      <div className="flex gap-1.5 mt-2">
        <div className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

export function ContentLoader({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="h-4 w-full rounded shimmer" />
      <div className="h-4 w-11/12 rounded shimmer" />
      <div className="h-4 w-4/5 rounded shimmer" />
      <div className="h-4 w-9/12 rounded shimmer" />
    </div>
  );
}
