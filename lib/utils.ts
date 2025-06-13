import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Convert a prisma object to a plain object
export function convertPrismaObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
} 

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === 'ZodError') {
    // Handle zod error - check for modern Zod format first (issues array)
    if (error.issues && Array.isArray(error.issues)) {
      const fieldErrors = error.issues.map((issue: any) => 
        issue.path?.length > 0 ? `${issue.path.join('.')}: ${issue.message}` : issue.message
      );
      return fieldErrors.join('. ');
    }
    // Handle legacy Zod format (errors object)
    else if (error.errors && typeof error.errors === 'object') {
      const fieldErrors = Object.keys(error.errors).map((field) => error.errors[field].message);
      return fieldErrors.join('. ');
    }
    // Fallback for ZodError without proper errors structure
    return error.message || 'Validation error occurred';
  } else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
    // Handle prisma error
    return 'A record with this information already exists';
  } else {
    // Handle other errors
    return error.message || 'An unexpected error occurred';
  }
}

// Round number to 2 decimal places
export function round2(value: number | string) {
  if(typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100)
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100)
  } else {
    throw new Error('Value is not a number or string')
  }
}


