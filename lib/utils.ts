import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Convert a prisma object to a plain object
export function convertPrismaObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
} 