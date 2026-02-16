// site data types
export interface SiteDataProps {
  name: string;
  title: string;
  description: string;
  author: {
    name: string;
    email: string;
    twitter: string;
  };
  defaultImage: {
    src: string;
    alt: string;
  };
}

// nav data types
export interface navLinkItem {
  text: string;
  link: string;
  newTab?: boolean;
  icon?: string;
}

export interface navDropdownItem {
  text: string;
  dropdown: navLinkItem[];
}

export interface navMegaDropdownColumn {
  title: string;
  items: navLinkItem[];
}

export interface navMegaDropdownItem {
  text: string;
  megaMenuColumns: navMegaDropdownColumn[];
}

export type navItem = navLinkItem | navDropdownItem | navMegaDropdownItem;

// site settings types
export interface SiteSettingsProps {
  useViewTransitions?: boolean;
  useAnimations?: boolean;
}
