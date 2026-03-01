"use client";

import {
	Accordion as ShadcnAccordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionItemData {
	id: number;
	question: string;
	answer: string;
}

interface AccordionProps {
	items: AccordionItemData[];
	className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
	return (
		<ShadcnAccordion type="single" collapsible className={className}>
			{items.map((item) => (
				<AccordionItem key={item.id} value={String(item.id)}>
					<AccordionTrigger className="text-left font-medium">
						{item.question}
					</AccordionTrigger>
					<AccordionContent>{item.answer}</AccordionContent>
				</AccordionItem>
			))}
		</ShadcnAccordion>
	);
}
