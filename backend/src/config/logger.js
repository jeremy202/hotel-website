function info(message, meta = {}) {
  // eslint-disable-next-line no-console
  console.log(`[INFO] ${message}`, meta);
}

function warn(message, meta = {}) {
  // eslint-disable-next-line no-console
  console.warn(`[WARN] ${message}`, meta);
}

function error(message, meta = {}) {
  // eslint-disable-next-line no-console
  console.error(`[ERROR] ${message}`, meta);
}

module.exports = { info, warn, error };
