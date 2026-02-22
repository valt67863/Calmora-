export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  logoId: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 'test_01',
    quote: 'Enterprise Cloud Navigator transformed our infrastructure. Their Quantum Compute instances gave us the performance we needed to stay ahead of the curve. The migration was seamless, and the support has been outstanding.',
    name: 'Jane Doe',
    title: 'CTO, Innovatech Solutions',
    company: 'Innovatech Solutions',
    logoId: 'logo-innovatech',
  },
  {
    id: 'test_02',
    quote: 'The security and compliance features of the Aegis Security Suite are second to none. We can finally sleep at night knowing our data is protected by a world-class security posture. It\'s a game-changer for any enterprise.',
    name: 'John Smith',
    title: 'CISO, QuantumLeap Dynamics',
    company: 'QuantumLeap Dynamics',
    logoId: 'logo-quantumleap',
  },
  {
    id: 'test_03',
    quote: 'We were drowning in data until we adopted InfiniScale Storage. Its scalability and cost-effectiveness have saved us millions, allowing us to focus on deriving insights from our data instead of managing it.',
    name: 'Samantha Ray',
    title: 'VP of Engineering, Synergy Corp',
    company: 'Synergy Corp',
    logoId: 'logo-synergy',
  },
];
