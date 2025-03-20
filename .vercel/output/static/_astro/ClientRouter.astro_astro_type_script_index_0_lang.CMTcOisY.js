const y = 'data-astro-transition-persist',
  M = new Set();
function B(e) {
  const t = e.src ? new URL(e.src, location.href).href : e.textContent;
  return M.has(t) ? !0 : (M.add(t), !1);
}
function Z(e) {
  for (const t of e.scripts)
    !t.hasAttribute('data-astro-rerun') && B(t) && (t.dataset.astroExec = '');
}
function ee(e) {
  const t = document.documentElement,
    n = [...t.attributes].filter(
      ({ name: o }) => (t.removeAttribute(o), o.startsWith('data-astro-')),
    );
  [...e.documentElement.attributes, ...n].forEach(({ name: o, value: r }) =>
    t.setAttribute(o, r),
  );
}
function te(e) {
  for (const t of Array.from(document.head.children)) {
    const n = re(t, e);
    n ? n.remove() : t.remove();
  }
  document.head.append(...e.head.children);
}
function ne(e, t) {
  t.replaceWith(e);
  for (const n of t.querySelectorAll(`[${y}]`)) {
    const o = n.getAttribute(y),
      r = e.querySelector(`[${y}="${o}"]`);
    r &&
      (r.replaceWith(n),
      r.localName === 'astro-island' &&
        ie(n) &&
        !se(n, r) &&
        (n.setAttribute('ssr', ''),
        n.setAttribute('props', r.getAttribute('props'))));
  }
}
const oe = () => {
    const e = document.activeElement;
    if (e?.closest(`[${y}]`)) {
      if (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) {
        const t = e.selectionStart,
          n = e.selectionEnd;
        return () => R({ activeElement: e, start: t, end: n });
      }
      return () => R({ activeElement: e });
    } else return () => R({ activeElement: null });
  },
  R = ({ activeElement: e, start: t, end: n }) => {
    e &&
      (e.focus(),
      (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) &&
        (typeof t == 'number' && (e.selectionStart = t),
        typeof n == 'number' && (e.selectionEnd = n)));
  },
  re = (e, t) => {
    const n = e.getAttribute(y),
      o = n && t.head.querySelector(`[${y}="${n}"]`);
    if (o) return o;
    if (e.matches('link[rel=stylesheet]')) {
      const r = e.getAttribute('href');
      return t.head.querySelector(`link[rel=stylesheet][href="${r}"]`);
    }
    return null;
  },
  ie = (e) => {
    const t = e.dataset.astroTransitionPersistProps;
    return t == null || t === 'false';
  },
  se = (e, t) => e.getAttribute('props') === t.getAttribute('props'),
  ae = (e) => {
    Z(e), ee(e), te(e);
    const t = oe();
    ne(e.body, document.body), t();
  },
  ce = 'astro:before-preparation',
  le = 'astro:after-preparation',
  ue = 'astro:before-swap',
  fe = 'astro:after-swap',
  de = (e) => document.dispatchEvent(new Event(e));
class U extends Event {
  from;
  to;
  direction;
  navigationType;
  sourceElement;
  info;
  newDocument;
  signal;
  constructor(t, n, o, r, i, u, a, l, f, c) {
    super(t, n),
      (this.from = o),
      (this.to = r),
      (this.direction = i),
      (this.navigationType = u),
      (this.sourceElement = a),
      (this.info = l),
      (this.newDocument = f),
      (this.signal = c),
      Object.defineProperties(this, {
        from: { enumerable: !0 },
        to: { enumerable: !0, writable: !0 },
        direction: { enumerable: !0, writable: !0 },
        navigationType: { enumerable: !0 },
        sourceElement: { enumerable: !0 },
        info: { enumerable: !0 },
        newDocument: { enumerable: !0, writable: !0 },
        signal: { enumerable: !0 },
      });
  }
}
class me extends U {
  formData;
  loader;
  constructor(t, n, o, r, i, u, a, l, f, c) {
    super(ce, { cancelable: !0 }, t, n, o, r, i, u, a, l),
      (this.formData = f),
      (this.loader = c.bind(this, this)),
      Object.defineProperties(this, {
        formData: { enumerable: !0 },
        loader: { enumerable: !0, writable: !0 },
      });
  }
}
class he extends U {
  direction;
  viewTransition;
  swap;
  constructor(t, n) {
    super(
      ue,
      void 0,
      t.from,
      t.to,
      t.direction,
      t.navigationType,
      t.sourceElement,
      t.info,
      t.newDocument,
      t.signal,
    ),
      (this.direction = t.direction),
      (this.viewTransition = n),
      (this.swap = () => ae(this.newDocument)),
      Object.defineProperties(this, {
        direction: { enumerable: !0 },
        viewTransition: { enumerable: !0 },
        swap: { enumerable: !0, writable: !0 },
      });
  }
}
async function pe(e, t, n, o, r, i, u, a, l) {
  const f = new me(e, t, n, o, r, i, window.document, u, a, l);
  return (
    document.dispatchEvent(f) &&
      (await f.loader(),
      f.defaultPrevented ||
        (de(le), f.navigationType !== 'traverse' && x({ scrollX, scrollY }))),
    f
  );
}
function ge(e, t) {
  const n = new he(e, t);
  return document.dispatchEvent(n), n.swap(), n;
}
const we = history.pushState.bind(history),
  T = history.replaceState.bind(history),
  x = (e) => {
    history.state &&
      ((history.scrollRestoration = 'manual'),
      T({ ...history.state, ...e }, ''));
  },
  D = !!document.startViewTransition,
  I = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
  q = (e, t) => e.pathname === t.pathname && e.search === t.search;
