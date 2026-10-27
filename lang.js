// Language switch for the Upbloom legal pages: ?lang= wins, then the last choice, then the
// browser language, then English. German is the binding version; EN and RU are translations.
(function () {
  var langs = ['de', 'en', 'ru'];
  var body = document.body;
  var buttons = document.querySelectorAll('.langtoggle button');
  function set(l) {
    body.setAttribute('data-lang', l);
    document.documentElement.lang = l;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.l === l)); });
    try { localStorage.setItem('ub-lang', l); } catch (e) {}
  }
  var query = (location.search.match(/[?&]lang=(de|en|ru)\b/) || [])[1];
  var saved = null;
  try { saved = localStorage.getItem('ub-lang'); } catch (e) {}
  var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  set(query || (langs.indexOf(saved) >= 0 ? saved : null) || (langs.indexOf(nav) >= 0 ? nav : 'en'));
  buttons.forEach(function (b) { b.addEventListener('click', function () { set(b.dataset.l); }); });
})();
