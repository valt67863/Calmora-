'use server';
/**
 * @fileOverview Provides a Genkit flow to recommend a personalized consultation package.
 *
 * - recommendConsultationPackage - A function that handles the consultation recommendation process.
 * - PersonalizedConsultationRecommendationInput - The input type for the recommendConsultationPackage function.
 * - PersonalizedConsultationRecommendationOutput - The return type for the recommendConsultationPackage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedConsultationRecommendationInputSchema = z.object({
  role: z.string().describe('The user\'s job role or position within their company.'),
  companySize: z.string().describe('The size of the user\'s company (e.g., "Small Business", "Mid-Market", "Enterprise").'),
});
export type PersonalizedConsultationRecommendationInput = z.infer<typeof PersonalizedConsultationRecommendationInputSchema>;

const PersonalizedConsultationRecommendationOutputSchema = z.object({
  recommendedPackage: z.string().describe('The name of the recommended consultation package.'),
  benefitsExplanation: z.string().describe('A personalized explanation of the benefits of the recommended package.'),
});
export type PersonalizedConsultationRecommendationOutput = z.infer<typeof PersonalizedConsultationRecommendationOutputSchema>;

// Define consultation packages and their details
const consultationPackages = {
  'Small Business Starter': {
    description: 'Designed for small businesses taking their first steps into the cloud.',
    benefits: [
      'Cost-effective basic cloud infrastructure.',
      'Simplified migration process.',
      'Essential security features.',
      'Initial cost optimization strategies.',
    ],
  },
  'Mid-Market Growth': {
    description: 'Tailored for growing mid-sized companies looking to scale their operations.',
    benefits: [
      'Scalable and flexible infrastructure.',
      'Seamless integration with existing SaaS applications.',
      'Advanced security and compliance solutions.',
      'Performance optimization and monitoring.',
      'Hybrid cloud strategy support.',
    ],
  },
  'Enterprise Transformation': {
    description: 'Comprehensive solutions for large enterprises undergoing digital transformation.',
    benefits: [
      'Customized cloud architecture for complex needs.',
      'Advanced AI/ML and data analytics capabilities.',
      'Robust compliance and governance frameworks.',
      'Global presence and disaster recovery planning.',
      'Dedicated support and strategic partnerships.',
      'Innovation and competitive advantage acceleration.',
    ],
  },
};

// Define a tool to get consultation package details
const getConsultationPackageDetails = ai.defineTool(
  {
    name: 'getConsultationPackageDetails',
    description: 'Returns the details and benefits of a specified cloud consultation package.',
    inputSchema: z.object({
      packageName: z.string().describe('The name of the consultation package.'),
    }),
    outputSchema: z.object({
      description: z.string().describe('Description of the package.'),
      benefits: z.array(z.string()).describe('List of key benefits of the package.'),
    }),
  },
  async (input) => {
    const packageDetail = consultationPackages[input.packageName as keyof typeof consultationPackages];
    if (!packageDetail) {
      throw new Error(`Package not found: ${input.packageName}`);
    }
    return packageDetail;
  }
);

const recommendationPrompt = ai.definePrompt({
  name: 'consultationRecommendationPrompt',
  input: { schema: PersonalizedConsultationRecommendationInputSchema },
  output: { schema: PersonalizedConsultationRecommendationOutputSchema },
  tools: [getConsultationPackageDetails],
  prompt: `You are an expert cloud solutions consultant for Enterprise Cloud Navigator.
Your goal is to recommend the most suitable consultation package for a user based on their role and company size, and then explain the personalized benefits of that package.

Available consultation packages are:
- Small Business Starter
- Mid-Market Growth
- Enterprise Transformation

Use the 'getConsultationPackageDetails' tool to fetch information about these packages to inform your recommendation and explanation.

User Details:
Role: {{{role}}}
Company Size: {{{companySize}}}

Based on these details, recommend ONE of the available packages and provide a detailed, personalized explanation of why it is the best fit and what benefits the user will gain. Your explanation should be compelling and tailored to their specific context.`,
});

const personalizedConsultationRecommendationFlow = ai.defineFlow(
  {
    name: 'personalizedConsultationRecommendationFlow',
    inputSchema: PersonalizedConsultationRecommendationInputSchema,
    outputSchema: PersonalizedConsultationRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await recommendationPrompt(input);
    return output!;
  }
);

export async function recommendConsultationPackage(input: PersonalizedConsultationRecommendationInput): Promise<PersonalizedConsultationRecommendationOutput> {
  return personalizedConsultationRecommendationFlow(input);
}
