import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '~/lib/utils';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const [theme, setThemeState] = React.useState<
    'system' | 'theme-light' | 'dark'
  >(() => {
    // Get initial theme from localStorage or system preference
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'theme-light' | 'dark' | 'system';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'theme-light';
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  React.useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={cn('', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setThemeState('theme-light')}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeState('dark')}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeState('system')}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
