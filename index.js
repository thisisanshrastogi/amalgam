/* Analytics init — defensive.
   The loader above can silently fail: content blockers (Brave Shields, uBlock),
   strict tracking protection, offline, or a CDN hiccup. When it does,
   window.amplitude is undefined and an unguarded .add() throws, which halts
   this script block. Nothing here is load-bearing for the page, so every call
   is guarded and the whole thing is wrapped in try/catch. */
(function () {
    if (window.__amplitudeInitialized) return;

    function start() {
        if (window.__amplitudeInitialized) return;
        var amp = window.amplitude;
        if (!amp || typeof amp.init !== 'function') return; // blocked or not loaded
        window.__amplitudeInitialized = true;

        try {
            var sr = window.sessionReplay;
            if (sr && typeof sr.plugin === 'function' && typeof amp.add === 'function') {
                amp.add(sr.plugin({ sampleRate: 1 }));
            }
            amp.init('b33bf9010068e187048e910b3144df49', {
                fetchRemoteConfig: true,
                autocapture: {
                    attribution: true,
                    frustrationInteractions: false
                }
            });
        } catch (e) {
            if (window.console && console.debug) {
                console.debug('Analytics unavailable:', e && e.message);
            }
        }
    }

    if (window.__amplitudeBlocked) return;

    /* The SDK may not have parsed yet if the tag was deferred or is still
       in flight. Try now, then once more after load; give up quietly after. */
    start();
    if (!window.__amplitudeInitialized) {
        window.addEventListener('load', start, { once: true });
        setTimeout(start, 2000);
    }
})();

(function () {
    var t = document.getElementById('navToggle'), l = document.getElementById('navLinks');
    if (!t || !l) return;
    t.addEventListener('click', function () {
        var open = l.classList.toggle('open');
        t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
})();
