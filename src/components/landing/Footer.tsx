import { Cloud } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 md:px-8 md:py-8 border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="font-bold">Enterprise Cloud Navigator</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Enterprise Cloud Navigator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
