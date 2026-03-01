import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
}

const sizeClasses: Record<string, string> = {
	sm: "h-4 w-4",
	md: "h-6 w-6",
	lg: "h-10 w-10",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
	return (
		<div className={cn("flex items-center justify-center", className)} role="status">
			<Loader2 className={cn("text-primary animate-spin", sizeClasses[size])} />
			<span className="sr-only">Loading...</span>
		</div>
	);
}
