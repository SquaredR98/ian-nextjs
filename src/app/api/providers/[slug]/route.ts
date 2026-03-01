import { NextResponse } from "next/server";
import { mockProviderDetail, mockProviders } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const detail = mockProviderDetail[slug];

  if (!detail) {
    // Return a basic detail from the providers list
    const provider = mockProviders.find((p) => p.slug === slug);
    if (!provider) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...provider,
      description: `${provider.business_name} provides quality ${provider.specialty} services in ${provider.city}, ${provider.state}.`,
      address: `${provider.city}, ${provider.state}`,
      phone: "(800) 988-2341",
      website: "",
      languages: ["English"],
      services: [provider.specialty],
      gallery: [],
      google_reviews: { rating: provider.rating, reviews: [] },
      google_cid: "",
      related_providers: mockProviders.filter((p) => p.id !== provider.id).slice(0, 6),
    });
  }

  return NextResponse.json({
    ...detail,
    related_providers: mockProviders.filter((p) => p.id !== detail.id).slice(0, 6),
  });
}
