export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  categoryId?: number | null;
}

export interface FAQSection {
  title: string;
  items: FAQItem[];
}
