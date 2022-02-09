const arrayMin = (arr) => arr.reduce((p, v) => (p <= v ? p : v));
const arrayMax = (arr) => arr.reduce((p, v) => (p >= v ? p : v));

export { arrayMin, arrayMax };
