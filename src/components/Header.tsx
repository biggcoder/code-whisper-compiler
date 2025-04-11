
import { Code2, Terminal, Github } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-8">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">CodeWhisper</span>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Documentation
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Examples
          </a>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Terminal className="mr-2 h-4 w-4" />
            Terminal
          </Button>
          <Button variant="outline" size="sm">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button size="sm">New Project</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
