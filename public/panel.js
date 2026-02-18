(() => {
  'use strict';

  const $log = document.getElementById('log');
  const $btnPing = document.getElementById('btnPing');
  const $btnRun = document.getElementById('btnRun');
  const $btnClear = document.getElementById('btnClear');

  function log(line) {
    const ts = new Date().toISOString();
    $log.textContent += `${ts}  ${line}\n`;
    $log.scrollTop = $log.scrollHeight;
  }

  async function ping() {
    log('GET ./api/ping');
    const r = await fetch('./api/ping', { method: 'GET' });
    const data = await r.json();
    log(`<- ${r.status} ${JSON.stringify(data)}`);
  }

  async function runDemoJob() {
    log('POST ./api/run {job:"demo"}');
    const r = await fetch('./api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job: 'demo' }),
    });
    const data = await r.json();
    log(`<- ${r.status} ${JSON.stringify(data)}`);
  }

  $btnPing.addEventListener('click', async () => {
    try {
      await ping();
    } catch (e) {
      console.error(e);
      log(`ERROR: ${e && e.message ? e.message : String(e)}`);
    }
  });

  $btnRun.addEventListener('click', async () => {
    try {
      await runDemoJob();
    } catch (e) {
      console.error(e);
      log(`ERROR: ${e && e.message ? e.message : String(e)}`);
    }
  });

  $btnClear.addEventListener('click', () => {
    $log.textContent = '';
  });

  // Log initial location (useful when URL is signed by Kaiten)
  log(`loaded: ${window.location.href}`);
})();
