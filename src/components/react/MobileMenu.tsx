'use client';

import { useState } from 'react';
import { NavLinks } from '../../utils/utils';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='md:hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='cursor-pointer relative z-50'
        aria-label='Toggle mobile menu'
      >
        menu
      </button>

      <div
        className={`w-2/3 fixed top-20 right-12 z-40 p-4 rounded-lg border border-border text-right bg-card transform transition-all origin-top ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
      >
        <ul className='flex flex-col gap-8'>
          {NavLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a
              href='/contact'
              className='bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 inline-flex items-center justify-center'
            >
              contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
