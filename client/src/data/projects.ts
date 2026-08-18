// YRD. Technical Gallery: reusable project content is deliberately structured as a clean studio index for easy replacement.
export type Project = {
  id: string;
  name: string;
  description: string;
  role: string;
  href?: string;
  image?: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    name: "XO Ethiopia",
    description: "A real-time multiplayer gaming experience built around speed, interaction, and a simple mobile-first interface.",
    role: "Product · Full-stack",
    href: "/work#xo-ethiopia",
    image: "/manus-storage/yrd-xo-project-visual_d08df681.png",
  },
  {
    id: "02",
    name: "Archive reservation 02",
    description: "Reserved for the next product record.",
    role: "Record unavailable",
    placeholder: true,
  },
  {
    id: "03",
    name: "Archive reservation 03",
    description: "Reserved for the next product record.",
    role: "Record unavailable",
    placeholder: true,
  },
];

export const services = [
  { id: "01", title: "Websites", copy: "Modern websites that don't just look good, but guide people toward action." },
  { id: "02", title: "Web & Mobile Applications", copy: "Functional products with real users, real data, and real business logic." },
  { id: "03", title: "AI & Automation", copy: "Intelligent systems and automated workflows that remove repetitive work from a business." },
  { id: "04", title: "Product Systems", copy: "The backend, database, and infrastructure that keep everything running underneath." },
];
