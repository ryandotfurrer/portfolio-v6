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
  linkedin: { href: 'https://www.linkedin.com/in/ryanfurrer/' },
  twitch: { href: 'https://www.twitch.tv/ryandotfurrer' },
  x: { href: 'https://x.com/ryandotfurrer' },
  youtube: { href: 'https://www.youtube.com/@ryandotfurrer' },
};
