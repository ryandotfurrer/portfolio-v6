import { j as r } from './jsx-runtime.D_zvdyIk.js';
import { R as f } from './index.ai7qpRr1.js';
function u() {
  return (
    f.useEffect(() => {
      (function (l, o, s) {
        let a = function (e, t) {
            e.q.push(t);
          },
          c = l.document;
        l.Cal =
          l.Cal ||
          function () {
            let e = l.Cal,
              t = arguments;
            if (
              (e.loaded ||
                ((e.ns = {}),
                (e.q = e.q || []),
                (c.head.appendChild(c.createElement('script')).src = o),
                (e.loaded = !0)),
              t[0] === s)
            ) {
              const i = function () {
                  a(i, arguments);
                },
                n = t[1];
              (i.q = i.q || []),
                typeof n == 'string'
                  ? ((e.ns[n] = e.ns[n] || i),
                    a(e.ns[n], t),
                    a(e, ['initNamespace', n]))
                  : a(e, t);
              return;
            }
            a(e, t);
          };
      })(window, 'https://app.cal.com/embed/embed.js', 'init'),
        Cal('init', 'coffee-chat', { origin: 'https://cal.com' }),
        Cal.ns['coffee-chat']('inline', {
          elementOrSelector: '#my-cal-inline',
          config: { layout: 'month_view', theme: 'light' },
          calLink: 'ryandotfurrer/coffee-chat',
        }),
        Cal.ns['coffee-chat']('ui', {
          theme: 'light',
          cssVarsPerTheme: {
            light: { 'cal-brand': '#ed3f1b' },
            dark: { 'cal-brand': '#ed3f1b' },
          },
          hideEventTypeDetails: !1,
          layout: 'month_view',
        });
    }, []),
    r.jsx('section', {
      className: 'w-full h-full overflow-scroll mt-12',
      id: 'my-cal-inline',
    })
  );
}
export { u as default };
