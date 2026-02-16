/**
 * Global site settings
 */

import { type SiteSettingsProps } from "./types/configDataTypes";

export const locales = ["en"] as const;
export const defaultLocale = "en" as const;

export const localeMap = {
  en: "en-US",
} as const;

export const languageSwitcherMap = {
  en: "EN",
} as const;

export const siteSettings: SiteSettingsProps = {
  useViewTransitions: true,
  useAnimations: true,
};

export default siteSettings;
