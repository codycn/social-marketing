import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility to generate formatted numbers for charts (e.g. 1.2M, 45K)
export function formatCompactNumber(number: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

// Utility to format standard numbers with commas
export function formatNumber(number: number) {
  return new Intl.NumberFormat("en-US").format(number);
}
