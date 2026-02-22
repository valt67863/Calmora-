import { products } from "@/lib/products";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function Products() {
  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Top Products</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Built for the Enterprise</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our suite of cloud products is designed to meet the rigorous demands of modern enterprises, providing reliability, security, and performance at scale.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-12">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center pb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <product.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{product.name}</CardTitle>
                <CardDescription className="text-center pt-2 h-12">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <ul className="space-y-2 text-sm text-muted-foreground flex-grow">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-1 text-primary shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col pt-4">
                 <div className="text-center text-2xl font-bold">
                  {product.price}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
