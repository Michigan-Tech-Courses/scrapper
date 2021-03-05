export const trim = (s: string) => s.replace(/\s+/g, ' ').trim();

export const removeEmptyElements = (arr: string[]) => arr.reduce<string[]>((accum, value) => {
  if (value !== '') {
    accum.push(value);
  }

  return accum;
}, []);

export const resolvePartialURL = (url: string) => {
  if (url.startsWith('http')) {
    return url;
  }

  if (!url.includes('mtu.edu')) {
    return `https://mtu.edu${url.startsWith('/') ? '' : '/'}${url}`;
  }

  return url;
};

export const getTermId = (term: Date) => `${term.getFullYear()}${(term.getMonth() + 1).toString().padStart(2, '0')}`;

export const protectNaN = (n: number) => Number.isNaN(n) ? 0 : n;

export const decodeCloudflareObfuscatedEmail = (encoded: string) => {
  let email = '';
  let r = parseInt(encoded.substr(0, 2), 16);
  let n;
  let i;

  for (n = 2; encoded.length - n; n += 2) {
    i = parseInt(encoded.substr(n, 2), 16) ^ r;
    email += String.fromCharCode(i);
  }

  return email;
};

export const getNumberOfUniqueValues = (arr: string[]) => {
  const m = new Map<string, number>();

  arr.forEach(element => {
    const currentElement = m.get(element);

    if (currentElement) {
      m.set(element, currentElement + 1);
    } else {
      m.set(element, 1);
    }
  });

  return m.size;
};
