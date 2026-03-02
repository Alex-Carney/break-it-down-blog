import { type SiteDataProps } from "../types/configDataTypes";

// Update this file with your site specific information
const siteData: SiteDataProps = {
  name: "Break it Down.",
  // Your website's title and description (meta fields)
  title: "Break it Down. | Complex Systems. Explained Clearly.",
  description:
    "Complex systems explained clearly. Technology, AI, organizations, strategy. Break it Down traces the research to find what actually happens, and why the conventional wisdom usually misses it.",

  // Your information for blog post purposes
  author: {
    name: "Hailey Mullen",
    email: "haileyamullen@gmail.com",
  },

  // default image for meta tags if the page doesn't have an image already
  defaultImage: {
    src: "/images/cosmic-themes-logo.jpg",
    alt: "Break it Down.",
  },
};

export default siteData;
