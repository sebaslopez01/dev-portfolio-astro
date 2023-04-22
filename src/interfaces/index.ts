import type { ImageMetadata } from "astro";

interface NavLinkData {
  id: string;
  title: string;
}

interface ServiceData {
  title: string;
  icon: ImageMetadata;
}

interface TechnologyData {
  name: string;
  icon: ImageMetadata;
}

interface ExperienceData {
  title: string;
  companyName: string;
  icon: ImageMetadata;
  iconBg: string;
  date: string;
  points: string[];
}

interface TestimonialData {
  testimonial: string;
  name: string;
  designation: string;
  companyName: string;
  image: ImageMetadata;
}

interface ProjectData {
  name: string;
  description: string;
  tags: {
    name: string;
    color:
      | "blue-text-gradient"
      | "green-text-gradient"
      | "pink-text-gradient"
      | "orange-text-gradient";
  }[];
  image: ImageMetadata;
  pageLink?: string;
  sourceCodeLink?: string;
}

interface ContactData {
  name: string;
  email: string;
  message: string;
}

export type {
  NavLinkData,
  ServiceData,
  TechnologyData,
  ExperienceData,
  TestimonialData,
  ProjectData,
  ContactData,
};
