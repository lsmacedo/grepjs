export const pipe = <T>(value: T, ...fns: ((v: T) => T)[]) =>
  fns.reduce((acc, fn) => fn(acc), value);
