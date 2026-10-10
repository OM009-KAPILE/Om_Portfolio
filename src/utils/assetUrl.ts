/**
 * Resolves an asset path to work properly on both localhost and deployed environments
 * like GitHub Pages with Vite's configured BASE_URL.
 */
export const resolveAssetUrl = (path: string): string => {
  if (!path) return '';

  // Return absolute external URLs or data/blob URIs as is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Get Vite's configured base URL (guaranteed to end with '/')
  const base = import.meta.env.BASE_URL || '/';

  // If path already starts with the base URL, return as is
  if (base !== '/' && path.startsWith(base)) {
    return path;
  }

  // If path already starts with /Om_Portfolio/
  if (path.startsWith('/Om_Portfolio/')) {
    return path;
  }

  // Strip leading slash to prevent double slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base}${cleanPath}`;
};
