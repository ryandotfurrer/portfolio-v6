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
        {isOpen ? 'close' : 'menu'}
      </button>

      <div
        className={`w-[91.8%] fixed top-21.2 right-4 z-40 p-4 rounded-b-lg border border-border border-t-0 text-right bg-card transform transition-all duration-300 origin-top ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <ul className='flex flex-col gap-8 pt-12'>
          {NavLinks.map((link, index) => (
            <li
              key={link.href}
              className={`transform blur-[8px] opacity-0 transition-all duration-300 ${
                isOpen ? 'blur-none opacity-100' : ''
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
              }}
            >
              <a href={link.href} className='block'>
                {link.label}
              </a>
            </li>
          ))}
          <li
            className={`transform blur-[8px] opacity-0 transition-all duration-300 ${
              isOpen ? 'blur-none opacity-100' : ''
            }`}
            style={{
              transitionDelay: isOpen ? `${NavLinks.length * 100}ms` : '0ms',
            }}
          >
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
