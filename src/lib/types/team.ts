export interface TeamMember {
  name: string;
  title: string;
  photo: string;
  description: string;
  bio_sections: BioSection[];
}

export interface BioSection {
  heading: string;
  icon: string;
  content: string[];
}
