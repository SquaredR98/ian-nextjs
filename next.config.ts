import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1$/, '') || "http://localhost:5550";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
  images: {
    ...(isProd ? {} : { dangerouslyAllowLocalIP: true }),
    remotePatterns: [
      // Localhost only needed in dev — harmless in prod (won't match remote requests)
      ...(!isProd ? [{
        protocol: "http" as const,
        hostname: "localhost",
        port: "5550",
        pathname: "/uploads/**",
      }] : []),
      {
        protocol: "https",
        hostname: "api.injuryassistancenetwork.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.injuryassistancenetwork.com",
        pathname: "/v1/**",
      },
      {
        protocol: "https",
        hostname: "www.injuryassistancenetwork.com",
        pathname: "/dist/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Proxy sitemap and robots to backend API
        {
          source: "/sitemap.xml",
          destination: `${API_BASE}/sitemap.xml`,
        },
        {
          source: "/robots.txt",
          destination: `${API_BASE}/robots.txt`,
        },
      ],
      afterFiles: [
        {
          source: "/find-a-providerbyspec",
          destination: "/find-a-provider",
        },
        // Laravel legacy URL: /businessbyid/{slug}/{id} → /business/{slug}
        {
          source: "/businessbyid/:slug/:id",
          destination: "/business/:slug",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
