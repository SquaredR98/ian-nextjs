import type { TeamMember } from "@/lib/types";

export const mockTeam: TeamMember[] = [
	{
		name: "Michael A. Mills",
		title: "Founder/Attorney",
		photo: "/ourteam/micle.webp",
		description:
			"Michael A. Mills and his team stand ready to provide creative legal solutions to effectively resolve every case. We work hard to achieve client objectives in an efficient and cost-conscious manner. Clients work directly with our lawyers and benefit from our efficient communication practices. Orlando locals trust our personal injury law firm because we work aggressively to ensure you get the compensation you deserve.",
		bio_sections: [
			{
				heading: "Experience & Achievements",
				icon: "gavel",
				content: [
					"20+ years of overall legal experience, representing both insurers and individuals in personal injury matters.",
					"At Injury Assistance LF: Represents clients in auto & trucking accidents, slip & falls, wrongful death, motorcycle accidents, dog bites, cruise-ship/boat/pedestrian/bicycle accidents, and brain injury claims.",
					"Notable Results: Reported verdicts include settlements of $2.75M for a traumatic brain injury, $675K for a slip & fall, $300K and $250K for auto accidents.",
				],
			},
			{
				heading: "Education & Early Career",
				icon: "book",
				content: [
					"B.A. in Political Science, University of Central Florida, 1995",
					"Juris Doctor, Florida State University College of Law, April 2000. Served as a Virgil Hawkins Scholar. Editor of the Journal of Transnational Law and Policy.",
				],
			},
			{
				heading: "Location",
				icon: "map-pin",
				content: [
					"Florida Bar Member",
					"Orange County Hispanic Bar Association",
				],
			},
			{
				heading: "Entrepreneurship & Industry Impact",
				icon: "gear",
				content: [
					"Founded the Injury Assistance Network — a curated state-wide (and growing) network of attorney-vetted medical/service providers dedicated to helping personal injury victims find trusted care.",
					"Recognized as one of the Top 100 National Black Lawyers in 2020",
				],
			},
		],
	},
];
