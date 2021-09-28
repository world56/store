export function initMenu(url: string) {
  return url.substr(1, url.length - 1).split('/') || [];
};

export function getPathUrl(url: React.Key[]) {
  let str = '';
  let i = url.length - 1;
  for (i; i >= 0; i--) str += `/${url[i]}`;
  return str;
};