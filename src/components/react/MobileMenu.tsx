'use client';

import { useState } from 'react';
import { NavLinks } from '../../utils/utils';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 cursor-pointer"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? 'close' : 'menu'}
      </button>

      <div
        className={`border-border bg-card fixed top-24 right-4 left-4 z-40 origin-top transform rounded-b-lg border border-t-0 p-4 text-right transition-all duration-300 ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <ul className="flex flex-col gap-8 pt-12">
          {NavLinks.map(
            (link, index) =>
              link.label !== 'contact' && (
                <li
                  key={link.href}
                  className={`transform opacity-0 blur-[8px] transition-all duration-300 ${
                    isOpen ? 'opacity-100 blur-none' : ''
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                  }}
                >
                  <a href={link.href} className="block">
                    {link.label}
                  </a>
                </li>
              ),
          )}
          <li
            className={`transform opacity-0 blur-[8px] transition-all duration-300 ${
              isOpen ? 'opacity-100 blur-none' : ''
            }`}
            style={{
              transitionDelay: isOpen ? `${NavLinks.length * 100}ms` : '0ms',
            }}
          >
            <a
              href="/contact"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-3"
            >
              contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
