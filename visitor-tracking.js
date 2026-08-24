// ─────────────────────────────────────────────
// Annie Lee's — lightweight visitor tracking
// Logs page views and clicks to Supabase so the
// owner can see them in the Visitors tab of admin.html
// ─────────────────────────────────────────────
(function () {
  const _t = window.supabase.createClient(
    'https://dcxqorxmezakztyfyfbq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjeHFvcnhtZXpha3p0eWZ5ZmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDMyNDksImV4cCI6MjA5ODU3OTI0OX0.9-flj1zOCqx2Azrp7hHlJxtSpmmdV9sjOLQVPLbmLXY'
  );

  let sessionId = sessionStorage.getItem('_al_visitor_sid');
  if (!sessionId) {
    sessionId = 'v_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem('_al_visitor_sid', sessionId);
  }

  const page = location.pathname.split('/').pop() || 'index.html';

  function logEvent(type, label) {
    _t.from('site_events').insert({
      session_id: sessionId,
      event_type: type,
      page: page,
      label: label || null
    }).then(() => {}).catch(() => {});
  }

  // Log the page view once on load
  logEvent('pageview');

  // Log clicks on any link or button, using its visible text as the label
  document.addEventListener('click', function (e) {
    const el = e.target.closest('a, button');
    if (!el) return;
    const label = (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 60);
    if (label) logEvent('click', label);
  });
})();
