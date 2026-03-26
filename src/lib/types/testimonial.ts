export interface Testimonial {
  id: number;
  author_name: string;
  text: string;
  photo_url: string;
  rating: number;
  source?: "google" | "manual";
}
