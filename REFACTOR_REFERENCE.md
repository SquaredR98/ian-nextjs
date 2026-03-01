# Refactor Reference - Deleted Content & Plan

## DELETED PORTAL/AUTH FILES (intentionally removed - these were placeholders or auth-only)

### Admin Layout - src/app/(admin)/layout.tsx
```tsx
// Used AdminSidebar and AdminTopbar from src/components/admin/
// 19 lines, same pattern as provider/user layouts
```

### Admin Dashboard - src/app/(admin)/admin/page.tsx
```tsx
import "./page.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <div className="admin-dashboard-grid">
        <StatCard label="Total Providers" value="156" />
        <StatCard label="Total Users" value="1,240" />
        <StatCard label="Blog Posts" value="210" />
        <StatCard label="Pending Reviews" value="12" />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="admin-stat-card">
      <span className="admin-stat-value">{value}</span>
      <span className="admin-stat-label">{label}</span>
    </div>
  );
}
```

### All other admin pages (blog, categories, contact, endorsements, providers, testimonials, users)
Each was a 9-line placeholder:
```tsx
export default function XxxPage() {
  return (
    <div><h1>Page Title</h1><p>Placeholder text</p></div>
  );
}
```

### Provider portal - same pattern as admin (dashboard with StatCard + placeholder sub-pages)
### User dashboard - same pattern as admin (dashboard with StatCard + placeholder sub-pages)

### Login page - src/app/(public)/login/page.tsx
```tsx
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { LoginForm } from "./LoginForm";
import "./page.css";

export default function LoginPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Login" }]} />
      <div className="login-page">
        <LoginForm />
      </div>
    </>
  );
}
```
LoginForm.tsx was a "use client" component with email/password form using react-hook-form + zod.

### Signup page - similar pattern to login with SignupForm.tsx

