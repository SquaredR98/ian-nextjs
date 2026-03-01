export interface Specialty {
  id: number;
  name: string;
  slug: string;
  category: "medical" | "legal" | "service";
  group: string | null;
  image_url: string | null;
  featured_icon_url?: string | null;
  description?: string | null;
}

export interface SpecialtyGroup {
  name: string;
  specialties: Specialty[];
}
