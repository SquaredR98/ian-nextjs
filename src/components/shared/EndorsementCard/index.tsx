import type { Endorsement } from "@/lib/types";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface EndorsementCardProps {
  endorsement: Endorsement;
  className?: string;
}

export function EndorsementCard({
  endorsement,
  className,
}: EndorsementCardProps) {
  return (
    <div className={cn("endorsement-card", className)}>
      <div className="endorsement-card-header">
        <FallbackImage
          src={resolveImageUrl(endorsement.photo_url)}
          alt={endorsement.attorney_name}
          width={120}
          height={120}
          className="endorsement-card-photo"
          fallbackType="avatar"
          fallbackText={endorsement.attorney_name}
        />
        <EndorsementInfo endorsement={endorsement} />
      </div>
      {endorsement.youtube_video_id && (
        <div className="endorsement-card-video">
          <iframe
            src={`https://www.youtube.com/embed/${endorsement.youtube_video_id}?rel=0`}
            title={`${endorsement.attorney_name} endorsement video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="endorsement-card-iframe"
          />
        </div>
      )}
    </div>
  );
}

function EndorsementInfo({ endorsement }: { endorsement: Endorsement }) {
  return (
    <div className="endorsement-card-info">
      <h3 className="endorsement-card-name">{endorsement.attorney_name}</h3>
      <p className="endorsement-card-firm">{endorsement.firm_name}</p>
      <EndorsementList label="Practice Areas" items={endorsement.practice_areas} />
      <EndorsementList label="Locations" items={endorsement.locations} />
      {endorsement.website && (
        <a
          href={endorsement.website}
          target="_blank"
          rel="noopener noreferrer"
          className="endorsement-card-link"
        >
          Visit Website
        </a>
      )}
    </div>
  );
}

function EndorsementList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="endorsement-card-list">
      <span className="endorsement-card-list-label">{label}:</span>
      <span className="endorsement-card-list-value">{items.join(", ")}</span>
    </div>
  );
}
