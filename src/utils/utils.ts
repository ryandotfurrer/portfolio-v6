import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NavLinks = [
  { href: '/', label: 'home' },
  { href: '/work', label: 'work' },
  { href: '/writing', label: 'writing' },
  { href: '/speaking', label: 'speaking' },
  { href: '/about', label: 'about' },
];
