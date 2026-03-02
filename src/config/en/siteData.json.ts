import { type SiteDataProps } from "../types/configDataTypes";

// Update this file with your site specific information
const siteData: SiteDataProps = {
  name: "Break it Down.",
  // Your website's title and description (meta fields)
  title: "Break it Down. — Complex Systems. Explained Clearly.",
  description:
    "Complex systems — technology, AI, organizations, strategy — explained clearly. Break it Down. traces the research to find what actually happens, and why the conventional wisdom usually misses it.",

  // Your information for blog post purposes
  author: {
    name: "Hailey Mullen",
    email: "haileymullen2020@gmail.com",
  },

  // default image for meta tags if the page doesn't have an image already
  defaultImage: {
    src: "/images/cosmic-themes-logo.jpg",
    alt: "Cosmic Themes logo",
  },
};

export default siteData;
