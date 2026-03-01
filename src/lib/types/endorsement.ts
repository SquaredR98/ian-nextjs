export interface Endorsement {
  id: number;
  attorney_name: string;
  firm_name: string;
  practice_areas: string[];
  locations: string[];
  website: string;
  photo_url: string;
  youtube_video_id?: string;
}
