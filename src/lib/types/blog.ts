export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featured_image: string;
  categories: string[];
  tags: string[];
  author?: string;
  published_at: string;
  comment_status?: "Y" | "N";
  related_posts?: BlogPostSummary[];
}

export interface BlogComment {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  categories: string[];
  published_at: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}
