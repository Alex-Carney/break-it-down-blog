import { defaultLocale, locales } from "@/config/siteSettings.json";
import {
  dataTranslations,
  textTranslations,
} from "@/config/translationData.json";

/**
 * Text translation helper function
 */
export function useTranslations(locale: keyof typeof textTranslations) {
  return function t(key: keyof (typeof textTranslations)[typeof locale]) {
    return textTranslations[locale][key] || textTranslations[defaultLocale][key];
  };
}

type Locale = keyof typeof dataTranslations;
type DataKey<T extends Locale> = keyof (typeof dataTranslations)[T];

/**
 * Data file translation helper function
 */
export function getTranslatedData<T extends Locale, K extends DataKey<T>>(
  data: K,
  locale: T,
): (typeof dataTranslations)[T][K] {
  return dataTranslations[locale][data] || dataTranslations[defaultLocale as T][data];
}

/**
 * Returns the localized route. In English-only mode, just normalizes the path.
 * Handles external links, hash links, and trailing slashes.
 */
export function getLocalizedRoute(
  _locale: (typeof locales)[number],
  baseRoute: string = "/",
): string {
  const isExternalLink = /^(https?:\/\/|mailto:|tel:|sms:)/i.test(baseRoute);
  const isId = baseRoute.startsWith("#");
  if (isExternalLink || isId) return baseRoute;

  let fragment = "";
  let routeWithoutFragment = baseRoute;
  const fragmentIndex = baseRoute.indexOf("#");

  if (fragmentIndex !== -1) {
    fragment = baseRoute.slice(fragmentIndex);
    routeWithoutFragment = baseRoute.slice(0, fragmentIndex);
  }

  const normalized = routeWithoutFragment.replace(/^\/?|\/?$/g, "");

  if (normalized === "") {
    return fragment ? "/" + fragment : "/";
  }

  return fragment ? `/${normalized}/` + fragment : `/${normalized}/`;
}
