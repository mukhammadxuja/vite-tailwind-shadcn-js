import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = React.forwardRef(
  (
    { className, required = false, optional = false, children, ...props },
    ref
  ) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), 'ml-1', className)}
      {...props}
    >
      {children}
      {required && (
        <span title="This field is required!" className="text-red-500 ml-1">
          *
        </span>
      )}
      {optional && (
        <span className="text-muted-foreground ml-1 text-xs">(optional)</span>
      )}
    </LabelPrimitive.Root>
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
