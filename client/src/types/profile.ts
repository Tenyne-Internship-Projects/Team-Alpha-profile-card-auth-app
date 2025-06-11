// src/types/profile.ts
export interface IFreelancerProfile {
  _id: string;
  name: string;
  title: string;
  bio: string;
  skills: string;
  location: string;
  imageUrl?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}
