import { getDeveloper } from "../data/developers";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const monthShort = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(date: Date): string {
  return `${date.getUTCDate()} ${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatDateShort(date: Date): string {
  return `${date.getUTCDate()} ${monthShort[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatDateSlashed(date: Date): string {
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  return `${mm}.${dd}.${date.getUTCFullYear()}`;
}

/** Compact date, e.g. 12-09-26. */
export function formatDateCompact(date: Date): string {
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(-2);
  return `${dd}-${mm}-${yy}`;
}

export function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function developerName(slug: string): string {
  return getDeveloper(slug)?.name ?? slug;
}