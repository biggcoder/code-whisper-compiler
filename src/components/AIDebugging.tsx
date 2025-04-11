
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  BugPlay,
  CheckCircle,
  XCircle, 
  Sparkles,
  ArrowRight
} from "lucide-react";

const AIDebugging = () => {
  const [isActive, setIsActive] = useState(false);
  const [errorLogs, setErrorLogs] = useState<string[]>([
    "warning: implicit declaration of function 'malloc' [-Wimplicit-function-declaration]",
    "note: include '<stdlib.h>' or provide a declaration of 'malloc'",
    "warning: incompatible implicit declaration of built-in function 'malloc'"
  ]);
  const [suggestions, setSuggestions] = useState<Array<{text: string; applied: boolean}>>([]);

  const activateDebugging = () => {
    setIsActive(true);
    
    // Simulate AI providing suggestions after a delay
    setTimeout(() => {
      setSuggestions([
        { text: "Add #include <stdlib.h> at the top of the file", applied: false },
        { text: "Add explicit cast: (int*)malloc(...) to (int*) to satisfy type requirements", applied: false },
        { text: "Add free(ptr) before return to prevent memory leak", applied: false }
      ]);
    }, 2000);
  };

  const applySuggestion = (index: number) => {
    setSuggestions(suggestions.map((suggestion, i) => 
      i === index ? { ...suggestion, applied: true } : suggestion
    ));
  };

  const applyAll = () => {
    setSuggestions(suggestions.map(suggestion => ({ ...suggestion, applied: true })));
  };

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CardTitle className="text-sm font-medium">AI Debugging Assistant</CardTitle>
            <Badge variant="outline" className="ml-2 bg-gradient-to-r from-ai-blue to-ai-purple text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              GPT-4
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isActive ? (
          <div className="flex h-40 items-center justify-center">
            <div className="text-center">
              <BugPlay className="mx-auto h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-medium">AI Debugging</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Fix compilation errors with AI assistance
              </p>
              <button 
                className="mt-4 inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
                onClick={activateDebugging}
              >
                <BugPlay className="mr-1.5 h-4 w-4" />
                Fix Errors
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 rounded-md bg-destructive/10 p-3">
              <h3 className="text-sm font-medium text-destructive mb-2">Compilation Errors</h3>
              <div className="space-y-1">
                {errorLogs.map((log, index) => (
                  <div key={index} className="text-xs font-mono text-destructive/80">
                    {log}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">AI Suggestions</h3>
                {suggestions.length > 0 && !suggestions.every(s => s.applied) && (
                  <Button variant="outline" size="sm" onClick={applyAll}>
                    Apply All
                  </Button>
                )}
              </div>
              
              {suggestions.length === 0 ? (
                <div className="flex h-20 items-center justify-center">
                  <div className="typing-container">
                    <p className="typing-text text-sm font-mono">Analyzing error logs and generating solutions...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between rounded-md border p-2 ${
                        suggestion.applied ? "bg-green-500/10 border-green-500/20" : "bg-card"
                      }`}
                    >
                      <div className="flex items-center">
                        {suggestion.applied ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                        )}
                        <span className="text-sm">{suggestion.text}</span>
                      </div>
                      {!suggestion.applied && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => applySuggestion(index)}
                        >
                          Apply
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIDebugging;
