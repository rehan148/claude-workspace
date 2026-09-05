/**
 * Competitor facts used for /compare/* and /best-peptide-tracker-apps. Keep claims factual and
 * verifiable from each product's public listing; re-check quarterly.
 */
export interface Competitor {
  slug: string;
  name: string;
  site: string;
  platforms: string;
  pricing: string;
  focus: string;
  strengths: string[];
  gaps: string[];
  verdict: string;
}

export const COMPETITORS: Competitor[] = [
  {
    slug: 'peptiq',
    name: 'PeptIQ',
    site: 'peptiq.io',
    platforms: 'iOS, Android, web',
    pricing: 'Free tier; Premium subscription (weekly, monthly or annual)',
    focus: 'Broad platform with education, community and a clinic product',
    strengths: ['Vial scanner and AI-assisted compound entry', 'Large education library', 'Web access'],
    gaps: ['Premium is among the most expensive in the category', 'Community features add noise if you only want a log', 'Heavier onboarding'],
    verdict: 'Choose PeptIQ if you want community and education bundled in; choose Pepti if you want a faster, cheaper tracker with the same calculator, rotation and inventory tools.',
  },
  {
    slug: 'shotsy',
    name: 'Shotsy',
    site: 'shotsyapp.com',
    platforms: 'iOS, Android',
    pricing: 'Free core features; optional Pro',
    focus: 'GLP-1 weight-loss tracking only',
    strengths: ['Polished GLP-1 experience', 'Weight and nutrition charts', 'Large user base'],
    gaps: ['Does not support research peptides or multi-compound stacks', 'No reconstitution calculator for vials', 'No phase-based protocols'],
    verdict: 'Shotsy is great if you only take Ozempic, Wegovy, Mounjaro or Zepbound. Pepti covers those and every other peptide, TRT and injectable in one place.',
  },
  {
    slug: 'regimen',
    name: 'Regimen',
    site: 'helloregimen.com',
    platforms: 'iOS, Android',
    pricing: 'Free for one compound; paid for multiple',
    focus: 'Multi-compound tracking with daily check-in markers',
    strengths: ['Estimated level curves', '50+ check-in markers', 'Apple Health / Health Connect sync'],
    gaps: ['Free tier is limited to a single compound', 'No AI assistant', 'Smaller compound library'],
    verdict: 'Regimen is strong for check-ins. Pepti includes a larger compound library, an AI assistant and a free tier that already covers a full protocol.',
  },
  {
    slug: 'peptide-tracker',
    name: 'Peptide Tracker (peptidetracker.ai)',
    site: 'peptidetracker.ai',
    platforms: 'iOS, Android',
    pricing: 'Free with in-app purchases',
    focus: 'Dose log, reminders, reconstitution, site rotation',
    strengths: ['Straightforward feature set', 'Adherence tracking', 'Available on both platforms'],
    gaps: ['Generic name makes support and reviews hard to find', 'Limited analytics', 'Fewer stack and phase tools'],
    verdict: 'Both apps cover the basics. Pepti adds phase-based protocols, bloodwork tracking and an AI assistant trained on its compound library.',
  },
  {
    slug: 'peptidekit',
    name: 'PeptideKit',
    site: 'apps.apple.com',
    platforms: 'iOS',
    pricing: 'Free; Plus weekly $5.99 or yearly $49.99',
    focus: 'GLP-1 log and peptide calculator',
    strengths: ['Clean calculator', 'GLP-1 and TRT support', 'Low annual price'],
    gaps: ['iOS only', 'Weekly plan is expensive over time', 'No Android or web'],
    verdict: 'PeptideKit is a solid iOS-only option. Pepti works on iPhone and Android and includes inventory forecasting and AI answers.',
  },
  {
    slug: 'peptide-tracker-calculator',
    name: 'Peptide Tracker & Calculator',
    site: 'apps.apple.com',
    platforms: 'iOS, Android',
    pricing: 'Free with in-app purchases',
    focus: 'Calculator-first tracker',
    strengths: ['Highly rated calculator', 'Log filtering by compound', 'Simple UI'],
    gaps: ['Fewer protocol and phase features', 'No level curves', 'No AI assistant'],
    verdict: 'If the calculator is all you need, it is a fine pick. Pepti wraps the same maths in full protocol management.',
  },
];

export const getCompetitor = (slug: string) => COMPETITORS.find((c) => c.slug === slug);