let d, g, A;
const W = (e) => document.dispatchEvent(new Event(e)),
  V = () => W('astro:page-load'),
  ye = () => {
    let e = document.createElement('div');
    e.setAttribute('aria-live', 'assertive'),
      e.setAttribute('aria-atomic', 'true'),
      (e.className = 'astro-route-announcer'),
      document.body.append(e),
      setTimeout(() => {
        let t =
          document.title ||
          document.querySelector('h1')?.textContent ||
          location.pathname;
        e.textContent = t;
      }, 60);
  },
  H = 'data-astro-transition-persist',
  O = 'data-astro-transition',
  P = 'data-astro-transition-fallback';
let F,
  b = 0;
history.state
  ? ((b = history.state.index),
    scrollTo({ left: history.state.scrollX, top: history.state.scrollY }))
  : I() &&
    (T({ index: b, scrollX, scrollY }, ''),
    (history.scrollRestoration = 'manual'));
async function be(e, t) {
  try {
    const n = await fetch(e, t),
      r = (n.headers.get('content-type') ?? '').split(';', 1)[0].trim();
    return r !== 'text/html' && r !== 'application/xhtml+xml'
      ? null
      : {
          html: await n.text(),
          redirected: n.redirected ? n.url : void 0,
          mediaType: r,
        };
  } catch {
    return null;
  }
}
function j() {
  const e = document.querySelector('[name="astro-view-transitions-fallback"]');
  return e ? e.getAttribute('content') : 'animate';
}
function ve() {
  let e = Promise.resolve(),
    t = !1;
  for (const n of document.getElementsByTagName('script'))
    n.dataset.astroExec === void 0 &&
      n.getAttribute('type') === 'module' &&
      (t = n.getAttribute('src') === null);
  t &&
    document.body.insertAdjacentHTML(
      'beforeend',
      '<script type="module" src="data:application/javascript,"/>',
    );
  for (const n of document.getElementsByTagName('script')) {
    if (n.dataset.astroExec === '') continue;
    const o = n.getAttribute('type');
    if (o && o !== 'module' && o !== 'text/javascript') continue;
    const r = document.createElement('script');
    r.innerHTML = n.innerHTML;
    for (const i of n.attributes) {
      if (i.name === 'src') {
        const u = new Promise((a) => {
          r.onload = r.onerror = a;
        });
        e = e.then(() => u);
      }
      r.setAttribute(i.name, i.value);
    }
    (r.dataset.astroExec = ''), n.replaceWith(r);
  }
  return e;
}
const K = (e, t, n, o, r) => {
  const i = q(t, e),
    u = document.title;
  document.title = o;
  let a = !1;
  if (e.href !== location.href && !r)
    if (n.history === 'replace') {
      const l = history.state;
      T(
        { ...n.state, index: l.index, scrollX: l.scrollX, scrollY: l.scrollY },
        '',
        e.href,
      );
    } else we({ ...n.state, index: ++b, scrollX: 0, scrollY: 0 }, '', e.href);
  if (
    ((document.title = u),
    (A = e),
    i || (scrollTo({ left: 0, top: 0, behavior: 'instant' }), (a = !0)),
    r)
  )
    scrollTo(r.scrollX, r.scrollY);
  else {
    if (e.hash) {
      history.scrollRestoration = 'auto';
      const l = history.state;
      (location.href = e.href),
        history.state ||
          (T(l, ''), i && window.dispatchEvent(new PopStateEvent('popstate')));
    } else a || scrollTo({ left: 0, top: 0, behavior: 'instant' });
    history.scrollRestoration = 'manual';
  }
};
function Te(e) {
  const t = [];
  for (const n of e.querySelectorAll('head link[rel=stylesheet]'))
    if (
      !document.querySelector(
        `[${H}="${n.getAttribute(H)}"], link[rel=stylesheet][href="${n.getAttribute('href')}"]`,
      )
    ) {
      const o = document.createElement('link');
      o.setAttribute('rel', 'preload'),
        o.setAttribute('as', 'style'),
        o.setAttribute('href', n.getAttribute('href')),
        t.push(
          new Promise((r) => {
            ['load', 'error'].forEach((i) => o.addEventListener(i, r)),
              document.head.append(o);
          }),
        );
    }
  return t;
}
async function C(e, t, n, o, r) {
  async function i(l) {
    function f(h) {
      const m = h.effect;
      return !m || !(m instanceof KeyframeEffect) || !m.target
        ? !1
        : window.getComputedStyle(m.target, m.pseudoElement)
            .animationIterationCount === 'infinite';
    }
    const c = document.getAnimations();
    document.documentElement.setAttribute(P, l);
    const p = document.getAnimations().filter((h) => !c.includes(h) && !f(h));
    return Promise.allSettled(p.map((h) => h.finished));
  }
  if (r === 'animate' && !n.transitionSkipped && !e.signal.aborted)
    try {
      await i('old');
    } catch {}
  const u = document.title,
    a = ge(e, n.viewTransition);
  K(a.to, a.from, t, u, o),
    W(fe),
    r === 'animate' &&
      (!n.transitionSkipped && !a.signal.aborted
        ? i('new').finally(() => n.viewTransitionFinished())
        : n.viewTransitionFinished());
}
function Ee() {
  return d?.controller.abort(), (d = { controller: new AbortController() });
}
async function G(e, t, n, o, r) {
  const i = Ee();
  if (!I() || location.origin !== n.origin) {
    i === d && (d = void 0), (location.href = n.href);
    return;
  }
  const u = r ? 'traverse' : o.history === 'replace' ? 'replace' : 'push';
  if (
    (u !== 'traverse' && x({ scrollX, scrollY }),
    q(t, n) && ((e !== 'back' && n.hash) || (e === 'back' && t.hash)))
  ) {
    K(n, t, o, document.title, r), i === d && (d = void 0);
    return;
  }
  const a = await pe(
    t,
    n,
    e,
    u,
    o.sourceElement,
    o.info,
    i.controller.signal,
    o.formData,
    l,
  );
  if (a.defaultPrevented || a.signal.aborted) {
    i === d && (d = void 0), a.signal.aborted || (location.href = n.href);
    return;
  }
  async function l(s) {
    const p = s.to.href,
      h = { signal: s.signal };
    if (s.formData) {
      h.method = 'POST';
      const w =
        s.sourceElement instanceof HTMLFormElement
          ? s.sourceElement
          : s.sourceElement instanceof HTMLElement && 'form' in s.sourceElement
            ? s.sourceElement.form
            : s.sourceElement?.closest('form');
      h.body =
        t !== void 0 &&
        Reflect.get(HTMLFormElement.prototype, 'attributes', w).getNamedItem(
          'enctype',
        )?.value === 'application/x-www-form-urlencoded'
          ? new URLSearchParams(s.formData)
          : s.formData;
    }
    const m = await be(p, h);
    if (m === null) {
      s.preventDefault();
      return;
    }
    if (m.redirected) {
      const w = new URL(m.redirected);
      if (w.origin !== s.to.origin) {
        s.preventDefault();
        return;
      }
      s.to = w;
    }
    if (
      ((F ??= new DOMParser()),
      (s.newDocument = F.parseFromString(m.html, m.mediaType)),
      s.newDocument.querySelectorAll('noscript').forEach((w) => w.remove()),
      !s.newDocument.querySelector('[name="astro-view-transitions-enabled"]') &&
        !s.formData)
    ) {
      s.preventDefault();
      return;
    }
    const L = Te(s.newDocument);
    L.length && !s.signal.aborted && (await Promise.all(L));
  }
  async function f() {
    if (g && g.viewTransition) {
      try {
        g.viewTransition.skipTransition();
      } catch {}
      try {
        await g.viewTransition.updateCallbackDone;
      } catch {}
    }
    return (g = { transitionSkipped: !1 });
  }
  const c = await f();
  if (a.signal.aborted) {
    i === d && (d = void 0);
    return;
  }
  if ((document.documentElement.setAttribute(O, a.direction), D))
    c.viewTransition = document.startViewTransition(
      async () => await C(a, o, c, r),
    );
  else {
    const s = (async () => {
      await Promise.resolve(), await C(a, o, c, r, j());
    })();
    c.viewTransition = {
      updateCallbackDone: s,
      ready: s,
      finished: new Promise((p) => (c.viewTransitionFinished = p)),
      skipTransition: () => {
        (c.transitionSkipped = !0), document.documentElement.removeAttribute(P);
      },
      types: new Set(),
    };
  }
  c.viewTransition?.updateCallbackDone.finally(async () => {
    await ve(), V(), ye();
  }),
    c.viewTransition?.finished.finally(() => {
      (c.viewTransition = void 0),
        c === g && (g = void 0),
        i === d && (d = void 0),
        document.documentElement.removeAttribute(O),
        document.documentElement.removeAttribute(P);
    });
  try {
    await c.viewTransition?.updateCallbackDone;
  } catch (s) {
    const p = s;
    console.log('[astro]', p.name, p.message, p.stack);
  }
}
async function X(e, t) {
  await G('forward', A, new URL(e, location.href), t ?? {});
}
function Ae(e) {
  if (!I() && e.state) {
    location.reload();
    return;
  }
  if (e.state === null) return;
  const t = history.state,
    n = t.index,
    o = n > b ? 'forward' : 'back';
  (b = n), G(o, A, new URL(location.href), {}, t);
}
const Y = () => {
  history.state &&
    (scrollX !== history.state.scrollX || scrollY !== history.state.scrollY) &&
    x({ scrollX, scrollY });
};
{
  if (D || j() !== 'none')
    if (
      ((A = new URL(location.href)),
      addEventListener('popstate', Ae),
      addEventListener('load', V),
      'onscrollend' in window)
    )
      addEventListener('scrollend', Y);
    else {
      let e, t, n, o;
      const r = () => {
        if (o !== history.state?.index) {
          clearInterval(e), (e = void 0);
          return;
        }
        if (t === scrollY && n === scrollX) {
          clearInterval(e), (e = void 0), Y();
          return;
        } else (t = scrollY), (n = scrollX);
      };
      addEventListener(
        'scroll',
        () => {
          e === void 0 &&
            ((o = history.state?.index),
            (t = scrollY),
            (n = scrollX),
            (e = window.setInterval(r, 50)));
        },
        { passive: !0 },
      );
    }
  for (const e of document.getElementsByTagName('script'))
    B(e), (e.dataset.astroExec = '');
}
const z = new Set(),
  E = new WeakSet();
