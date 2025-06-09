import { cn } from '../../utils/utils';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

type WorkStatusType = 'available' | 'open' | 'unavailable';

const workStatusConfig = {
  available: {
    text: 'available for work',
    dotClasses: 'bg-emerald-400 border-emerald-500',
    resumeUrl:
      'https://drive.google.com/file/d/1TKx0759oiqfimdtL55UCbd1pXuZl7eIy/view?usp=sharing',
  },
  open: {
    text: 'open to opportunities',
    dotClasses: 'bg-amber-400 border-amber-600',
    resumeUrl:
      'https://drive.google.com/file/d/1TKx0759oiqfimdtL55UCbd1pXuZl7eIy/view?usp=sharing',
  },
  unavailable: {
    text: 'unavailable for work',
    dotClasses: 'bg-rose-400 border-rose-600',
    resumeUrl: '#', // You might want to disable the link entirely for unavailable status
  },
} as const;

interface WorkStatusProps {
  className?: string;
  status?: WorkStatusType;
}

export default function WorkStatus({
  status = 'available',
  className,
}: WorkStatusProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { text, dotClasses, resumeUrl } = workStatusConfig[status];

  return (
    <a
      className={cn(
        'group bg-card hover:from-card hover:to-secondary hover:via-card/50 relative flex w-fit items-center gap-2 rounded-xs border p-2 text-xs transition-transform duration-300 hover:bg-gradient-to-b md:text-sm',
        className,
      )}
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div
          className={cn(
            'flex items-center gap-2 transition-all duration-300',
            isHovered
              ? '-translate-y-2 opacity-0'
              : 'translate-y-0 opacity-100',
          )}
        >
          <div
            id="work-status-dot"
            className={cn(
              'size-3 animate-pulse rounded-full border-2',
              dotClasses,
            )}
          />
          <span id="work-status-text">{text}</span>
        </div>
        <div
          className={cn(
            'absolute inset-0 flex items-center gap-2 transition-all duration-300',
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
            status === 'unavailable' && 'pointer-events-none',
          )}
        >
          <span className="mx-auto flex items-center gap-2">
            view resume
            <ExternalLink className="size-3" />
          </span>
        </div>
      </div>
    </a>
  );
}
