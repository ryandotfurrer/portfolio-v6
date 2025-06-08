import { useEffect, useState } from 'react';

const Events = {
  commit_your_code: 'the Commit Your Code Conference',
  render_atl: '🍑 RenderATL',
  vercel_ship: '▲ Vercel Ship',
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
    <div className="dark:bg-accent/20 border-accent/50 dark:border-accent text-foreground mx-auto mb-12 max-w-fit rounded-md border bg-gradient-to-r from-orange-500/10 to-red-500/20 p-4 text-center text-balance max-sm:p-2">
      <p className="text-xl leading-[1.6em] font-bold tracking-tight md:text-xl lg:text-2xl xl:text-3xl">
        👋 It was <span className="border-accent border-b-4">GREAT</span>{' '}
        connecting with you at {event}!
      </p>
    </div>
  );
}
