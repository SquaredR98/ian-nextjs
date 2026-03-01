export const SITE = {
  name: "Injury Assistance Network",
  tagline: "Your Personal Injury Concierge",
  phone: "(800) 988-2341",
  phoneRaw: "8009882341",
  email: "support@injuryassistancenetwork.com",
  address: "823 N. Thornton Ave, Orlando, FL 32803",
  founder: "Michael A. Mills",
  social: {
    facebook: "https://facebook.com/IAN4U2/",
    instagram: "https://instagram.com/ian4u2/",
    linkedin: "https://linkedin.com/company/injury-assistance-network-llc/",
    youtube: "https://youtube.com/channel/UCdc-NFvJmpITBDpGESYMO_w/",
    twitter: "https://x.com/IAN4U2",
  },
} as const;

export const CATEGORY_IDS = {
  medical: 1,
  legal: 2,
  service: 3,
} as const;

export const DEFAULT_LOCATION = "Orlando";
export const POSTS_PER_PAGE = 6;
export const FEATURED_PROVIDERS_PER_CATEGORY = 2;
