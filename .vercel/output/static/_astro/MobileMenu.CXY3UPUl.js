import { j as e } from './jsx-runtime.D_zvdyIk.js';
import { r as n } from './index.ai7qpRr1.js';
const t = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/writing', label: 'writing' },
  { href: '/speaking', label: 'speaking' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
];
function c() {
  const [r, l] = n.useState(!1);
  return e.jsxs('div', {
    className: 'md:hidden',
    children: [
      e.jsx('button', {
        onClick: () => l(!r),
        className: 'relative z-50 cursor-pointer',
        'aria-label': 'Toggle mobile menu',
        children: r ? 'close' : 'menu',
      }),
      e.jsx('div', {
        className: `border-border bg-card fixed top-24 right-4 left-4 z-40 origin-top transform rounded-b-lg border border-t-0 p-4 text-right transition-all duration-300 ${r ? 'scale-y-100' : 'scale-y-0'}`,
        children: e.jsxs('ul', {
          className: 'flex flex-col gap-8 pt-12',
          children: [
            t.map((a, s) =>
              e.jsx(
                'li',
                {
                  className: `transform opacity-0 blur-[8px] transition-all duration-300 ${r ? 'opacity-100 blur-none' : ''}`,
                  style: { transitionDelay: r ? `${s * 100}ms` : '0ms' },
                  children: e.jsx('a', {
                    href: a.href,
                    className: 'block',
                    children: a.label,
                  }),
                },
                a.href,
              ),
            ),
            e.jsx('li', {
              className: `transform opacity-0 blur-[8px] transition-all duration-300 ${r ? 'opacity-100 blur-none' : ''}`,
              style: { transitionDelay: r ? `${t.length * 100}ms` : '0ms' },
              children: e.jsx('a', {
                href: '/contact',
                className:
                  'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-3',
                children: 'contact',
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
export { c as default };
