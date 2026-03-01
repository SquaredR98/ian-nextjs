/**
 * CmsRenderer — renders CMS page content.
 *
 * Supports two formats:
 * 1. Structured JSON  — { sections: [{ type, content?, items? }] }
 * 2. Legacy HTML       — raw HTML string (backward-compatible)
 */

interface CmsSection {
  id: string;
  type: "heading" | "subheading" | "paragraph" | "list" | "divider";
  content?: string;
  items?: string[];
}

interface CmsDocument {
  sections: CmsSection[];
}

function tryParseStructured(raw: string): CmsDocument | null {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.sections)) return parsed as CmsDocument;
  } catch {
    // not JSON — legacy HTML
  }
  return null;
}

import { sanitizeHtml } from "@/lib/utils/sanitize";

interface CmsRendererProps {
  content: string;
  className?: string;
}

export function CmsRenderer({ content, className = "legal-page-content" }: CmsRendererProps) {
  const doc = tryParseStructured(content);

  // Legacy HTML fallback
  if (!doc) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
      />
    );
  }

  // Structured JSON rendering
  return (
    <div className={className}>
      {doc.sections.map((section) => {
        switch (section.type) {
          case "heading":
            return <h2 key={section.id}>{section.content}</h2>;
          case "subheading":
            return <h3 key={section.id}>{section.content}</h3>;
          case "paragraph":
            return <p key={section.id}>{section.content}</p>;
          case "list":
            return (
              <ul key={section.id}>
                {(section.items ?? []).filter(Boolean).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case "divider":
            return <hr key={section.id} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
