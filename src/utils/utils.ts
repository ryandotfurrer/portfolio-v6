import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NavLinks = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/writing', label: 'writing' },
  { href: '/speaking', label: 'speaking' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
];

export const SocialLinks = {
  bento: { href: 'https://bento.me/ryandotfurrer' },
  github: { href: 'https://github.com/ryandotfurrer' },
  githubPortfolioRepo: {
    href: 'https://github.com/ryandotfurrer/portfolio-v6',
  },
  linkedin: { href: 'https://www.linkedin.com/in/ryanfurrer/' },
  twitch: { href: 'https://www.twitch.tv/ryandotfurrer' },
  x: { href: 'https://x.com/ryandotfurrer' },
  youtube: { href: 'https://www.youtube.com/@ryandotfurrer' },
};

export const PreviousPortfolios = {
  v2: {
    title: 'Version 2',
    releaseYear: 2019,
    technologies: ['HTML', 'Open Props', 'JavaScript'],
    liveSiteURL: 'https://ryanfurrer-v2.netlify.app/',
    githubURL: 'https://github.com/ryandotfurrer/ryanfurrer-v2',
    image: '/images/portfolio-v2.png',
  },
  v3: {
    title: 'Version 3',
    releaseYear: 2022,
    technologies: ['HTML', 'SCSS', 'JavaScript'],
    liveSiteURL: 'https://ryanfurrer-v3.netlify.app/',
    githubURL: 'https://github.com/ryandotfurrer/ryanfurrer-v3',
    image: '/images/portfolio-v3.png',
  },
  v4: {
    title: 'Version 4',
    releaseYear: 2023,
    technologies: ['HTML', 'SCSS', 'JavaScript', 'SEO'],
    liveSiteURL: 'https://ryanfurrer-v4.netlify.app/',
    githubURL: 'https://github.com/ryandotfurrer/ryanfurrer-v4',
    image: '/images/portfolio-v4.png',
  },
  v5: {
    title: 'Version 5',
    releaseYear: 2024,
    technologies: ['TypeScript', 'Astro', 'Tailwind CSS', 'Storyblok', 'SEO'],
    liveSiteURL: 'https://ryanfurrer-v5.netlify.app/',
    githubURL: 'https://github.com/ryandotfurrer/ryanfurrer-v5',
    image: '/images/portfolio-v5.png',
  },
};

export const Conferences = {
  commit: 'the Commit Your Code Conference',
  render: '🍑 RenderATL'
}
