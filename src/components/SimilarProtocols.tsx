import { FileText, ExternalLink, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Protocol {
  name: string;
  similarity: number;
  year: string;
}

interface SimilarProtocolsProps {
  protocols: Protocol[];
  className?: string;
}

export function SimilarProtocols({ protocols, className }: SimilarProtocolsProps) {
  return (
    <div className={cn("opacity-0 animate-fade-up", className)} style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
      <div className="rounded-xl border bg-card p-6 shadow-enterprise">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              Top Similar Past Protocols
            </h2>
            <p className="text-sm text-muted-foreground">
              Ranked by semantic similarity
            </p>
          </div>
        </div>

        {/* Protocol List */}
        <div className="space-y-2">
          {protocols.map((protocol, index) => (
            <div
              key={protocol.name}
              className="group flex items-center justify-between rounded-lg border border-transparent bg-secondary/50 px-4 py-3 transition-all hover:border-accent/20 hover:bg-secondary"
              style={{ 
                animationDelay: `${300 + index * 100}ms`,
                animationFillMode: "forwards"
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-card text-xs font-bold text-accent">
                  #{index + 1}
                </div>
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-medium text-card-foreground">
                    {protocol.name}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({protocol.year})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-accent to-info transition-all duration-500"
                      style={{ width: `${protocol.similarity}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground w-10">
                    {protocol.similarity}%
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-accent" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Retrieved from {protocols.length} matching documents in knowledge base
          </p>
        </div>
      </div>
    </div>
  );
}
