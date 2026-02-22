"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  recommendConsultationPackage,
  type PersonalizedConsultationRecommendationOutput,
} from "@/ai/flows/personalized-consultation-recommendation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  companySize: z.enum(["Small Business", "Mid-Market", "Enterprise"], {
    errorMap: () => ({ message: "Please select a company size." }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ConsultationRecommender() {
  const [recommendation, setRecommendation] = useState<PersonalizedConsultationRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await recommendConsultationPackage(data);
      setRecommendation(result);
    } catch (error) {
      console.error("Failed to get recommendation:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with our AI. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-consultant" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">AI-Powered Guidance</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Find Your Perfect Fit</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Not sure where to start? Answer two simple questions, and our AI consultant will recommend the ideal package for your business needs.
            </p>
        </div>
        <div className="mx-auto w-full max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                        <Wand2 className="h-6 w-6 text-primary"/>
                        Personalized Recommendation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Your Role</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., CTO, IT Manager" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="companySize"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Size</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a size" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Small Business">Small Business (1-50)</SelectItem>
                                                <SelectItem value="Mid-Market">Mid-Market (51-1000)</SelectItem>
                                                <SelectItem value="Enterprise">Enterprise (1000+)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                            {isLoading ? (
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                                </>
                            ) : (
                                "Get Recommendation"
                            )}
                        </Button>
                        </form>
                    </Form>

                    {isLoading && (
                        <div className="mt-8 text-center text-muted-foreground animate-pulse">
                            Our AI is crafting your personalized recommendation...
                        </div>
                    )}

                    {recommendation && (
                        <Card className="mt-8 text-left bg-secondary animate-in fade-in duration-500">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-6 w-6 text-primary" />
                                Our Recommendation: {recommendation.recommendedPackage}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground">{recommendation.benefitsExplanation}</p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
