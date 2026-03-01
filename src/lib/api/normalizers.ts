/**
 * Normalizers to map live backend response shapes to frontend types.
 * The backend returns camelCase DB fields; the frontend expects a different shape.
 */

import type {
	BlogPost, BlogCategory, Provider, ProviderDetail, GoogleReview,
	SocialMedia, Specialty, Testimonial, Endorsement, FAQItem, TeamMember,
} from "@/lib/types";

// ─── Blog ────────────────────────────────────────────────────────────

interface RawBlogPost {
	id: number;
	slug: string;
	picture: string | null;
	categoryIds: string | null;
	tags: string | null;
	title: string;
	blogContent: string;
	publishedDate: string | null;
	authorName: string | null;
	commentStatus: string | null;
	[key: string]: unknown;
}

function stripHtml(html: string): string {
	return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function makeExcerpt(html: string, maxLen = 160): string {
	const text = stripHtml(html);
	if (text.length <= maxLen) return text;
	return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

/**
 * Resolve categoryIds ("15,5") to category name strings.
 * If a lookup map is provided, use it; otherwise return the raw IDs.
 */
function resolveCategoryIds(
	raw: string | null,
	catMap?: Map<number, string>,
): string[] {
	if (!raw) return [];
	const ids = raw
		.split(",")
		.map((s) => Number(s.trim()))
		.filter((n) => !Number.isNaN(n));
	if (catMap) {
		return ids.map((id) => catMap.get(id) ?? String(id));
	}
	return ids.map(String);
}

function parseTags(raw: string | null): string[] {
	if (!raw) return [];
	return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export function normalizeBlogPost(
	raw: RawBlogPost,
	catMap?: Map<number, string>,
): BlogPost {
	return {
		id: raw.id,
		title: raw.title,
		slug: raw.slug,
		excerpt: makeExcerpt(raw.blogContent || ""),
		content: raw.blogContent,
		featured_image: raw.picture || "",
		categories: resolveCategoryIds(raw.categoryIds, catMap),
		tags: parseTags(raw.tags),
		author: (raw.authorName as string) || undefined,
		published_at: raw.publishedDate || raw.createdAt as string || "",
		comment_status: (raw.commentStatus as "Y" | "N") || "Y",
	};
}

// ─── Blog Categories ─────────────────────────────────────────────────

interface RawBlogCategory {
	id: number;
	slug: string;
	name: string;
	[key: string]: unknown;
}

export function normalizeBlogCategory(raw: RawBlogCategory): BlogCategory {
	return {
		name: raw.name,
		slug: raw.slug,
		count: (raw.blogCount as number) ?? 0,
	};
}

// ─── Provider (from find-provider search) ────────────────────────────

interface RawProviderSearch {
	id: number;
	city: string;
	reviewJson: string | null;
	formattedAddress: string | null;
	latitude: string | number | null;
	longitude: string | number | null;
	googleMyBusinessLink: string | null;
	distance?: number | null;
	business: {
		slug: string;
		businessName: string;
		picture: string | null;
		phone: string | null;
		websiteUrl: string | null;
	};
	category: {
		slug: string;
		name: string;
	};
	speciality: {
		name: string;
	};
	[key: string]: unknown;
}

function parseReviewJson(raw: string | null): {
	rating: number;
	reviewCount: number;
} {
	if (!raw) return { rating: 0, reviewCount: 0 };
	try {
		const parsed = JSON.parse(raw);
		const result = parsed.result || {};
		return {
			rating: result.rating || 0,
			reviewCount: result.user_ratings_total || 0,
		};
	} catch {
		return { rating: 0, reviewCount: 0 };
	}
}

function extractCityState(formattedAddress: string | null): {
	city: string;
	state: string;
} {
	if (!formattedAddress) return { city: "", state: "" };
	// "Orlando, FL, USA" → city=Orlando, state=FL
	const parts = formattedAddress.split(",").map((s) => s.trim());
	return {
		city: parts[0] || "",
		state: parts[1] || "",
	};
}

function mapCategorySlug(
	slug: string,
): "medical" | "legal" | "service" {
	if (slug === "legal-providers" || slug === "attorneys") return "legal";
	if (slug === "service-providers") return "service";
	return "medical";
}

export function normalizeProvider(raw: RawProviderSearch): Provider {
	const { rating, reviewCount } = parseReviewJson(raw.reviewJson);
	const { city, state } = extractCityState(raw.formattedAddress);
	const lat = raw.latitude != null ? Number(raw.latitude) : undefined;
	const lng = raw.longitude != null ? Number(raw.longitude) : undefined;

	return {
		id: raw.id,
		slug: raw.business?.slug || "",
		business_name: raw.business?.businessName || "",
		category: mapCategorySlug(raw.category?.slug || ""),
		specialty: raw.speciality?.name || "",
		city,
		state,
		logo_url: raw.business?.picture || "",
		rating,
		review_count: reviewCount,
		is_verified: true,
		latitude: lat && !Number.isNaN(lat) ? lat : undefined,
		longitude: lng && !Number.isNaN(lng) ? lng : undefined,
		phone: raw.business?.phone || undefined,
		website: raw.business?.websiteUrl || undefined,
		address: raw.formattedAddress || undefined,
		google_maps_link: raw.googleMyBusinessLink || undefined,
		distance: raw.distance != null ? Number(raw.distance) : undefined,
	};
}

// ─── Featured Speciality → Provider (best effort) ───────────────────

interface RawFeaturedSpeciality {
	id: number;
	picture: string | null;
	category: { slug: string; name: string };
	speciality: {
		id?: number;
		slug: string;
		name: string;
		picture?: string | null;
		shortDescription?: string | null;
	};
	specialityGroup: { slug: string; name: string };
	[key: string]: unknown;
}

export function normalizeFeaturedSpeciality(
	raw: RawFeaturedSpeciality,
): Provider {
	return {
		id: raw.id,
		slug: raw.speciality?.slug || "",
		business_name: raw.speciality?.name || "",
		category: mapCategorySlug(raw.category?.slug || ""),
		specialty: raw.specialityGroup?.name || "",
		city: "",
		state: "",
		logo_url: raw.picture || "",
		rating: 0,
		review_count: 0,
		is_verified: true,
	};
}

// ─── Specialty ───────────────────────────────────────────────────────

interface RawSpeciality {
	id: number;
	slug: string;
	name: string;
	picture: string | null;
	categoryId: number;
	specialityGroupId: number;
	shortDescription: string | null;
	businessSpecialityContent: string | null;
	[key: string]: unknown;
}

function mapCategoryId(id: number): "medical" | "legal" | "service" {
	if (id === 2) return "legal";
	if (id === 3) return "service";
	return "medical";
}

export function normalizeSpeciality(
	raw: RawSpeciality,
	groupMap?: Map<number, string>,
): Specialty {
	return {
		id: raw.id,
		name: raw.name,
		slug: raw.slug,
		category: mapCategoryId(raw.categoryId),
		group: groupMap?.get(raw.specialityGroupId) ?? null,
		image_url: raw.picture || null,
		description: raw.shortDescription || null,
	};
}

/**
 * Normalize a featured-speciality row into a Specialty with featured_icon_url.
 */
export function normalizeFeaturedToSpecialty(
	raw: RawFeaturedSpeciality,
): Specialty {
	return {
		id: raw.speciality?.id ?? raw.id,
		name: raw.speciality?.name || "",
		slug: raw.speciality?.slug || "",
		category: mapCategorySlug(raw.category?.slug || ""),
		group: raw.specialityGroup?.name || null,
		image_url: raw.speciality?.picture || null,
		featured_icon_url: raw.picture || null,
		description: raw.speciality?.shortDescription || null,
	};
}

// ─── Provider Detail (from /business/:slug) ──────────────────────────

interface RawBusiness {
	id: number;
	slug: string;
	businessName: string;
	picture: string | null;
	websiteUrl: string | null;
	phone: string | null;
	language: string | null;
	serviceProvided: string | null;
	about: string | null;
	socialMedia: string | null;
	youtubeVideoId: string | null;
	provider?: {
		id: number;
		name: string;
		email: string;
		phone: string;
		profilePicture: string | null;
	};
	details?: Array<{
		id: number;
		city: string | null;
		zipcode: string | null;
		formattedAddress: string | null;
		reviewJson: string | null;
		placeId: string | null;
		googleMyBusinessLink: string | null;
		category?: { id: number; slug: string; name: string };
		speciality?: { id: number; name: string; categoryId: number };
		specialityGroup?: { name: string };
	}>;
	[key: string]: unknown;
}

function parseGoogleReviews(reviewJson: string | null): {
	rating: number;
	reviews: GoogleReview[];
} {
	if (!reviewJson) return { rating: 0, reviews: [] };
	try {
		const parsed = JSON.parse(reviewJson);
		const result = parsed.result || {};
		const reviews: GoogleReview[] = (result.reviews || []).map(
			(r: Record<string, unknown>) => ({
				author: (r.author_name as string) || "",
				avatar: (r.profile_photo_url as string) || "",
				rating: (r.rating as number) || 0,
				text: (r.text as string) || "",
				relative_time: (r.relative_time_description as string) || "",
			}),
		);
		return {
			rating: result.rating || 0,
			reviews,
		};
	} catch {
		return { rating: 0, reviews: [] };
	}
}

function splitCommaList(raw: string | null): string[] {
	if (!raw) return [];
	return raw
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

function parseSocialMedia(raw: string | null): SocialMedia {
	if (!raw) return {};
	try {
		const parsed = JSON.parse(raw);
		return {
			facebook: parsed.facebook || undefined,
			instagram: parsed.instagram || undefined,
			linkedin: parsed.linkedin || undefined,
			pinterest: parsed.pinterest || undefined,
		};
	} catch {
		return {};
	}
}

export function normalizeProviderDetail(raw: RawBusiness): ProviderDetail {
	const detail = raw.details?.[0];
	const { rating, reviewCount } = parseReviewJson(detail?.reviewJson ?? null);
	const googleReviews = parseGoogleReviews(detail?.reviewJson ?? null);
	const { city, state } = extractCityState(detail?.formattedAddress ?? null);

	// Collect unique specialties from all details
	const specialtiesMap = new Map<number, { id: number; name: string; category_id: number }>();
	for (const d of raw.details ?? []) {
		if (d.speciality?.id) {
			specialtiesMap.set(d.speciality.id, {
				id: d.speciality.id,
				name: d.speciality.name,
				category_id: d.speciality.categoryId ?? d.category?.id ?? 0,
			});
		}
	}

	return {
		id: raw.id,
		slug: raw.slug || "",
		business_name: raw.businessName || "",
		category: mapCategorySlug(detail?.category?.slug || ""),
		specialty: detail?.speciality?.name || "",
		city,
		state,
		logo_url: raw.picture || "",
		rating,
		review_count: reviewCount,
		is_verified: true,
		description: raw.about || "",
		address: detail?.formattedAddress || "",
		zipcode: detail?.zipcode || "",
		phone: raw.phone || raw.provider?.phone || "",
		website: raw.websiteUrl || "",
		languages: splitCommaList(raw.language),
		services: splitCommaList(raw.serviceProvided),
		specialties: Array.from(specialtiesMap.values()),
		gallery: [],
		social_media: parseSocialMedia(raw.socialMedia),
		youtube_video_id: raw.youtubeVideoId || "",
		google_reviews: googleReviews,
		google_cid: detail?.placeId || "",
		google_maps_url: detail?.googleMyBusinessLink || "",
	};
}

// ─── Testimonials ────────────────────────────────────────────────────

interface RawTestimonial {
	id: number;
	profilePicture: string | null;
	name: string | null;
	message: string | null;
	rating: number | null;
	[key: string]: unknown;
}

export function normalizeTestimonial(raw: RawTestimonial): Testimonial {
	return {
		id: raw.id,
		author_name: raw.name || "",
		text: raw.message || "",
		photo_url: raw.profilePicture || "",
		rating: raw.rating || 5,
	};
}

// ─── Endorsements ────────────────────────────────────────────────────

interface RawEndorsement {
	id: number;
	profilePicture: string | null;
	name: string | null;
	firmName: string | null;
	practiceArea: string | null;
	officeLocation: string | null;
	websiteUrl: string | null;
	youtubeVideoId: string | null;
	[key: string]: unknown;
}

export function normalizeEndorsement(raw: RawEndorsement): Endorsement {
	return {
		id: raw.id,
		attorney_name: raw.name || "",
		firm_name: raw.firmName || "",
		practice_areas: splitCommaList(raw.practiceArea),
		locations: splitCommaList(raw.officeLocation),
		website: raw.websiteUrl || "",
		photo_url: raw.profilePicture || "",
		youtube_video_id: raw.youtubeVideoId || undefined,
	};
}

// ─── FAQs ────────────────────────────────────────────────────────────

interface RawFaq {
	id: number;
	question: string | null;
	answer: string | null;
	categoryId?: number | null;
	[key: string]: unknown;
}

export function normalizeFaq(raw: RawFaq): FAQItem {
	return {
		id: raw.id,
		question: raw.question || "",
		answer: raw.answer || "",
		categoryId: raw.categoryId ?? null,
	};
}

// ─── Team (CMS Page) ────────────────────────────────────────────────

interface RawCmsPage {
	id: number;
	pageName: string | null;
	pageTitle: string | null;
	pageContent: string | null;
	[key: string]: unknown;
}

export function normalizeTeamPage(raw: RawCmsPage): TeamMember {
	return {
		name: raw.pageTitle || "Our Team",
		title: "",
		photo: "",
		description: raw.pageContent || "",
		bio_sections: [],
	};
}
