// src/components/ui/Input/Input.tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 text-xs",
        lg: "h-12 px-4 text-base",
      },
      variant: {
        default: "border-gray-300",
        error: "border-red-500 focus-visible:ring-red-500",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      fullWidth: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  description?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      size,
      variant,
      fullWidth,
      label,
      error,
      leftIcon,
      rightIcon,
      description,
      id,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const uniqueId = id || `input-${Math.random().toString(36).slice(2, 11)}`;
    const descriptionId = description ? `${uniqueId}-description` : undefined;
    const errorId = error ? `${uniqueId}-error` : undefined;

    return (
      <div className={cn("grid gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={uniqueId}
            className="text-sm font-medium leading-none text-gray-700"
          >
            {label}
          </label>
        )}
        {description && (
          <p
            id={descriptionId}
            className="text-sm text-gray-500"
          >
            {description}
          </p>
        )}
        <div className="relative">
          {leftIcon && (
            <div 
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({
                size,
                variant: error ? "error" : variant,
                fullWidth,
              }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            id={uniqueId}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={cn(
              descriptionId,
              errorId
            )}
            {...props}
          />
          {rightIcon && (
            <div 
              className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p 
            id={errorId}
            className="text-xs text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
