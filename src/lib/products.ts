import type { LucideIcon } from 'lucide-react';
import { Cpu, ShieldCheck, Scaling } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
  price: string;
};

export const products: Product[] = [
  {
    id: 'prod_01',
    name: 'Quantum Compute',
    icon: Cpu,
    description: 'Next-generation computing power for intensive workloads and AI/ML applications.',
    benefits: ['Blazing-fast processing', 'Elastic scalability', 'Pay-as-you-go model', 'Integrated AI toolchains'],
    price: 'Starting at $499/mo',
  },
  {
    id: 'prod_02',
    name: 'Aegis Security Suite',
    icon: ShieldCheck,
    description: 'Comprehensive, multi-layered security to protect your most critical assets.',
    benefits: ['24/7 threat detection', 'Automated compliance', 'Zero-trust architecture', 'Data encryption'],
    price: 'Starting at $299/mo',
  },
  {
    id: 'prod_03',
    name: 'InfiniScale Storage',
    icon: Scaling,
    description: 'Limitless, durable, and cost-effective object storage for any amount of data.',
    benefits: ['99.9999% durability', 'Automatic data tiering', 'Global content delivery', 'Simplified data lifecycle'],
    price: 'Starting at $0.018/GB',
  },
];
