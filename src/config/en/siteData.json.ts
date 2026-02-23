import { type SiteDataProps } from "../types/configDataTypes";

// Update this file with your site specific information
const siteData: SiteDataProps = {
  name: "Break it Down",
  // Your website's title and description (meta fields)
  title:
    "Break it Down - The kitchen sink starter for SaaS, Services, Portfolio, Blog, and more websites. Remove what you don't need and deploy.",
  description:
    "Create an amazing website for your small business clients with our beautiful website theme designed using Astro and Tailwind CSS. Perfect for freelancers, developers, startups, and personal use.",

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
