import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
	return (
		<div
			className={cn(
				"border-t border-[#ebedf1] bg-white px-4 py-2.5 shadow-[0_0_30px_rgba(0,0,0,0.08)]",
				className,
			)}
		>
			<nav className="mx-auto max-w-7xl">
				<ol className="flex list-none gap-1 p-0">
					{items.map((item, index) => {
						const isLast = index === items.length - 1;
						return (
							<li
								key={item.label}
								className={cn(
									"text-sm font-medium leading-6",
									isLast && "text-(--color-ian-breadcrumb-active)",
								)}
							>
								{item.href && !isLast ? (
									<Link href={item.href} className="text-black no-underline hover:underline">
										{item.label}
									</Link>
								) : (
									<span>{item.label}</span>
								)}
								{!isLast && <span className="mx-1.5">/</span>}
							</li>
						);
					})}
				</ol>
			</nav>
		</div>
	);
}
