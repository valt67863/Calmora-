import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Powering the Future of Enterprise
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
              Discover unparalleled performance, security, and scalability with our enterprise-grade cloud solutions. Let us navigate your digital transformation journey.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2 mx-auto">
             <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#consultation">Request a Consultation</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
