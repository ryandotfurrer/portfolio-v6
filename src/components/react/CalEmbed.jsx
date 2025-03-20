import React from 'react';

export default function CalEmbed() {
  React.useEffect(() => {
    // Initialize Cal
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    // Configure Cal
    Cal('init', 'coffee-chat', { origin: 'https://cal.com' });

    Cal.ns['coffee-chat']('inline', {
      elementOrSelector: '#my-cal-inline',
      config: { layout: 'month_view', theme: 'light' },
      calLink: 'ryandotfurrer/coffee-chat',
    });

    Cal.ns['coffee-chat']('ui', {
      theme: 'light',
      cssVarsPerTheme: {
        light: { 'cal-brand': '#ed3f1b' },
        dark: { 'cal-brand': '#ed3f1b' },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section
      className="w-full h-full overflow-scroll mt-12"
      id="my-cal-inline"
    />
  );
}
