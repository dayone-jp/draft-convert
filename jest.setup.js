// see: https://zenn.dev/ocknamo/scraps/f0de16520e7117

// Polyfill for encoding which isn't present globally in jsdom
if (typeof global.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { TextEncoder } = require('util');

  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { TextDecoder } = require('util');
  global.TextDecoder = TextDecoder;
}
