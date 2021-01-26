export const trim = (s: string) => s.replace(/\s+/g, ' ').trim();

export const removeEmptyElements = (arr: string[]) => arr.reduce<string[]>((accum, value) => {
  if (value !== '') {
    accum.push(value);
  }

  return accum;
}, []);

export const resolvePartialURL = (url: string) => {
  if (!url.includes('mtu.edu')) {
    return `https://mtu.edu${url.startsWith('/') ? '' : '/'}${url}`;
  }

  return url;
};

export const getTermId = (term: Date) => `${term.getFullYear()}${(term.getMonth() + 1).toString().padStart(2, '0')}`;
