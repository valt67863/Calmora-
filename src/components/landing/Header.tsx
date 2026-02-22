"use client";

import { Cloud, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import React from 'react';

export function Header() {
  const isMobile = useIsMobile();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, isSheet: boolean) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*#/, '');
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({ behavior: 'smooth' });

    if (isSheet) {
      // Find the sheet close button and click it to close the sheet
      const closeButton = document.querySelector('[data-radix-dialog-overlay] + [data-radix-dialog-content] > button');
      if (closeButton instanceof HTMLElement) {
        closeButton.click();
      }
    }
  };

  const NavItems = ({ isSheet = false }) => (
    <>
      <a href="#products" className="font-medium text-foreground/80 transition-colors hover:text-foreground" onClick={(e) => handleScroll(e, isSheet)}>Products</a>
      <a href="#testimonials" className="font-medium text-foreground/80 transition-colors hover:text-foreground" onClick={(e) => handleScroll(e, isSheet)}>Testimonials</a>
      <a href="#ai-consultant" className="font-medium text-foreground/80 transition-colors hover:text-foreground" onClick={(e) => handleScroll(e, isSheet)}>AI Consultant</a>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Cloud className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold">Enterprise Cloud Navigator</span>
        </div>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 mt-8">
                <NavItems isSheet={true} />
                <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90" onClick={(e: any) => handleScroll(e, true)}>
                  <a href="#consultation">Request a Consultation</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm">
              <NavItems />
            </nav>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#consultation">Request a Consultation</a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
