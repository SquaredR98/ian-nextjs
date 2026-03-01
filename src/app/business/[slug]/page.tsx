import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Provider, ProviderDetail } from "@/lib/types";
import { providersApi } from "@/lib/api";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import {
  ProviderHero,
  ProviderLists,
  ProviderStickyBar,
} from "@/components/public/ProviderProfilePage";
import {
  ProviderProfileContent,
  ProviderSidebar,
} from "@/components/public/ProviderProfileContent";
import "./page.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const provider = await providersApi.getBySlug(slug);
    return {
      title: provider.business_name,
      description: `${provider.business_name} - ${provider.specialty} in ${provider.city}, ${provider.state}. View profile, reviews, and contact information.`,
    };
  } catch {
    return { title: "Provider" };
  }
}

export default async function ProviderProfilePage({
  params,
}: PageProps) {
  const { slug } = await params;

  let provider: ProviderDetail;
  try {
    provider = await providersApi.getBySlug(slug);
  } catch {
    notFound();
  }

  if (!provider) notFound();

  let relatedProviders: Provider[] = [];
  try {
    const res = await providersApi.search({
      categoryId: provider.specialties[0]?.category_id?.toString(),
      page: 1,
    });
    relatedProviders = (res.data ?? [])
      .filter((p) => p.slug !== slug)
      .slice(0, 4);
  } catch {
    // Related providers are non-critical
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: provider.business_name },
        ]}
      />
      <article className="provider-page">
        <ProviderHero provider={provider} />
        <div className="provider-layout">
          <div className="provider-main">
            <ProviderLists
              languages={provider.languages}
              specialties={provider.specialties}
            />
            <ProviderProfileContent provider={provider} relatedProviders={relatedProviders} />
          </div>
          <div className="provider-sidebar">
            <ProviderSidebar provider={provider} />
          </div>
        </div>
      </article>
      <ProviderStickyBar provider={provider} />
    </>
  );
}
