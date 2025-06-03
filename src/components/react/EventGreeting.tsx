import { useEffect, useState } from 'react';

const Events = {
  commit_your_code: 'the Commit Your Code Conference',
  render_atl: '🍑 RenderATL',
  vercel_ship: '▲ Vercel Ship'
};

export default function EventGreeting() {
  const [event, setEvent] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventParam = urlParams.get('event');

    if (eventParam && eventParam in Events) {
      setEvent(Events[eventParam as keyof typeof Events]);
    }
  }, [event]);

  if (!event) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/20 dark:bg-accent/20 border-accent/50 border dark:border-accent max-sm:p-2 p-4 mb-12 rounded-md text-foreground max-w-fit mx-auto text-center text-balance">
      <p className="text-xl font-bold tracking-tight md:text-xl lg:text-2xl xl:text-3xl leading-[1.6em]">
        👋 It was <span className='border-b-4 border-accent'>GREAT</span> connecting with you at {event}!
      </p>
    </div>
  );
}
