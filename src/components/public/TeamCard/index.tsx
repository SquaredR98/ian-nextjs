"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { TeamMember, BioSection } from "@/lib/types";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { Gavel, BookOpen, MapPin, Settings, CheckCircle2 } from "lucide-react";

const ICON_MAP: Record<string, typeof Gavel> = {
	gavel: Gavel,
	book: BookOpen,
	"map-pin": MapPin,
	gear: Settings,
};

export function TeamCard({ member }: { member: TeamMember }) {
	const [activeTab, setActiveTab] = useState(0);
	const activeSection = member.bio_sections[activeTab];

	return (
		<div className="team-card">
			<div className="team-card-banner" />

			<div className="team-card-top">
				<div className="team-card-photo-col">
					<div className="team-card-photo-wrap">
						<FallbackImage
							src={member.photo}
							alt={member.name}
							width={400}
							height={400}
							className="team-card-image"
							fallbackType="avatar"
							fallbackText={member.name}
						/>
					</div>
				</div>
				<div className="team-card-intro">
					<h2 className="team-card-name">{member.name}</h2>
					{member.title && (
						<span className="team-card-title">{member.title}</span>
					)}
					<p className="team-card-description">{member.description}</p>
				</div>
			</div>

			{member.bio_sections.length > 0 && (
				<div className="team-card-bottom">
					<TeamTabs
						sections={member.bio_sections}
						activeTab={activeTab}
						onTabChange={setActiveTab}
					/>
					<TeamTabContent section={activeSection} />
				</div>
			)}
		</div>
	);
}

function TeamTabs({
	sections,
	activeTab,
	onTabChange,
}: {
	sections: BioSection[];
	activeTab: number;
	onTabChange: (index: number) => void;
}) {
	const tabsRef = useRef<HTMLDivElement>(null);
	const [indicator, setIndicator] = useState({ left: 0, width: 0 });

	const updateIndicator = useCallback(() => {
		const container = tabsRef.current;
		if (!container) return;
		const activeEl = container.children[activeTab] as HTMLElement | undefined;
		if (!activeEl) return;
		setIndicator({
			left: activeEl.offsetLeft,
			width: activeEl.offsetWidth,
		});
	}, [activeTab]);

	useEffect(() => {
		updateIndicator();
	}, [updateIndicator]);

	return (
		<div className="team-tabs-wrapper">
			<div className="team-tabs" ref={tabsRef}>
				{sections.map((section, index) => {
					const Icon = ICON_MAP[section.icon];
					const isActive = index === activeTab;
					return (
						<button
							key={section.heading}
							className={`team-tab ${isActive ? "team-tab-active" : ""}`}
							onClick={() => onTabChange(index)}
						>
							{Icon && <Icon className="team-tab-icon" />}
							<span>{section.heading}</span>
						</button>
					);
				})}
			</div>
			<div className="team-tabs-track">
				<div
					className="team-tabs-indicator"
					style={{ left: indicator.left, width: indicator.width }}
				/>
			</div>
		</div>
	);
}

function TeamTabContent({ section }: { section: BioSection }) {
	return (
		<div className="team-tab-panel">
			<ul className="team-tab-content">
				{section.content.map((item, idx) => (
					<li key={idx} className="team-tab-item">
						<CheckCircle2 className="team-tab-item-icon" />
						<span>{item}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
