/**
 * Single source of truth for brand, store links and product claims.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  VERIFY BEFORE DEPLOY                                                 │
 * │  The store IDs below were found by public search for the app that     │
 * │  matches this project (repo: peptideos-ios). If getpepti.app ships a  │
 * │  different listing, change ONLY this file – every page, JSON-LD block,│
 * │  smart-app-banner and sitemap entry reads from it.                    │
 * └──────────────────────────────────────────────────────────────────────┘
 */
export const SITE = {
  /** Canonical origin. No trailing slash. */
  url: 'https://getpepti.app',
  /** Brand name used in titles, schema and copy. */
  name: 'Pepti',
  /** Full product name shown in schema `name` and first H1. */
  productName: 'Pepti: Peptide Tracker',
  tagline: 'The peptide tracker app for protocols, doses, vials and results',
  /** ≤ 155 chars. Used as default meta description. */
  description:
    'Pepti is a free peptide tracker app for iPhone and Android. Log doses, schedule protocols, rotate injection sites, calculate reconstitution and track vials and progress.',
  legalName: 'Pepti',
  supportEmail: 'hello@getpepti.app',
  /** Optional developer / publisher details for E-E-A-T (About page + Organization schema). */
  founder: {
    name: 'Rehan',
    role: 'Founder & Developer',
    bio: 'Builds Pepti to replace the spreadsheets and notes people use to track peptide protocols.',
  },
  /** App Store numeric ID (digits only). Leave empty to hide iOS links. VERIFY. */
  appStoreId: '6762200959',
  /** Google Play package name. Leave empty to hide Android links. VERIFY. */
  playPackage: 'com.utilityforge.peptideos',
  /** Deep-link scheme or universal link root used in `app-argument`. */
  appArgumentUrl: 'https://getpepti.app/download',
  /** Social profiles (used in Organization.sameAs). Leave empty strings to omit. */
  social: {
    x: '',
    instagram: '',
    tiktok: '',
    reddit: '',
    youtube: '',
  },
  /** Pricing as published in the store listing. VERIFY. */
  pricing: {
    currency: 'USD',
    free: {
      name: 'Free',
      price: 0,
      features: [
        'Full peptide database and research library',
        'Reconstitution & dose calculator',
        '1 active protocol with reminders',
        'Dose log, vial inventory and injection-site rotation',
        '3 AI assistant questions per day',
      ],
    },
    pro: {
      name: 'Pro',
      monthly: 9.99,
      yearly: 69.99,
      features: [
        'Unlimited protocols and stacks',
        'Unlimited AI assistant',
        'Lab result & bloodwork tracking',
        'Progress photos and measurements',
        'Community posting',
        'CSV / PDF data export',
        'Priority access to new compounds',
      ],
    },
  },
  /** Aggregate rating shown in schema. Set `count` to 0 to omit the block entirely. VERIFY against the live listing. */
  rating: { value: 4.8, count: 0 },
  /** Platforms the app ships on. */
  platforms: ['iOS', 'Android'] as const,
  /** Number of compounds in the in-app library (used in copy). */
  compoundCount: 75,
  /** Year the product launched (schema + footer). */
  foundingYear: 2025,
  /** Default social share image path (generated at build). */
  ogImage: '/og/default.png',
  twitterHandle: '',
} as const;

export const APP_STORE_URL = SITE.appStoreId
  ? `https://apps.apple.com/app/id${SITE.appStoreId}`
  : '';
export const PLAY_URL = SITE.playPackage
  ? `https://play.google.com/store/apps/details?id=${SITE.playPackage}`
  : '';

/** Absolute URL helper. */
export const abs = (path: string) =>
  path.startsWith('http') ? path : `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
