import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://akdemirotoyedekparca.com/sitemap.xml",
    host: "https://akdemirotoyedekparca.com",
  };
}
