/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Feature {
  id: string;
  title: string;
  description: string;
  isProOnly: boolean;
  category: 'editing' | 'magic-ai' | 'brand-assets' | 'collaboration';
}

export type BillingCycle = 'yearly' | 'monthly';

export interface PricingPlan {
  name: string;
  tagline: string;
  priceAmount: number;
  priceCurrency: string;
  pricePeriod: string;
  billingCycle: BillingCycle;
  features: string[];
  ctaText: string;
  badge?: string;
  color: string;
}

export interface BrandTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoShape: 'circle' | 'square' | 'triangle' | 'star';
}

export interface TemplateSize {
  name: string;
  icon: string;
  width: string;
  height: string;
  aspect: string;
}
