import * as React from 'react';
import { Lightbulb, LightbulbOff, MonitorSmartphone } from 'lucide-react';
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
  const [theme, setThemeState] = React.useState<'system' | 'light' | 'dark'>(
    () => {
      // Initialize from localStorage or default to 'system'
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('theme')
      ) {
        return localStorage.getItem('theme') as 'system' | 'light' | 'dark';
      }
      return 'system';
    },
  );

  // Get the effective theme (what's actually shown)
  const effectiveTheme = React.useMemo(() => {
    if (theme !== 'system') return theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }, [theme]);

  // Handle system theme changes
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

  // Apply theme changes
  React.useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={cn('', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {/* Light mode icon - visible when effective theme is light and theme is not system */}
            <Lightbulb
              className={cn(
                'h-[1.2rem] w-[1.2rem] transition-all',
                effectiveTheme === 'light' && theme !== 'system'
                  ? 'scale-100 rotate-0'
                  : 'scale-0 -rotate-90',
              )}
            />

            {/* Dark mode icon - visible when effective theme is dark and theme is not system */}
            <LightbulbOff
              className={cn(
                'absolute h-[1.2rem] w-[1.2rem] transition-all',
                effectiveTheme === 'dark' && theme !== 'system'
                  ? 'scale-100 rotate-0'
                  : 'scale-0 rotate-90',
              )}
            />

            {/* System mode icon - visible when theme is system */}
            <MonitorSmartphone
              className={cn(
                'absolute h-[1.2rem] w-[1.2rem] transition-all',
                theme === 'system' ? 'scale-100 rotate-0' : 'scale-0 rotate-90',
              )}
            />

            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setThemeState('light')}>
            <Lightbulb className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeState('dark')}>
            <LightbulbOff className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeState('system')}>
            <MonitorSmartphone className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
