/* global Addon */

(() => {
  'use strict';

  if (typeof Addon === 'undefined' || typeof Addon.initialize !== 'function') {
    // If you see this in browser console, most likely Web SDK wasn't loaded.
    console.error('[kaiten-addon-test] Kaiten Web SDK not loaded. Expected global Addon.initialize().');
    return;
  }

  Addon.initialize({
    // Buttons in "Addon Actions" section of a card
    card_buttons: (buttonsContext) => {
      // Tip for debugging: open DevTools inside Kaiten and inspect this object.
      console.log('[kaiten-addon-test] card_buttons context:', buttonsContext);

      return [
        {
          text: 'Ping backend',
          isVisibleForReader: true,
          callback: async () => {
            try {
              const r = await fetch('./api/ping', { method: 'GET' });
              const data = await r.json();
              alert(`pong: ${data.ok} (ts=${data.ts})`);
            } catch (e) {
              console.error(e);
              alert('Ping failed. Open DevTools console for details.');
            }
          },
        },
        {
          text: 'Log contexts to console',
          isVisibleForReader: true,
          callback: () => {
            console.log('[kaiten-addon-test] buttonsContext:', buttonsContext);
            alert('Context objects were written to DevTools console.');
          },
        },
      ];
    },

    // Iframe sections in the body of an opened card
    card_body_section: (bodySectionContext) => {
      console.log('[kaiten-addon-test] card_body_section context:', bodySectionContext);

      return [
        {
          title: 'Test panel',
          content: {
            type: 'iframe',
            // IMPORTANT: signUrl is mandatory if the iframe will interact with Kaiten.
            // We use it in the test add-on by default.
            url: bodySectionContext.signUrl('./panel.html'),
            height: 260,
          },
        },
      ];
    },
  });
})();
