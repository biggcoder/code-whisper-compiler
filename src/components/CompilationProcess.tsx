
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowRight, CheckCircle, AlertCircle, Code } from "lucide-react";

const CompilationProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [compilationStatus, setCompilationStatus] = useState<"pending" | "success" | "error">("pending");

  const steps = [
    { name: "Clang Frontend", description: "Parse C/C++ to AST", logs: "Parsing source file...\nGenerating Abstract Syntax Tree...\nValidating syntax...\nAST generation complete." },
    { name: "LLVM IR", description: "Generate LLVM IR code", logs: "Converting AST to LLVM IR...\nInserting metadata...\nApplying basic optimizations...\nLLVM IR generation complete." },
    { name: "Optimization", description: "Apply -O3 optimizations", logs: "Running optimization passes...\n- Inlining functions\n- Loop unrolling\n- Dead code elimination\n- Constant propagation\nOptimization complete." },
    { name: "Code Gen", description: "Generate machine code", logs: "Selecting target architecture: x86_64\nTranslating IR to machine code...\nApplying register allocation...\nMachine code generation complete.\nBinary output size: 28.4 KB" },
  ];

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setCompilationStatus("success");
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompilationStatus("pending");
  };

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Compilation Process</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stepper */}
        <div className="relative mb-4">
          {/* Progress line */}
          <div className="absolute top-4 left-0 h-0.5 w-full bg-muted">
            <div 
              className="h-0.5 bg-primary transition-all duration-300 ease-in-out" 
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 z-10 ${
                    index < activeStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : index === activeStep
                      ? "border-primary bg-background text-primary"
                      : "border-muted bg-background text-muted-foreground"
                  }`}
                >
                  {index < activeStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-xs font-medium ${
                    index <= activeStep ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Current step content */}
        {compilationStatus === "pending" ? (
          <div className="mt-6">
            <div className="rounded-md border bg-card p-4">
              <h3 className="text-sm font-medium mb-2">{steps[activeStep].name}</h3>
              <div className="bg-editor-bg rounded-md p-3 font-mono text-xs text-editor-text">
                <pre>{steps[activeStep].logs}</pre>
              </div>
              <div className="mt-4 flex justify-end">
                <button 
                  className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
                  onClick={handleNextStep}
                >
                  {activeStep === steps.length - 1 ? "Complete" : "Next"}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : compilationStatus === "success" ? (
          <div className="mt-6 rounded-md border border-green-500/20 bg-green-500/10 p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-sm font-medium text-green-500">Compilation Successful</h3>
            </div>
            <p className="mt-2 text-sm">Binary output generated successfully. Ready for execution in Docker environment.</p>
            <div className="mt-4 flex justify-end">
              <button 
                className="inline-flex items-center rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm hover:bg-muted/90"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-md border border-red-500/20 bg-red-500/10 p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-sm font-medium text-red-500">Compilation Failed</h3>
            </div>
            <p className="mt-2 text-sm">An error occurred during the compilation process.</p>
            <div className="mt-4 flex justify-end">
              <button 
                className="inline-flex items-center rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm hover:bg-muted/90"
                onClick={handleReset}
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompilationProcess;
