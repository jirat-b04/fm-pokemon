export function normalizePokemonName(value: string) {
  return value.trim().toLowerCase();
}

export function titleize(value: string) {
  if (!value) return value;
  return value
    .split(/\s+/)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}
