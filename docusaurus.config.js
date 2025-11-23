// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "HARVEST API",
  tagline: "Official API Documentation",
  favicon: "img/logo.png",

  future: {
    v4: true,
  },

  url: "https://your-site.com",

  projectName: "harvest-api-docs",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.js",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "HARVEST API",
      logo: {
        alt: "Harvest Logo",
        src: "img/logo.png", // <-- YOU WILL PLACE YOUR LOGO HERE
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "API Docs",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