### Middleware (original) - middleware.ts
```tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    PUBLIC_FILE.test(url.pathname)
  ) {
    return NextResponse.next();
  }

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

  let subdomain: string | null = null;
  if (hostname.includes(rootDomain)) {
    const currentHost = hostname.replace(`.${rootDomain}`, "");
    if (currentHost !== rootDomain && currentHost !== "www" && currentHost !== hostname) {
      subdomain = currentHost;
    }
  }

  if (!subdomain) {
    subdomain = url.searchParams.get("subdomain");
  }

  if (subdomain === "admin") {
    url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
    url.searchParams.delete("subdomain");
    return NextResponse.rewrite(url);
  }

  if (subdomain === "provider") {
    url.pathname = `/portal${url.pathname === "/" ? "" : url.pathname}`;
    url.searchParams.delete("subdomain");
    return NextResponse.rewrite(url);
  }

  if (subdomain === "user") {
    url.pathname = `/dashboard${url.pathname === "/" ? "" : url.pathname}`;
    url.searchParams.delete("subdomain");
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

### Deleted components:
- src/components/admin/AdminSidebar/index.tsx + styles.css
- src/components/admin/AdminTopbar/index.tsx + styles.css
- src/components/provider/ProviderSidebar/index.tsx + styles.css
- src/components/provider/ProviderTopbar/index.tsx + styles.css
- src/components/user/UserSidebar/index.tsx + styles.css
- src/components/user/UserTopbar/index.tsx + styles.css
(These were "use client" sidebar/topbar navigation components for portal layouts)

### Deleted API routes:
- src/app/api/auth/[...nextauth]/route.ts (NextAuth handler)
- src/app/api/appointments/book/route.ts (portal-only)
- src/app/api/providers/boost/route.ts (portal-only)

### Deleted lib:
- src/lib/auth/config.ts (NextAuth config with Credentials provider)
- src/lib/auth/index.ts (re-exports)

---

## PAGES THAT NEED REFACTORING (inline components to extract)

### Current locations (after flattening from (public)/ to app/):

### 1. src/app/business/[slug]/page.tsx (319 lines)
Currently has inline: ProviderHero, SocialLinks, SocialIcon, ProviderLists, ProviderStickyBar
Also has colocated: ProviderProfileContent.tsx (client component - needs to move to src/components/)
Full content already on disk - just needs extraction.

### 2. src/app/overview/page.tsx (311 lines)
Currently has inline: OverviewHero, BrandCard, WhatWeOffer, DigitalMarketing, MarketingContent, MarketingServiceCard
Plus SVG icons (VersatileBrandIcon, DigitalAgencyIcon) and constants (BRAND_CARDS, MARKETING_SERVICES)
Full content already on disk.

### 3. src/app/urgent-care/page.tsx (140 lines)
Currently has inline: UrgentCareHero, UrgentCareInfo, UrgentCareServices, UrgentCareFeatures, UrgentCareCTA
Full content already on disk.

### 4. src/app/blog/[slug]/page.tsx (118 lines)
Currently has inline: PostFeaturedImage, PostHeader, PostContent, RelatedPosts
Full content already on disk.

### 5. src/app/contact-us/page.tsx (117 lines)
Currently has inline: ContactLeftColumn, ContactRightColumn, ProviderCTA, ContactWays + PROVIDER_CARDS constant
Full content already on disk.

### 6. src/app/business-category/lawyers/page.tsx (63 lines)
Inline: SpecialtyCard
Full content already on disk.

### 7. src/app/business-category/medical-providers/page.tsx (73 lines)
Inline: SpecialtyGroupSection, SpecialtyCard
Full content already on disk.

### 8. src/app/business-category/service-providers/page.tsx (55 lines)
Inline: SpecialtyGroupSection, SpecialtyLink
Full content already on disk.

### 9. src/app/find-a-provider/page.tsx (30 lines)
Inline: PageLoading (4 lines)
Colocated: FindAProviderContent.tsx, FindProviderCard.tsx, ProviderMap.tsx (client components - need to move)

### 10. src/app/blog/page.tsx (30 lines)
Inline: BlogLoadingState (6 lines)
Colocated: BlogIndexContent.tsx (client component - needs to move)

---

## EXISTING COLOCATED FILES THAT NEED TO MOVE TO src/components/

These files currently sit next to page.tsx in app/ and must move:

1. src/app/business/[slug]/ProviderProfileContent.tsx → src/components/public/ProviderProfileContent/index.tsx
2. src/app/blog/BlogIndexContent.tsx → src/components/public/BlogIndexContent/index.tsx
3. src/app/find-a-provider/FindAProviderContent.tsx → src/components/public/FindAProviderContent/index.tsx
4. src/app/find-a-provider/FindProviderCard.tsx → src/components/public/FindProviderCard/index.tsx
5. src/app/find-a-provider/ProviderMap.tsx → src/components/public/ProviderMap/index.tsx
6. src/app/our-team/TeamCard.tsx → src/components/public/TeamCard/index.tsx
7. src/app/provider-sign-up/ProviderSignUpForm.tsx → src/components/public/ProviderSignUpForm/index.tsx

---

## NEW COMPONENTS TO CREATE (from inline extractions)

All go to src/components/public/ComponentName/index.tsx:

1. ProviderProfilePage/index.tsx — exports ProviderHero, ProviderLists, ProviderStickyBar (+ internal SocialLinks, SocialIcon)
2. OverviewPage/index.tsx — exports OverviewContent (wraps OverviewHero, WhatWeOffer, DigitalMarketing + constants + SVGs)
3. UrgentCarePage/index.tsx — exports UrgentCareContent (wraps all sections)
4. BlogPostPage/index.tsx — exports PostFeaturedImage, PostHeader, PostContent, RelatedPosts
5. ContactUsPage/index.tsx — exports ContactUsContent (wraps all sections + PROVIDER_CARDS constant)
6. LawyersPage/index.tsx — exports LawyersContent (takes specialties prop, renders SpecialtyCard)
7. MedicalProvidersPage/index.tsx — exports MedicalProvidersContent (takes groups prop)
8. ServiceProvidersPage/index.tsx — exports ServiceProvidersContent (takes groups prop)
9. FindProviderLoading/index.tsx — exports FindProviderLoading (Suspense fallback)
10. BlogLoading/index.tsx — exports BlogLoading (Suspense fallback)

---

## PAGES ALREADY CLEAN (no changes needed to these page.tsx files, only import path updates if their components moved):

- src/app/page.tsx (homepage)
- src/app/attorney-endorsement/page.tsx
- src/app/faq/page.tsx
- src/app/our-team/page.tsx (needs import update for TeamCard)
- src/app/provider-sign-up/page.tsx (needs import update for ProviderSignUpForm)
- src/app/privacy-policy/page.tsx
- src/app/terms-and-conditions/page.tsx
- src/app/payment-policy/page.tsx
- src/app/return-and-refund-policy/page.tsx
- src/app/not-found.tsx

---

## WHAT'S ALREADY DONE:
1. ✅ Deleted (admin)/, (provider)/, (user)/ route groups
2. ✅ Deleted components/admin/, components/provider/, components/user/
3. ✅ Deleted lib/auth/, api/auth/, api/appointments/book/, api/providers/boost/
4. ✅ Deleted (public)/login/, (public)/signup/
5. ✅ Flattened (public)/ → app/ (all routes moved up)
6. ✅ Merged root layout.tsx + public layout.tsx into single layout.tsx
7. ✅ Simplified middleware.ts (removed subdomain routing)

## WHAT'S LEFT TO DO:
1. Move existing colocated components from app/ to src/components/public/
2. Extract inline components from pages into src/components/public/
3. Slim down all page.tsx files to just imports + data fetching + composition
4. Update all import paths
5. pnpm build to verify
