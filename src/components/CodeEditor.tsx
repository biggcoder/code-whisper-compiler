
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Play, Save, RefreshCw } from "lucide-react";

const CodeEditor = () => {
  const [code, setCode] = useState<string>(
`#include <stdio.h>

// A simple C program with a memory leak
int main() {
    int* ptr = (int*)malloc(sizeof(int) * 5);
    
    // Initialize the array
    for (int i = 0; i < 5; i++) {
        ptr[i] = i * 10;
    }
    
    // Print the values
    for (int i = 0; i < 5; i++) {
        printf("%d ", ptr[i]);
    }
    
    // Missing free(ptr); causing a memory leak
    
    return 0;
}`
  );

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Source Code</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm">
            <Play className="h-4 w-4 mr-2" />
            Compile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 w-full overflow-hidden rounded-md border bg-editor-bg">
          <div className="absolute inset-0 flex">
            {/* Line numbers */}
            <div className="bg-editor-line px-2 py-4 text-right text-sm text-muted-foreground font-mono select-none">
              {Array.from({ length: code.split('\n').length }, (_, i) => i + 1).map((num) => (
                <div key={num} className="py-[2px]">
                  {num}
                </div>
              ))}
            </div>
            {/* Code editor */}
            <pre className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed text-editor-text">
              <code>
                {highlightCode(code).map((line, i) => (
                  <div key={i} className="py-[2px]" dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </code>
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Simple syntax highlighting function
function highlightCode(code: string): string[] {
  return code.split('\n').map(line => {
    // Comments
    line = line.replace(/(\/\/.*)/g, '<span class="text-editor-comment">$1</span>');
    
    // Keywords
    const keywords = ['include', 'int', 'main', 'return', 'for', 'if', 'else', 'while', 'void', 'sizeof'];
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      line = line.replace(regex, '<span class="text-editor-keyword">$1</span>');
    });
    
    // Functions
    line = line.replace(/(\w+)\s*\(/g, '<span class="text-editor-function">$1</span>(');
    
    // Strings
    line = line.replace(/(".*?")/g, '<span class="text-editor-string">$1</span>');
    
    // Numbers
    line = line.replace(/\b(\d+)\b/g, '<span class="text-editor-number">$1</span>');
    
    // Preprocessor directives
    line = line.replace(/(\#\w+)/g, '<span class="text-editor-keyword">$1</span>');
    
    return line;
  });
}

export default CodeEditor;
