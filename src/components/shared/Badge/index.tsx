import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeProps {
	variant?: "primary" | "medical" | "legal" | "service" | "verified";
	children: React.ReactNode;
	className?: string;
}

const variantStyles: Record<string, string> = {
	primary: "bg-primary text-primary-foreground hover:bg-primary/80",
	medical: "bg-ian-success text-white hover:bg-ian-success/80",
	legal: "bg-[#08309c] text-white hover:bg-[#08309c]/80",
	service: "bg-ian-warning text-black hover:bg-ian-warning/80",
	verified: "bg-ian-success text-white hover:bg-ian-success/80",
};

export function Badge({
	variant = "primary",
	children,
	className,
}: BadgeProps) {
	return (
		<ShadcnBadge className={cn(variantStyles[variant], className)}>
			{children}
		</ShadcnBadge>
	);
}
