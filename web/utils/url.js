/**
 * Extract the current page's base Url (without any paths)
 * @param {import('http').IncomingMessage?} req The request to parse from. (Required for server).
 * @returns {string | undefined}
 */
function getOriginUrl(req) {
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  }

  if (!req) return undefined;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = req ? `${protocol}://${req.headers.host}` : '';
  return baseUrl;
}

/**
 * Extract the current page's full Url.
 * @param {import('http').IncomingMessage?} req The request to parse from. (Required for server).
 * @returns {string | undefined}
 */
function getFullUrl(req) {
  if (window) {
    return window.location.href;
  }

  if (!req) return undefined;

  const baseUrl = getOriginUrl(req);
  return `${baseUrl}${req.url}`;
}

export {
  getOriginUrl,
  getFullUrl,
};
