
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";

const AIPreprocessor = () => {
  const [status, setStatus] = useState<"idle" | "processing" | "completed" | "error">("idle");
  const [issues, setIssues] = useState<Array<{ type: string; message: string; fix: string; status: "fixed" | "suggested" }>>([]);

  // Simulate AI processing
  useEffect(() => {
    if (status === "idle") return;
    
    const timer = setTimeout(() => {
      if (status === "processing") {
        setStatus("completed");
        setIssues([
          {
            type: "Memory Leak",
            message: "Allocated memory is never freed",
            fix: "Add free(ptr); before return statement",
            status: "fixed"
          },
          {
            type: "Optimization",
            message: "Loop operations can be optimized",
            fix: "Consider vectorizing the initialization loop",
            status: "suggested"
          }
        ]);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [status]);

  const startProcessing = () => {
    setStatus("processing");
    setIssues([]);
  };

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <CardTitle className="text-sm font-medium">AI Preprocessor</CardTitle>
          <Badge variant="outline" className="ml-2 bg-gradient-to-r from-ai-blue to-ai-purple text-white">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4
          </Badge>
        </div>
        <div className="flex items-center">
          {status === "processing" && (
            <Badge variant="outline" className="animate-pulse-blue">
              Processing...
            </Badge>
          )}
          {status === "completed" && (
            <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/50">
              Completed
            </Badge>
          )}
          {status === "error" && (
            <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/50">
              Error
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {status === "idle" ? (
          <div className="flex h-40 items-center justify-center">
            <div className="text-center">
              <Sparkles className="mx-auto h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-medium">AI Code Analysis</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Let AI analyze your code for errors and optimizations
              </p>
              <button 
                className="mt-4 inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
                onClick={startProcessing}
              >
                <Sparkles className="mr-1.5 h-4 w-4" />
                Analyze Code
              </button>
            </div>
          </div>
        ) : status === "processing" ? (
          <div className="flex flex-col h-40 items-center justify-center">
            <div className="typing-container">
              <p className="typing-text text-sm font-mono">Analyzing code patterns and identifying issues...</p>
            </div>
            <div className="mt-4 w-40 h-1.5 bg-secondary overflow-hidden rounded-full">
              <div className="h-full bg-primary animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-medium">AI Analysis Results</h3>
            <div className="space-y-2">
              {issues.map((issue, index) => (
                <div key={index} className="rounded-md border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-medium flex items-center">
                      {issue.status === "fixed" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-amber-500 mr-1.5" />
                      )}
                      {issue.type}
                    </div>
                    <Badge variant="outline" className={issue.status === "fixed" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}>
                      {issue.status === "fixed" ? "Fixed" : "Suggested"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">{issue.message}</p>
                  <div className="mt-2 p-2 bg-editor-bg rounded text-xs font-mono">
                    {issue.fix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIPreprocessor;
