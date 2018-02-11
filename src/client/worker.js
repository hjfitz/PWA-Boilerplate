// service worker setup
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/worker.js', { scope: '/' }).then(reg => {
    console.log('[WORKER] Successful registration');
    console.log('[WORKER] Scope: ', reg.scope);
  });
}
