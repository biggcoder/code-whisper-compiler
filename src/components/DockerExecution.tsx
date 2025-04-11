
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { 
  Play, 
  Square, 
  Database, 
  Clock, 
  Cpu, 
  MemoryStick, 
  FileTerminal,
  Box
} from "lucide-react";

const DockerExecution = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string>("");
  const [activeTab, setActiveTab] = useState("logs");

  const startExecution = () => {
    setIsRunning(true);
    setLogs("");
    
    // Simulate execution logs appearing over time
    const logMessages = [
      "Starting Docker container...",
      "Container ID: 8e9a5442f13c",
      "Mounting volumes...",
      "Setting resource limits: CPU=2, Memory=512MB",
      "Running executable...",
      "Program output:",
      "0 10 20 30 40",
      "Memory usage: 24.6 MB",
      "CPU usage: 12%",
      "Execution time: 32ms",
      "Program exited with code 0",
      "Container stopped"
    ];
    
    logMessages.forEach((message, index) => {
      setTimeout(() => {
        setLogs(prev => prev + message + "\n");
      }, 500 * (index + 1));
    });
    
    // End execution after all logs appear
    setTimeout(() => {
      setIsRunning(false);
    }, 500 * (logMessages.length + 1));
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs(prev => prev + "Execution stopped by user\n");
  };

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CardTitle className="text-sm font-medium">Docker Execution</CardTitle>
            <div className={`ml-3 h-2 w-2 rounded-full ${isRunning ? "bg-green-500 animate-pulse" : "bg-muted"}`}></div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={startExecution}
              disabled={isRunning}
            >
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={stopExecution}
              disabled={!isRunning}
              className="text-red-500 hover:text-red-600"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="logs" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-2">
            <TabsTrigger value="logs">
              <FileTerminal className="h-4 w-4 mr-2" />
              Logs
            </TabsTrigger>
            <TabsTrigger value="container">
              <Box className="h-4 w-4 mr-2" />
              Container
            </TabsTrigger>
            <TabsTrigger value="resources">
              <Cpu className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="logs" className="min-h-[200px]">
            <div className="rounded-md border bg-editor-bg p-3 min-h-[200px] font-mono text-xs text-editor-text whitespace-pre-wrap">
              {logs || "Execution logs will appear here..."}
            </div>
          </TabsContent>
          
          <TabsContent value="container" className="min-h-[200px]">
            <div className="rounded-md border bg-card p-3 min-h-[200px] space-y-3">
              <div className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center">
                  <Box className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium">Container Settings</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 rounded-md bg-muted/40">
                  <span className="text-xs text-muted-foreground">Image</span>
                  <p className="font-mono">gcc:latest</p>
                </div>
                <div className="p-2 rounded-md bg-muted/40">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <p>{isRunning ? "Running" : "Stopped"}</p>
                </div>
                <div className="p-2 rounded-md bg-muted/40">
                  <span className="text-xs text-muted-foreground">Network</span>
                  <p className="font-mono">bridge</p>
                </div>
                <div className="p-2 rounded-md bg-muted/40">
                  <span className="text-xs text-muted-foreground">Volume Mount</span>
                  <p className="font-mono text-xs">/tmp/code:/app</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="min-h-[200px]">
            <div className="rounded-md border bg-card p-3 min-h-[200px]">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm font-medium">CPU Usage</span>
                    </div>
                    <span className="text-sm font-mono">12%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{width: '12%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <MemoryStick className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm font-medium">Memory Usage</span>
                    </div>
                    <span className="text-sm font-mono">24.6 MB / 512 MB</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{width: '5%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm font-medium">Execution Time</span>
                    </div>
                    <span className="text-sm font-mono">32 ms</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm font-medium">Disk I/O</span>
                    </div>
                    <span className="text-sm font-mono">12 KB read / 4 KB write</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DockerExecution;
