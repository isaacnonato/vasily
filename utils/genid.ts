export const genid = () => {
  return require('crypto')
    .getRandomValues(new Uint8Array(5))
    .reduce(
      (t, e) =>
        (t +=
          (e &= 63) < 36
            ? e.toString(36)
            : e < 62
            ? (e - 26).toString(36).toUpperCase()
            : e > 62
            ? '-'
            : '_'),
      ''
    );
};
