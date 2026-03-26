import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand revalidation endpoint (server-to-server).
 * POST /api/revalidate
 * Body: { paths: ["/blog", "/blog/some-slug"], secret: "..." }
 *
 * Called by the API backend after mutations.
 * The secret must match REVALIDATION_SECRET env var.
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { secret, paths } = body;

		const expectedSecret = process.env.REVALIDATION_SECRET || "ian-revalidate-2024";
		if (secret !== expectedSecret) {
			return NextResponse.json(
				{ success: false, message: "Invalid secret" },
				{ status: 401 },
			);
		}

		const pathsToRevalidate: string[] = paths?.length
			? paths
			: ["/blog", "/"];

		for (const path of pathsToRevalidate) {
			revalidatePath(path);
		}

		return NextResponse.json({
			success: true,
			revalidated: pathsToRevalidate,
			now: Date.now(),
		});
	} catch {
		return NextResponse.json(
			{ success: false, message: "Failed to revalidate" },
			{ status: 500 },
		);
	}
}
