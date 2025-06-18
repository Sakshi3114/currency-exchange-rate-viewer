const cache = {};

export const getCacheKey = (base, target, start, end) =>
  `${base}-${target}-${start}-${end}`;

export const setCache = (key, data) => {
  cache[key] = {
    timestamp: Date.now(),
    data // this should be the array directly
  };
};

export const getCache = (key) => {
  const entry = cache[key];
  return entry ? entry.data : null;
};

export const clearCache = () => {
  Object.keys(cache).forEach((key) => delete cache[key]);
};
