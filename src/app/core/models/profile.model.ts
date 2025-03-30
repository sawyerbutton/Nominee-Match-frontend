import { Skill } from './skills.model';

export interface Profile {
  id: string;
  walletAddress: string;
  name: string;
  email: string;
  githubUsername: string;
  skills: Skill[];
  experience: number;
  projects: Project[];
  location: Location;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  startDate: Date;
  endDate?: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
}

export interface Match {
  id: string;
  profileId: string;
  matchedProfileId: string;
  matchScore: number;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}