let k,
  J,
  _ = !1;
function Se(e) {
  _ ||
    ((_ = !0),
    (k ??= e?.prefetchAll),
    (J ??= e?.defaultStrategy ?? 'hover'),
    Le(),
    Re(),
    Pe(),
    xe());
}
function Le() {
  for (const e of ['touchstart', 'mousedown'])
    document.body.addEventListener(
      e,
      (t) => {
        v(t.target, 'tap') && S(t.target.href, { ignoreSlowConnection: !0 });
      },
      { passive: !0 },
    );
}
function Re() {
  let e;
  document.body.addEventListener(
    'focusin',
    (o) => {
      v(o.target, 'hover') && t(o);
    },
    { passive: !0 },
  ),
    document.body.addEventListener('focusout', n, { passive: !0 }),
    N(() => {
      for (const o of document.getElementsByTagName('a'))
        E.has(o) ||
          (v(o, 'hover') &&
            (E.add(o),
            o.addEventListener('mouseenter', t, { passive: !0 }),
            o.addEventListener('mouseleave', n, { passive: !0 })));
    });
  function t(o) {
    const r = o.target.href;
    e && clearTimeout(e),
      (e = setTimeout(() => {
        S(r);
      }, 80));
  }
  function n() {
    e && (clearTimeout(e), (e = 0));
  }
}
function Pe() {
  let e;
  N(() => {
    for (const t of document.getElementsByTagName('a'))
      E.has(t) || (v(t, 'viewport') && (E.add(t), (e ??= ke()), e.observe(t)));
  });
}
function ke() {
  const e = new WeakMap();
  return new IntersectionObserver((t, n) => {
    for (const o of t) {
      const r = o.target,
        i = e.get(r);
      o.isIntersecting
        ? (i && clearTimeout(i),
          e.set(
            r,
            setTimeout(() => {
              n.unobserve(r), e.delete(r), S(r.href);
            }, 300),
          ))
        : i && (clearTimeout(i), e.delete(r));
    }
  });
}
function xe() {
  N(() => {
    for (const e of document.getElementsByTagName('a'))
      v(e, 'load') && S(e.href);
  });
}
function S(e, t) {
  e = e.replace(/#.*/, '');
  const n = t?.ignoreSlowConnection ?? !1;
  if (De(e, n))
    if (
      (z.add(e),
      document.createElement('link').relList?.supports?.('prefetch') &&
        t?.with !== 'fetch')
    ) {
      const o = document.createElement('link');
      (o.rel = 'prefetch'), o.setAttribute('href', e), document.head.append(o);
    } else fetch(e, { priority: 'low' });
}
function De(e, t) {
  if (!navigator.onLine || (!t && Q())) return !1;
  try {
    const n = new URL(e, location.href);
    return (
      location.origin === n.origin &&
      (location.pathname !== n.pathname || location.search !== n.search) &&
      !z.has(e)
    );
  } catch {}
  return !1;
}
function v(e, t) {
  if (e?.tagName !== 'A') return !1;
  const n = e.dataset.astroPrefetch;
  return n === 'false'
    ? !1
    : t === 'tap' && (n != null || k) && Q()
      ? !0
      : (n == null && k) || n === ''
        ? t === J
        : n === t;
}
function Q() {
  if ('connection' in navigator) {
    const e = navigator.connection;
    return e.saveData || /2g/.test(e.effectiveType);
  }
  return !1;
}
function N(e) {
  e();
  let t = !1;
  document.addEventListener('astro:page-load', () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  });
}
function Ie() {
  const e = document.querySelector('[name="astro-view-transitions-fallback"]');
  return e ? e.getAttribute('content') : 'animate';
}
function $(e) {
  return e.dataset.astroReload !== void 0;
}
(D || Ie() !== 'none') &&
  (document.addEventListener('click', (e) => {
    let t = e.target;
    if (
      (e.composed && (t = e.composedPath()[0]),
      t instanceof Element && (t = t.closest('a, area')),
      !(t instanceof HTMLAnchorElement) &&
        !(t instanceof SVGAElement) &&
        !(t instanceof HTMLAreaElement))
    )
      return;
    const n = t instanceof HTMLElement ? t.target : t.target.baseVal,
      o = t instanceof HTMLElement ? t.href : t.href.baseVal,
      r = new URL(o, location.href).origin;
    $(t) ||
      t.hasAttribute('download') ||
      !t.href ||
      (n && n !== '_self') ||
      r !== location.origin ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      e.defaultPrevented ||
      (e.preventDefault(),
      X(o, {
        history: t.dataset.astroHistory === 'replace' ? 'replace' : 'auto',
        sourceElement: t,
      }));
  }),
  document.addEventListener('submit', (e) => {
    let t = e.target;
    if (t.tagName !== 'FORM' || e.defaultPrevented || $(t)) return;
    const n = t,
      o = e.submitter,
      r = new FormData(n, o),
      i = typeof n.action == 'string' ? n.action : n.getAttribute('action'),
      u = typeof n.method == 'string' ? n.method : n.getAttribute('method');
    let a = o?.getAttribute('formaction') ?? i ?? location.pathname;
    const l = o?.getAttribute('formmethod') ?? u ?? 'get';
    if (l === 'dialog' || location.origin !== new URL(a, location.href).origin)
      return;
    const f = { sourceElement: o ?? n };
    if (l === 'get') {
      const c = new URLSearchParams(r),
        s = new URL(a);
      (s.search = c.toString()), (a = s.toString());
    } else f.formData = r;
    e.preventDefault(), X(a, f);
  }),
  Se({ prefetchAll: !0 }));
