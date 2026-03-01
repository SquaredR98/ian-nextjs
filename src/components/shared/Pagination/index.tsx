"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const pages = buildPageNumbers(currentPage, totalPages);

	return (
		<nav className="flex items-center justify-center gap-1">
			<Button
				variant="outline"
				size="sm"
				disabled={currentPage <= 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				Previous
			</Button>

			{pages.map((page, i) =>
				page === "..." ? (
					<span
						key={`ellipsis-${i}`}
						className="text-muted-foreground flex h-8 w-8 items-center justify-center text-sm"
					>
						...
					</span>
				) : (
					<Button
						key={page}
						variant={page === currentPage ? "default" : "outline"}
						size="sm"
						className={cn("h-8 w-8 p-0")}
						onClick={() => onPageChange(page as number)}
					>
						{page}
					</Button>
				),
			)}

			<Button
				variant="outline"
				size="sm"
				disabled={currentPage >= totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				Next
			</Button>
		</nav>
	);
}

function buildPageNumbers(
	current: number,
	total: number,
): (number | "...")[] {
	if (total <= 10) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}

	const pages: (number | "...")[] = [];
	pages.push(1);

	if (current > 4) pages.push("...");

	const start = Math.max(2, current - 2);
	const end = Math.min(total - 1, current + 2);

	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	if (current < total - 3) pages.push("...");

	pages.push(total);
	return pages;
}
