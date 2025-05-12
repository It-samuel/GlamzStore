import { cn } from "@/lib/utils";

export default function ProductPrice({ value, className}: { value: number; className?: string }) {
    // Format the price value to a string with two decimal places
    const stringValue = value.toFixed(2);
    // Return the formatted price wrapped in a span with the provided className
    const [intValue, decimalValue] = stringValue.split('.');
  return (
    <p className={cn('text-2xl', className)}>
        <span className="text-xs align-super">${intValue}</span>
        <span className="text-xs align-super">.{decimalValue}</span>
    </p>
    
  )
}
