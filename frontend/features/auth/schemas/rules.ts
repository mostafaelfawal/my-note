export const passwordRules = {
  length: (p: string) => p.length >= 6,
  upper: (p: string) => /[A-Z]/.test(p),
  lower: (p: string) => /[a-z]/.test(p),
  number: (p: string) => /\d/.test(p),
  special: (p: string) => /[!@#$%^&*(),.?"':{}|<>]/.test(p),
};
