
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import AIPreprocessor from "@/components/AIPreprocessor";
import CompilationProcess from "@/components/CompilationProcess";
import DockerExecution from "@/components/DockerExecution";
import AIDebugging from "@/components/AIDebugging";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">CodeWhisper Compiler</h1>
        <p className="text-muted-foreground mb-8">
          AI-powered LLVM compiler with intelligent code optimization, debugging, and secure Docker execution
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CodeEditor />
          <AIPreprocessor />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CompilationProcess />
          <AIDebugging />
        </div>
        
        <div className="mb-6">
          <DockerExecution />
        </div>
      </main>
    </div>
  );
};

export default Index;
