export interface Provider {
  id: number;
  slug: string;
  business_name: string;
  category: "medical" | "legal" | "service";
  specialty: string;
  city: string;
  state: string;
  logo_url: string;
  rating: number;
  review_count?: number;
  is_verified: boolean;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  address?: string;
  google_maps_link?: string;
  distance?: number;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  pinterest?: string;
}

export interface ProviderDetail extends Provider {
  description: string;
  address: string;
  zipcode: string;
  phone: string;
  website: string;
  languages: string[];
  services: string[];
  specialties: { id: number; name: string; category_id: number }[];
  gallery: string[];
  social_media: SocialMedia;
  youtube_video_id: string;
  google_reviews: {
    rating: number;
    reviews: GoogleReview[];
  };
  google_cid: string;
  google_maps_url: string;
  related_providers?: Provider[];
}

export interface GoogleReview {
  author: string;
  avatar: string;
  rating: number;
  text: string;
  relative_time?: string;
}
